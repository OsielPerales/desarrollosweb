import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contacto } from '../src/pages/Contacto';

const createLead = vi.hoisted(() => vi.fn());
vi.mock('../src/lib/leadsService', () => ({ createLead }));
afterEach(cleanup);
beforeEach(() => { createLead.mockReset(); });

async function fill() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Nombre completo/), 'Prueba local');
  await user.type(screen.getByLabelText(/Correo electrónico/), 'test@example.com');
  return user;
}

describe('registro público', () => {
  it('espera la escritura, bloquea doble envío y muestra el folio confirmado', async () => {
    let resolve!: (id: string) => void;
    createLead.mockReturnValue(new Promise<string>((done) => { resolve = done; }));
    render(<Contacto />);
    const user = await fill();
    await user.dblClick(screen.getByRole('button', { name: 'Registrar solicitud' }));
    expect(createLead).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Enviando…' }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByText('Tu solicitud ya quedó registrada')).toBeNull();
    await act(async () => { resolve('folio-local-123'); });
    expect(await screen.findByText('folio-local-123')).toBeTruthy();
    expect(screen.getByText('Tu solicitud ya quedó registrada')).toBeTruthy();
  });

  it('conserva los datos ante fallo; alternativas no confirman y se puede reintentar', async () => {
    createLead.mockRejectedValueOnce(new Error('permission-denied')).mockResolvedValueOnce('folio-reintento');
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<Contacto />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Registrar solicitud' }));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect((screen.getByLabelText(/Nombre completo/) as HTMLInputElement).value).toBe('Prueba local');
    expect(screen.queryByText('Tu solicitud ya quedó registrada')).toBeNull();
    expect(screen.getByRole('link', { name: 'Prefiero correo' }).getAttribute('href')).toMatch(/^mailto:/);
    await user.click(screen.getByRole('button', { name: 'Prefiero WhatsApp' }));
    expect(open).toHaveBeenCalledOnce();
    expect(createLead).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Tu solicitud ya quedó registrada')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Reintentar registro' }));
    expect(await screen.findByText('folio-reintento')).toBeTruthy();
  });

  it('rechaza datos inválidos, tamaños excesivos y el honeypot', async () => {
    render(<Contacto />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Registrar solicitud' }));
    expect(createLead).not.toHaveBeenCalled();
    await fill();
    fireEvent.change(screen.getByLabelText(/Cuéntanos el contexto/), { target: { value: 'a'.repeat(3001) } });
    await user.click(screen.getByRole('button', { name: 'Registrar solicitud' }));
    expect(createLead).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/Cuéntanos el contexto/), { target: { value: '' } });
    fireEvent.change(document.getElementById('website')!, { target: { value: 'bot.example' } });
    await user.click(screen.getByRole('button', { name: 'Registrar solicitud' }));
    expect(createLead).not.toHaveBeenCalled();
    expect(screen.queryByText('Tu solicitud ya quedó registrada')).toBeNull();
  });
});
