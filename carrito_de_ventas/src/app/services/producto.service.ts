import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private listaProductos: Producto[] = [
    {
      id: 1,
      nombre: 'Laptop Pro 15 pulgadas',
      descripcion: 'Procesador Intel Core i7, 16GB RAM, 512GB SSD.',
      precio: 1200,
      categoria: 'Laptops',
      stock: 8,
      imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      nombre: 'Laptop Ultrabook 13 pulgadas',
      descripcion: 'Procesador veloz, 8GB RAM, 256GB SSD, ligera y portátil.',
      precio: 950,
      categoria: 'Laptops',
      stock: 5,
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      nombre: 'Monitor Gamer 27 pulgadas',
      descripcion: 'Panel IPS Full HD, 144Hz de tasa de refresco, 1ms.',
      precio: 250,
      categoria: 'Monitores',
      stock: 12,
      imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      nombre: 'Teclado Mecánico RGB',
      descripcion: 'Switches mecánicos táctiles, retroiluminación configurable.',
      precio: 60,
      categoria: 'Periféricos',
      stock: 20,
      imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      nombre: 'Mouse Inalámbrico Ergonómico',
      descripcion: 'Conexión inalámbrica 2.4GHz, sensor óptico de alta precisión.',
      precio: 35,
      categoria: 'Periféricos',
      stock: 15,
      imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 6,
      nombre: 'Audífonos Bluetooth con Cancelación de Ruido',
      descripcion: 'Sonido estéreo de alta definición, batería de hasta 30 horas.',
      precio: 180,
      categoria: 'Audio',
      stock: 9,
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 7,
      nombre: 'Micrófono de Condensador USB',
      descripcion: 'Ideal para transmisiones, grabaciones y llamadas con soporte antivibraciones.',
      precio: 90,
      categoria: 'Audio',
      stock: 10,
      imagen: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 8,
      nombre: 'Cámara Web Full HD 1080p',
      descripcion: 'Video nítido con micrófono integrado para conferencias y clases.',
      precio: 50,
      categoria: 'Periféricos',
      stock: 14,
      imagen: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=500&q=80'
    }
  ];

  obtenerProductos(): Producto[] {
    return this.listaProductos;
  }
}
