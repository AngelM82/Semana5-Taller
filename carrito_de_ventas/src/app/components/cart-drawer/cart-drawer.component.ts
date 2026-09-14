import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';
import { TotalCarritoPipe } from '../../pipes/total-carrito.pipe';
import { MonedaPipe } from '../../pipes/moneda.pipe';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    SubtotalPipe,
    TotalCarritoPipe,
    MonedaPipe
  ],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css']
})
export class CartDrawerComponent {
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();

  private carritoService = inject(CarritoService);

  // Observables expuestos para suscripción directa con async pipe
  public carrito$ = this.carritoService.carrito$;
  public cantidadTotal$ = this.carritoService.cantidadTotal$;

  onCerrar(): void {
    this.cerrar.emit();
  }

  incrementar(id: number): void {
    this.carritoService.incrementarCantidad(id);
  }

  decrementar(id: number): void {
    this.carritoService.decrementarCantidad(id);
  }

  eliminar(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  vaciar(): void {
    if (confirm('¿Deseas vaciar todos los productos del carrito?')) {
      this.carritoService.vaciarCarrito();
    }
  }

  finalizarCompra(): void {
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.');
    this.carritoService.vaciarCarrito();
    this.onCerrar();
  }
}
