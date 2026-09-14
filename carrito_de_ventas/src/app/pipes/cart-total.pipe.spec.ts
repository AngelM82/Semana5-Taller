import { describe, it, expect } from 'vitest';
import { TotalCarritoPipe } from './total-carrito.pipe';
import { ItemCarrito } from '../models/producto.model';

describe('TotalCarritoPipe', () => {
  const pipe = new TotalCarritoPipe();

  const itemsPrueba: ItemCarrito[] = [
    {
      producto: {
        id: 1,
        nombre: 'Item 1',
        descripcion: '',
        precio: 100,
        categoria: 'Cat',
        imagen: '',
        stock: 10
      },
      cantidad: 2 // subtotal = 200
    },
    {
      producto: {
        id: 2,
        nombre: 'Item 2',
        descripcion: '',
        precio: 300,
        categoria: 'Cat',
        imagen: '',
        stock: 5
      },
      cantidad: 1 // subtotal = 300
    }
  ];

  it('debe calcular la sumatoria total del carrito correctamente', () => {
    // 200 + 300 = 500
    expect(pipe.transform(itemsPrueba)).toBe(500);
  });

  it('debe retornar 0 para carritos vacíos o nulos', () => {
    expect(pipe.transform([])).toBe(0);
    expect(pipe.transform(null)).toBe(0);
    expect(pipe.transform(undefined)).toBe(0);
  });
});
