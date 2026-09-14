import { describe, it, expect, beforeEach } from 'vitest';
import { CarritoService } from './carrito.service';
import { Producto } from '../models/producto.model';

describe('CarritoService', () => {
  let servicio: CarritoService;

  const mockProducto: Producto = {
    id: 1,
    nombre: 'Teclado Gamer',
    descripcion: 'Teclado mecánico',
    precio: 50,
    categoria: 'Periféricos',
    imagen: '',
    stock: 5
  };

  beforeEach(() => {
    servicio = new CarritoService();
  });

  it('debe iniciar con el carrito vacío', () => {
    expect(servicio.obtenerItems().length).toBe(0);
  });

  it('debe agregar un producto al carrito', () => {
    servicio.agregarProducto(mockProducto, 2);
    const items = servicio.obtenerItems();

    expect(items.length).toBe(1);
    expect(items[0].producto.id).toBe(1);
    expect(items[0].cantidad).toBe(2);
  });

  it('debe acumular la cantidad si se agrega el mismo producto', () => {
    servicio.agregarProducto(mockProducto, 1);
    servicio.agregarProducto(mockProducto, 2);
    const items = servicio.obtenerItems();

    expect(items.length).toBe(1);
    expect(items[0].cantidad).toBe(3);
  });

  it('debe incrementar la cantidad con incrementarCantidad()', () => {
    servicio.agregarProducto(mockProducto, 1);
    servicio.incrementarCantidad(mockProducto.id);

    expect(servicio.obtenerItems()[0].cantidad).toBe(2);
  });

  it('debe decrementar la cantidad con decrementarCantidad()', () => {
    servicio.agregarProducto(mockProducto, 2);
    servicio.decrementarCantidad(mockProducto.id);

    expect(servicio.obtenerItems()[0].cantidad).toBe(1);
  });

  it('debe eliminar producto si la cantidad se decrementa desde 1', () => {
    servicio.agregarProducto(mockProducto, 1);
    servicio.decrementarCantidad(mockProducto.id);

    expect(servicio.obtenerItems().length).toBe(0);
  });

  it('debe eliminar producto por su ID con eliminarProducto()', () => {
    servicio.agregarProducto(mockProducto, 2);
    servicio.eliminarProducto(mockProducto.id);

    expect(servicio.obtenerItems().length).toBe(0);
  });

  it('debe vaciar todos los productos con vaciarCarrito()', () => {
    servicio.agregarProducto(mockProducto, 2);
    servicio.vaciarCarrito();

    expect(servicio.obtenerItems().length).toBe(0);
  });
});
