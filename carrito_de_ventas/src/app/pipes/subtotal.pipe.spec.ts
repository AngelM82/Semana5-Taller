import { describe, it, expect } from 'vitest';
import { SubtotalPipe } from './subtotal.pipe';
import { ItemCarrito } from '../models/producto.model';

describe('SubtotalPipe', () => {
  const pipe = new SubtotalPipe();

  it('debe calcular el subtotal multiplicando precio por cantidad', () => {
    expect(pipe.transform(100, 3)).toBe(300);
    expect(pipe.transform(25, 4)).toBe(100);
  });

  it('debe calcular subtotal a partir de un objeto ItemCarrito', () => {
    const item: ItemCarrito = {
      producto: {
        id: 1,
        nombre: 'Mouse',
        descripcion: 'Mouse USB',
        precio: 20,
        categoria: 'Periféricos',
        imagen: '',
        stock: 10
      },
      cantidad: 3
    };

    expect(pipe.transform(item)).toBe(60);
  });

  it('debe retornar 0 para valores vacíos o nulos', () => {
    expect(pipe.transform(null)).toBe(0);
    expect(pipe.transform(undefined)).toBe(0);
  });
});
