import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';

describe('App Component', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  it('debe crearse correctamente', () => {
    expect(app).toBeTruthy();
  });

  it('debe iniciar con el carrito cerrado', () => {
    expect(app.carritoVisible).toBe(false);
  });

  it('debe alternar y cerrar el estado del carrito', () => {
    app.alternarCarrito();
    expect(app.carritoVisible).toBe(true);
    app.cerrarCarrito();
    expect(app.carritoVisible).toBe(false);
  });
});
