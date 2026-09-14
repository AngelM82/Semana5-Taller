import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto, ItemCarrito } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Estado compartido con BehaviorSubject (fuente de verdad)
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);

  // Observable público para que los componentes se suscriban
  public carrito$: Observable<ItemCarrito[]> = this.carritoSubject.asObservable();

  // Observable reactivo que calcula la cantidad total de artículos
  public cantidadTotal$: Observable<number> = this.carrito$.pipe(
    map(items => items.reduce((total, item) => total + item.cantidad, 0))
  );

  // Observable reactivo que calcula el total monetario a pagar
  public totalPagar$: Observable<number> = this.carrito$.pipe(
    map(items => items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0))
  );

  // Obtener el valor actual del carrito de forma síncrona
  public obtenerItems(): ItemCarrito[] {
    return this.carritoSubject.getValue();
  }

  // Agregar un producto al carrito
  public agregarProducto(producto: Producto, cantidad: number = 1): void {
    if (cantidad <= 0) return;

    const itemsActuales = [...this.carritoSubject.getValue()];
    const indiceExistente = itemsActuales.findIndex(item => item.producto.id === producto.id);

    if (indiceExistente !== -1) {
      // Si el producto ya existe en el carrito, sumar la cantidad
      const itemExistente = itemsActuales[indiceExistente];
      const nuevaCantidad = itemExistente.cantidad + cantidad;

      // Validar stock disponible
      if (nuevaCantidad > producto.stock) {
        alert(`Stock máximo disponible para ${producto.nombre} es de ${producto.stock} unidades.`);
        return;
      }

      itemsActuales[indiceExistente] = {
        ...itemExistente,
        cantidad: nuevaCantidad
      };
    } else {
      // Si es un producto nuevo en el carrito
      if (cantidad > producto.stock) {
        alert(`Solo hay ${producto.stock} unidades disponibles.`);
        return;
      }

      itemsActuales.push({ producto, cantidad });
    }

    // Emitir el nuevo estado del carrito a todos los componentes suscritos
    this.carritoSubject.next(itemsActuales);
  }

  // Incrementar en 1 la cantidad
  public incrementarCantidad(productoId: number): void {
    const items = [...this.carritoSubject.getValue()];
    const item = items.find(i => i.producto.id === productoId);
    if (!item) return;

    if (item.cantidad < item.producto.stock) {
      item.cantidad++;
      this.carritoSubject.next(items);
    } else {
      alert(`No hay más stock disponible.`);
    }
  }

  // Decrementar en 1 la cantidad
  public decrementarCantidad(productoId: number): void {
    const items = [...this.carritoSubject.getValue()];
    const indice = items.findIndex(i => i.producto.id === productoId);
    if (indice === -1) return;

    if (items[indice].cantidad > 1) {
      items[indice].cantidad--;
      this.carritoSubject.next(items);
    } else {
      // Si llega a 0, se elimina
      this.eliminarProducto(productoId);
    }
  }

  // Eliminar un producto específico del carrito
  public eliminarProducto(productoId: number): void {
    const itemsActualizados = this.carritoSubject.getValue().filter(i => i.producto.id !== productoId);
    this.carritoSubject.next(itemsActualizados);
  }

  // Vaciar completamente el carrito
  public vaciarCarrito(): void {
    this.carritoSubject.next([]);
  }
}
