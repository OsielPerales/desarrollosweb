import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// ── Secrets (Firebase Secret Manager) ──────────────────────────────────────
// Define estos secretos con: firebase functions:secrets:set <NOMBRE>
const secretVerifyToken = defineSecret("META_VERIFY_TOKEN");
const secretWhatsappToken = defineSecret("META_WHATSAPP_TOKEN");
const secretPhoneId = defineSecret("META_PHONE_ID");
const secretGeminiKey = defineSecret("GEMINI_API_KEY");

// Lazy loading variables
let db: FirebaseFirestore.Firestore;

function getDb(): FirebaseFirestore.Firestore {
  if (!getApps().length) {
    initializeApp();
  }
  if (!db) {
    db = getFirestore();
  }
  return db;
}

// Las claves se leen en runtime desde Secret Manager a través de las instancias de defineSecret.

/**
 * Webhook para Meta (WhatsApp / Facebook Messenger)
 * Maneja la validación GET y los mensajes entrantes POST
 */
export const whatsappWebhook = onRequest(
  { secrets: [secretVerifyToken, secretWhatsappToken, secretPhoneId, secretGeminiKey] },
  async (req, res) => {
    // 1. Validación de Meta (Webhook Setup)
    if (req.method === "GET") {
      const VERIFY_TOKEN = secretVerifyToken.value();
      if (!VERIFY_TOKEN) {
        logger.error("META_VERIFY_TOKEN no está configurado en Secret Manager.");
        res.sendStatus(500);
        return;
      }
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        logger.info("Webhook Verificado por Meta.");
        res.status(200).send(challenge);
        return;
      } else {
        res.sendStatus(403);
        return;
      }
    }

    // 2. Recepción de mensajes (POST)
    if (req.method === "POST") {
      try {
        const body = req.body;
        logger.info("WhatsApp POST body recibido", { body });

        if (body.object === "whatsapp_business_account") {
          for (const entry of body.entry) {
            for (const change of entry.changes) {
              const value = change.value;
              // Verificar si hay mensajes
              if (value.messages && value.messages.length > 0) {
                const msg = value.messages[0];
                const phone = msg.from; // Número de teléfono del cliente
                const text = msg.text?.body || "";
                const contactName = value.contacts?.[0]?.profile?.name || "Desconocido";

                logger.info(`Mensaje recibido de ${phone}: ${text}`);

                // 3. Procesamiento en BD
                await procesarMensajeEntrante({
                  canal: "whatsapp",
                  identificadorOrigen: phone,
                  nombreContacto: contactName,
                  texto: text,
                  geminiKey: secretGeminiKey.value(),
                  whatsappToken: secretWhatsappToken.value(),
                  phoneId: secretPhoneId.value(),
                });
              }
            }
          }
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        logger.error("Error procesando Webhook", error);
        res.sendStatus(500);
      }
    }
  }
);

/**
 * Función interna para guardar el mensaje y detonar el Agente IA
 */
