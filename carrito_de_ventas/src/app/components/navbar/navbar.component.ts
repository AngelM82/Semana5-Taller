import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private carritoService = inject(CarritoService);

  // Observable de cantidad total conectado al servicio
  public cantidadTotal$ = this.carritoService.cantidadTotal$;

  @Output() alternarCarrito = new EventEmitter<void>();

  onAlternar(): void {
    this.alternarCarrito.emit();
  }
}
