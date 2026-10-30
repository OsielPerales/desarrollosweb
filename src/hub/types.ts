import type { Timestamp } from 'firebase/firestore';

export type LeadStatus =
    | 'nuevo'
    | 'contactado'
    | 'calificado'
    | 'propuesta'
    | 'cierre'
    | 'ganado'
    | 'perdido';

export interface Lead {
    id: string;
    nombre: string;
    email: string;
    telefono?: string;
    empresa?: string;
    tipoEmpresa?: string;
    intereses: string[];
    mensaje?: string;
    status: LeadStatus;
    score?: number | null;
    scoreSummary?: string;
    etiquetas?: string[];
    source?: 'web_contacto' | 'whatsapp' | 'email' | 'facebook' | 'instagram' | 'manual';
    autoPilot?: boolean;
    createdAt: Timestamp | Date | string;
    updatedAt?: Timestamp | Date | string;
}

export interface Cotizacion {
    id: string;
    leadId?: string;
    cliente: string;
    empresa?: string;
    email: string;
    servicio: 'software' | 'ia' | 'consultoria' | 'cnc' | 'curso';
    descripcion: string;
    monto?: number;
    plazo?: string;
    contenidoIA?: string;
    status: 'borrador' | 'enviada' | 'aceptada' | 'rechazada';
    createdAt: string;
}

export type CanalOrigen = 'whatsapp' | 'instagram' | 'facebook' | 'email' | 'web';

export interface Mensaje {
    id: string;
    leadId: string;
    canal: CanalOrigen;
    texto: string;
    remitente: 'cliente' | 'vendedor' | 'agente_ia';
    status?: 'borrador' | 'enviado' | 'leido' | 'fallido';
    createdAt: Timestamp | Date | string;
}

export const KANBAN_COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'nuevo', label: 'Nuevo', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'contactado', label: 'Contactado', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 'calificado', label: 'Calificado', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { id: 'propuesta', label: 'Propuesta', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { id: 'cierre', label: 'Cierre', color: 'bg-pink-100 text-pink-700 border-pink-200' },
    { id: 'ganado', label: '✓ Ganado', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'perdido', label: '✗ Perdido', color: 'bg-red-100 text-red-700 border-red-200' },
];

export const SERVICIOS = [
    { id: 'software', label: 'Desarrollo de Software' },
    { id: 'ia', label: "Orquestación de Agentes" },
    { id: 'consultoria', label: 'Consultoría Industrial' },
    { id: 'cnc', label: 'Servicios CNC' },
    { id: 'curso', label: 'Plataforma iAprende' },
];