async function procesarMensajeEntrante(datos: {
  canal: "whatsapp" | "email";
  identificadorOrigen: string; // Teléfono o Email
  nombreContacto: string;
  texto: string;
  geminiKey: string;
  whatsappToken: string;
  phoneId: string;
}) {
  let leadId = "";
  let isAutoPilotActive = false;

  const firestore = getDb();

  // 1. Buscar si el lead ya existe por teléfono/email
  const campoBusqueda = datos.canal === "whatsapp" ? "telefono" : "email";
  const leadsSnapshot = await firestore.collection("leads")
    .where(campoBusqueda, "==", datos.identificadorOrigen)
    .limit(1)
    .get();

  if (leadsSnapshot.empty) {
    // Crear Lead nuevo
    const newLeadRef = firestore.collection("leads").doc();
    await newLeadRef.set({
      nombre: datos.nombreContacto,
      [campoBusqueda]: datos.identificadorOrigen,
      intereses: [],
      status: "nuevo",
      source: datos.canal,
      autoPilot: false,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    leadId = newLeadRef.id;
    logger.info(`Nuevo lead creado vía ${datos.canal}: ${leadId}`);
  } else {
    leadId = leadsSnapshot.docs[0].id;
    isAutoPilotActive = leadsSnapshot.docs[0].data().autoPilot === true;

    // Actualizar updatedAt
    await firestore.collection("leads").doc(leadId).update({
      updatedAt: FieldValue.serverTimestamp()
    });
    logger.info(`Lead existente encontrado: ${leadId} (AutoPilot: ${isAutoPilotActive})`);
  }

  // 2. Guardar el mensaje del cliente
  const msgRef = firestore.collection("mensajes").doc();
  await msgRef.set({
    leadId,
    canal: datos.canal,
    texto: datos.texto,
    remitente: "cliente",
    createdAt: FieldValue.serverTimestamp(),
  });

  // 3. Detonar el Agente CONVERSACIONAL
  if (datos.geminiKey) {
    try {
      const respText = await generarRespuestaIA(datos.texto, datos.geminiKey);

      const iaMsgRef = firestore.collection("mensajes").doc();
      await iaMsgRef.set({
        leadId,
        canal: datos.canal,
        texto: respText,
        remitente: "agente_ia",
        status: isAutoPilotActive ? "enviado" : "borrador",
        createdAt: FieldValue.serverTimestamp(),
      });

      if (isAutoPilotActive && datos.canal === 'whatsapp') {
        logger.info(`Auto-Pilot Activado. Enviando respuesta directamente a ${datos.identificadorOrigen}`);
        await sendWhatsAppMessage(datos.identificadorOrigen, respText, datos.whatsappToken, datos.phoneId);
      } else {
        logger.info(`Borrador del Agente generado para lead: ${leadId}`);
      }

    } catch (err) {
      logger.error("Error al generar o enviar respuesta con Gemini", err);
    }
  }
}

/**
 * Agente Conversacional via Gemini API
 */
async function generarRespuestaIA(mensajeCliente: string, geminiKey: string): Promise<string> {
  if (!geminiKey) {
    logger.warn("No se proporcionó GEMINI_API_KEY, omitiendo generación.");
    return "Error: API GenAI no configurada.";
  }

  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: geminiKey });

  const prompt = `
Eres el Asistente Comercial de Desarrollos Elaborados, expertos en Ingeniería Industrial, CNC y Software (Monclova, México).
Un cliente acaba de enviar este mensaje: "${mensajeCliente}"

Por favor redacta la respuesta perfecta (amable, persuasiva pero profesional) como borrador para el vendedor. 
Mantén la respuesta concisa (máximo 2-3 oraciones). No enclosures el texto en comillas.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Borrador no generado. Por favor revisa el prompt.";
  } catch (err) {
    logger.error("Error en generateContent", err);
    return "Ups, hubo un problema conectando con Inteligencia Artificial.";
  }
}

/**
 * Helper para enviar un mensaje directamente por WhatsApp Graph API
 */
async function sendWhatsAppMessage(toPhone: string, textMessage: string, whatsappToken: string, phoneId: string) {
  if (!whatsappToken || !phoneId) {
    logger.warn("No se puede enviar WhatsApp: Falta token o ID de telefono en Secret Manager");
    return;
  }

  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: toPhone,
    type: "text",
    text: { body: textMessage }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${whatsappToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errBody = await response.text();
      logger.error(`Error de Meta API (${response.status}): ${errBody}`);
    } else {
      logger.info(`WhatsApp entregado a ${toPhone} exitosamente.`);
    }
  } catch (err) {
    logger.error("Error realizando request a Meta API", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Cloud Function: ejecutarCampana ──────────────────────────────────────────
// Recibe: { mensaje, flyerUrl, canales: { whatsapp, linkedin, facebook }, segmento? }
// - Envío masivo WhatsApp a leads activos en Firestore
// - Cross-posting en LinkedIn (Organization Feed)
// - Cross-posting en Facebook Page
// ─────────────────────────────────────────────────────────────────────────────

const secretLinkedinToken = defineSecret("LINKEDIN_ACCESS_TOKEN");
const secretLinkedinOrg = defineSecret("LINKEDIN_ORGANIZATION_URN");
const secretFbPageToken = defineSecret("FB_PAGE_ACCESS_TOKEN");
const secretFbPageId = defineSecret("FB_PAGE_ID");

export const ejecutarCampana = onRequest(
  {
    secrets: [
      secretWhatsappToken, secretPhoneId,
      secretLinkedinToken, secretLinkedinOrg,
      secretFbPageToken, secretFbPageId,
    ],
    timeoutSeconds: 300,
  },
  async (req, res) => {

    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") { res.sendStatus(204); return; }
    if (req.method !== "POST") { res.sendStatus(405); return; }

    const { mensaje, flyerUrl, canales, segmento } = req.body as {
      mensaje: string;
      flyerUrl?: string;
      canales: { whatsapp: boolean; linkedin: boolean; facebook: boolean };
      segmento?: string[];  // array de phones; si omitido → todos los leads activos
    };

    if (!mensaje && !flyerUrl) {
      res.status(400).json({ error: "Se requiere al menos mensaje o flyerUrl." });
      return;
    }

    const resultados: Record<string, unknown> = {};
    const firestore = getDb();

    // ── 1. WHATSAPP MASIVO ────────────────────────────────────────────────────
    if (canales.whatsapp) {
      const wa_token = secretWhatsappToken.value();
      const phone_id = secretPhoneId.value();

      if (!wa_token || !phone_id) {
        resultados.whatsapp = { ok: false, error: "Tokens de WhatsApp no configurados." };
      } else {
        let phones: string[] = segmento ?? [];

        if (!phones.length) {
          // Obtener todos los leads con teléfono y estado activo
          const snap = await firestore.collection("leads")
            .where("status", "in", ["contactado", "calificado", "propuesta"])
            .get();
          phones = snap.docs
            .map(d => d.data().telefono as string | undefined)
            .filter((p): p is string => !!p);
        }

        const url = `https://graph.facebook.com/v20.0/${phone_id}/messages`;
        let sent = 0, failed = 0;

        for (const phone of phones) {
          const payload: Record<string, unknown> = {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: { body: mensaje },
          };

          // Si hay flyer, enviarlo primero como imagen
          if (flyerUrl) {
            const imgPayload = {
              messaging_product: "whatsapp",
              to: phone,
              type: "image",
              image: { link: flyerUrl, caption: mensaje },
            };
            try {
              await fetch(url, {
                method: "POST",
                headers: { "Authorization": `Bearer ${wa_token}`, "Content-Type": "application/json" },
                body: JSON.stringify(imgPayload),
              });
              sent++;
              continue; // Skip the text-only fallback
            } catch {
              logger.warn(`No se pudo enviar imagen a ${phone}, intentando texto`);
            }
          }

          try {
            const r = await fetch(url, {
              method: "POST",
              headers: { "Authorization": `Bearer ${wa_token}`, "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (r.ok) { sent++; } else { failed++; }
          } catch {
            failed++;
          }
        }

        resultados.whatsapp = { ok: true, sent, failed, total: phones.length };
      }
    }

    // ── 2. LINKEDIN CROSS-POSTING ────────────────────────────────────────────
    if (canales.linkedin) {
      const li_token = secretLinkedinToken.value();
      const li_org = secretLinkedinOrg.value(); // Ej: "urn:li:organization:XXXXXXX"

      if (!li_token || !li_org) {
        resultados.linkedin = { ok: false, error: "Credenciales de LinkedIn no configuradas." };
      } else {
        try {
          // Construir el Share post para LinkedIn (UGC Posts API v2)
          const postBody: Record<string, unknown> = {
            author: li_org,
            lifecycleState: "PUBLISHED",
            specificContent: {
              "com.linkedin.ugc.ShareContent": {
                shareCommentary: { text: mensaje },
                shareMediaCategory: flyerUrl ? "IMAGE" : "NONE",
                ...(flyerUrl ? {
                  media: [{
                    status: "READY",
                    description: { text: "Flyer de Desarrollos Elaborados" },
                    originalUrl: flyerUrl,
                    title: { text: "Actualización Empresarial" },
                  }],
                } : {}),
              },
            },
            visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
          };

          const liRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${li_token}`,
              "Content-Type": "application/json",
              "X-Restli-Protocol-Version": "2.0.0",
            },
            body: JSON.stringify(postBody),
          });

          const liData = await liRes.json() as Record<string, unknown>;

          if (liRes.ok) {
            resultados.linkedin = { ok: true, postId: liData.id };
          } else {
            logger.error("Error LinkedIn API", liData);
            resultados.linkedin = { ok: false, error: JSON.stringify(liData) };
          }
        } catch (err) {
          logger.error("Error POST LinkedIn", err);
          resultados.linkedin = { ok: false, error: String(err) };
        }
      }
    }

    // ── 3. FACEBOOK PAGE CROSS-POSTING ──────────────────────────────────────
    if (canales.facebook) {
      const fb_token = secretFbPageToken.value();
      const fb_page_id = secretFbPageId.value();

      if (!fb_token || !fb_page_id) {
        resultados.facebook = { ok: false, error: "Credenciales de Facebook no configuradas." };
      } else {
        try {
          const endpoint = flyerUrl
            ? `https://graph.facebook.com/v20.0/${fb_page_id}/photos`
            : `https://graph.facebook.com/v20.0/${fb_page_id}/feed`;

          const fbPayload: Record<string, string> = flyerUrl
            ? { url: flyerUrl, caption: mensaje, access_token: fb_token }
            : { message: mensaje, access_token: fb_token };

          const fbRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fbPayload),
          });

          const fbData = await fbRes.json() as Record<string, unknown>;

          if (fbRes.ok) {
            resultados.facebook = { ok: true, postId: fbData.id ?? fbData.post_id };
          } else {
            logger.error("Error Facebook Graph API", fbData);
            resultados.facebook = { ok: false, error: JSON.stringify(fbData) };
          }
        } catch (err) {
          logger.error("Error POST Facebook", err);
          resultados.facebook = { ok: false, error: String(err) };
        }
      }
    }

    // ── Registrar la campaña en Firestore ─────────────────────────────────────
    await firestore.collection("campanas").add({
      mensaje,
      flyerUrl: flyerUrl ?? null,
      canales,
      resultados,
      ejecutadaAt: FieldValue.serverTimestamp(),
    });

    res.status(200).json({ ok: true, resultados });
  }
);

