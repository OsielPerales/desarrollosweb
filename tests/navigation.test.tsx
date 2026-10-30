import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Privacidad } from '../src/pages/Privacidad';
import { Terminos } from '../src/pages/Terminos';
import { NotFound } from '../src/pages/NotFound';

afterEach(cleanup);
it('actualiza metadatos legales y la página de error no queda indexable', () => {
  document.head.innerHTML = '<meta name="description"><link rel="canonical"><meta name="robots" content="index, follow">';
  let view = render(<MemoryRouter><NotFound /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeTruthy();
  expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, follow');
  view.unmount();
  view = render(<MemoryRouter><Privacidad /></MemoryRouter>);
  expect(document.title).toContain('Política de Privacidad');
  expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://desarrolloselaborados.com/privacidad');
  expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow');
  view.unmount();
  render(<MemoryRouter><Terminos /></MemoryRouter>);
  expect(document.title).toContain('Términos de Servicio');
  expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://desarrolloselaborados.com/terminos');
});
