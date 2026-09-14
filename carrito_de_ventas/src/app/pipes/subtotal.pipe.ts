import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/producto.model';

@Pipe({
  name: 'subtotal',
  standalone: true
})
export class SubtotalPipe implements PipeTransform {
  // Calcula precio * cantidad de forma simple
  transform(valor: number | ItemCarrito | null | undefined, cantidad: number = 1): number {
    if (!valor) return 0;

    // Si recibe un ItemCarrito directamente
    if (typeof valor === 'object' && 'producto' in valor) {
      return (valor.producto.precio || 0) * (valor.cantidad || 0);
    }

    // Si recibe precio y cantidad por separado
    return Number(valor) * (Number(cantidad) || 1);
  }
}
