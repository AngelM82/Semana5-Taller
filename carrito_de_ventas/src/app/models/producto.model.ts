export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
