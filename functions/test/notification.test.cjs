const { test } = require('node:test');
const assert = require('node:assert/strict');
const { FieldValue } = require('firebase-admin/firestore');
const { notifyLead, sendMail } = require('../lib/functions/src/notification.js');

function fixture() {
  const data = { source: 'web_contacto', nombre: 'Prueba local', email: 'test@example.com', mensaje: 'Consulta' };
  function patch(values) {
    for (const [key, value] of Object.entries(values)) {
      if (value instanceof FieldValue && value.isEqual(FieldValue.delete())) delete data[key];
      else data[key] = value;
    }
  }
  const ref = { id: 'test-id', update: async (value) => patch(value) };
  ref.firestore = { runTransaction: async (callback) => callback({
    get: async () => ({ data: () => ({ ...data }) }), update: (_ref, value) => patch(value),
  }) };
  return { ref, data };
}
const config = { provider: 'resend', from: 'test@example.com', apiKey: 'test-not-a-credential', emulator: false };

test('sin proveedor queda pendiente y nunca llama al emisor', async () => {
  const { ref, data } = fixture();
  await notifyLead(ref, { ...config, provider: 'pendiente' }, async () => { assert.fail('No debe enviar'); });
  assert.equal(data.notificado, false);
  assert.equal(data.notificacionEstado, 'pendiente_configuracion');
});

test('solo confirma tras aceptación; el mismo evento no vuelve a enviar', async () => {
  const { ref, data } = fixture();
  let calls = 0;
  const sender = async ({ text }) => { calls++; assert.match(text, /test@example.com/); return 'provider-123'; };
  await notifyLead(ref, config, sender);
  await notifyLead(ref, config, sender);
  assert.equal(calls, 1);
  assert.equal(data.notificado, true);
  assert.equal(data.notificacionId, 'provider-123');
});

test('un fallo conserva false, libera el bloqueo y permite el reintento', async () => {
  const { ref, data } = fixture();
  await assert.rejects(notifyLead(ref, config, async () => { throw new Error('MAIL_HTTP_503'); }));
  assert.equal(data.notificado, false);
  assert.equal(data.notificacionError, 'MAIL_HTTP_503');
  assert.equal(data.notificacionLeaseHasta, undefined);
  await notifyLead(ref, config, async () => 'retry-accepted');
  assert.equal(data.notificado, true);
});

test('el proveedor emulado no accede a la red y nunca se habilita en producción', async () => {
  assert.equal(await sendMail({ id: 'a', text: 'x', config: { ...config, provider: 'emulator', emulator: true } }), 'emulator-a');
  await assert.rejects(sendMail({ id: 'a', text: 'x', config: { ...config, provider: 'emulator' } }), /CONFIGURATION/);
});

test('el adaptador usa destino fijo, folio idempotente y exige un ID real', async () => {
  const original = global.fetch;
  try {
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      assert.equal(options.headers['Idempotency-Key'], 'public-contact-test-id');
      assert.equal(options.redirect, 'error');
      return { ok: true, json: async () => ({ id: 'mail-id' }) };
    };
    assert.equal(await sendMail({ id: 'test-id', text: 'x', config }), 'mail-id');
    global.fetch = async () => ({ ok: true, json: async () => ({}) });
    await assert.rejects(sendMail({ id: 'test-id', text: 'x', config }), /RESPONSE_INVALID/);
  } finally { global.fetch = original; }
});
