import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/producto.model';
import { TotalCarritoPipe } from './total-carrito.pipe';

@Pipe({
  name: 'cartTotal',
  standalone: true
})
export class CartTotalPipe implements PipeTransform {
  private pipe = new TotalCarritoPipe();

  transform(items: ItemCarrito[] | null | undefined): number {
    return this.pipe.transform(items);
  }
}
