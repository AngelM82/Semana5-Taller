import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';
import { MonedaPipe } from '../../pipes/moneda.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SubtotalPipe, MonedaPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) producto!: Producto;

  private carritoService = inject(CarritoService);

  public cantidad: number = 1;

  incrementar(): void {
    if (this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  decrementar(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregar(): void {
    this.carritoService.agregarProducto(this.producto, this.cantidad);
    this.cantidad = 1; // Reiniciar contador
  }
}
