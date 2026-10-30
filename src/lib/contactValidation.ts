export interface ContactValues {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoEmpresa: string;
  intereses: string[];
  objetivo: string;
  etapa: string;
  urgencia: string;
  mensaje: string;
  website: string;
}

export const CONTACT_LIMITS = {
  nombre: 120, email: 254, telefono: 32, empresa: 160, tipoEmpresa: 80,
  objetivo: 100, etapa: 80, urgencia: 60, mensaje: 3000, website: 0,
} as const;

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
const allowedInterests = new Set(['software', 'ia', 'consultoria', 'academia', 'cnc']);

export function validateContact(values: ContactValues): { data: ContactValues; errors: ContactErrors } {
  const data = { ...values, intereses: [...values.intereses] };
  const errors: ContactErrors = {};
  for (const key of Object.keys(CONTACT_LIMITS) as (keyof typeof CONTACT_LIMITS)[]) {
    data[key] = values[key].trim();
    if (data[key].length > CONTACT_LIMITS[key]) {
      errors[key] = `Máximo ${CONTACT_LIMITS[key]} caracteres.`;
    }
  }
  if (data.nombre.length < 2) errors.nombre = 'Escribe tu nombre (mínimo 2 caracteres).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Escribe un correo válido.';
  if (data.telefono && !/^[+0-9() .-]{7,32}$/.test(data.telefono)) {
    errors.telefono = 'Revisa el teléfono: usa números y, si hace falta, el prefijo del país.';
  }
  if (data.intereses.length > 5 || new Set(data.intereses).size !== data.intereses.length
    || data.intereses.some((value) => !allowedInterests.has(value))) {
    errors.intereses = 'Selecciona únicamente las opciones de la lista.';
  }
  if (values.website !== '') errors.website = 'No pudimos validar el formulario. Recarga e inténtalo de nuevo.';
  return { data, errors };
}
