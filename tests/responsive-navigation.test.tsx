import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../src/components/layout/Footer';
import { Navbar } from '../src/components/layout/Navbar';

afterEach(cleanup);

it('abre y cierra el menú móvil con estado accesible', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

  const panel = document.getElementById('mobile-navigation');
  expect(panel?.getAttribute('aria-hidden')).toBe('true');
  expect(panel?.hasAttribute('inert')).toBe(true);

  fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));

  expect(screen.getByRole('button', { name: 'Cerrar menú' }).getAttribute('aria-expanded')).toBe('true');
  expect(panel?.getAttribute('aria-hidden')).toBe('false');
  expect(panel?.hasAttribute('inert')).toBe(false);

  fireEvent.click(screen.getByRole('button', { name: 'Cerrar menú' }));

  expect(screen.getByRole('button', { name: 'Abrir menú' }).getAttribute('aria-expanded')).toBe('false');
  expect(panel?.getAttribute('aria-hidden')).toBe('true');
  expect(panel?.hasAttribute('inert')).toBe(true);
});

it('cierra el menú después de navegar a otra ruta', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));

  const mobileLink = document.querySelector<HTMLAnchorElement>(
    '#mobile-navigation a[href="/soluciones"]',
  );
  expect(mobileLink).not.toBeNull();
  fireEvent.click(mobileLink!);

  expect(screen.getByRole('button', { name: 'Abrir menú' }).getAttribute('aria-expanded')).toBe('false');
  expect(document.getElementById('mobile-navigation')?.getAttribute('aria-hidden')).toBe('true');
});

it('permite que el footer cambie de una a cuatro columnas según breakpoint', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

  const grid = document.querySelector('footer .grid');
  expect(grid?.classList.contains('grid-cols-1')).toBe(true);
  expect(grid?.classList.contains('sm:grid-cols-2')).toBe(true);
  expect(grid?.classList.contains('lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]')).toBe(true);
  expect((grid as HTMLElement | null)?.style.gridTemplateColumns).toBe('');
});
