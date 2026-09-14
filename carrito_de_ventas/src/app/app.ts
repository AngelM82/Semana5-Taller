import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ProductListComponent,
    CartDrawerComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  public carritoVisible: boolean = false;

  alternarCarrito(): void {
    this.carritoVisible = !this.carritoVisible;
  }

  cerrarCarrito(): void {
    this.carritoVisible = false;
  }
}