// La clave de API de OpenAI/Gemini NUNCA llega al navegador.
// iAprende llama a esta función; esta función llama al proveedor de IA.
// ─────────────────────────────────────────────────────────────────────────────

const secretOpenAIKey = defineSecret("OPENAI_API_KEY");

// Orígenes permitidos para CORS
const ALLOWED_ORIGINS = [
  "https://iaprende-1415d.web.app",
  "https://iaprende.desarrolloselaborados.com",
  "http://localhost:5174", // Solo para desarrollo local
];

export const aiProxy = onRequest(
  { secrets: [secretOpenAIKey], cors: ALLOWED_ORIGINS },
  async (req, res) => {
    // Solo POST
    if (req.method !== "POST") {
      res.set("Allow", "POST");
      res.sendStatus(405);
      return;
    }

    const OPENAI_KEY = secretOpenAIKey.value();
    if (!OPENAI_KEY) {
      logger.error("OPENAI_API_KEY no está configurado en Secret Manager.");
      res.status(500).json({ error: "Servicio de IA no configurado." });
      return;
    }

    try {
      const { messages, model = "gpt-4o-mini", temperature = 0.7, max_tokens = 500, response_format } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Campo 'messages' requerido y debe ser un array." });
        return;
      }

      const AI_BASE_URL = req.body.base_url || "https://api.openai.com/v1";

      const upstreamRes = await fetch(`${AI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
          ...(response_format ? { response_format } : {}),
        }),
      });

      const data = await upstreamRes.json();

      if (!upstreamRes.ok) {
        logger.error("Error desde el proveedor de IA", data);
        res.status(upstreamRes.status).json({ error: data.error?.message || "Error del proveedor de IA" });
        return;
      }

      res.status(200).json(data);
    } catch (err) {
      logger.error("Error en aiProxy", err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
);
