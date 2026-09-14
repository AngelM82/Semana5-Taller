# Documentación Técnica: Carrito de Ventas con Observables y Pipes en Angular

Aplicación web desarrollada con **Angular**, enfocada en la implementación reactiva de un flujo de compras utilizando **Observables** (`BehaviorSubject`) y **Pipes personalizados** para el cálculo de subtotales y totales.

---

## 1. Modelo de Datos (`src/app/models/producto.model.ts`)

Se definieron las estructuras tipadas para representar los productos y los elementos del carrito:

```typescript
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
```

---

## 2. Servicio Reactivo del Carrito (`src/app/services/carrito.service.ts`)

El servicio `CarritoService` actúa como la **fuente única de la verdad** del estado del carrito:
- **`BehaviorSubject<ItemCarrito[]>`**: mantiene en memoria la lista actual de productos seleccionados. Al emitir un nuevo valor con `.next()`, todos los componentes suscritos reciben la actualización de inmediato.
- **`carrito$`**: observable público que expone la lista de ítems.
- **`cantidadTotal$`**: observable reactivo que suma las unidades acumuladas en el carrito mediante el operador `map`.
- **`totalPagar$`**: observable reactivo que calcula el total monetario a pagar.

### Métodos del servicio:
- `agregarProducto(producto, cantidad)`: agrega un nuevo producto o incrementa la cantidad si ya existe, validando el límite de stock.
- `incrementarCantidad(productoId)`: suma 1 unidad al producto indicado.
- `decrementarCantidad(productoId)`: resta 1 unidad o elimina el producto si llega a 0.
- `eliminarProducto(productoId)`: elimina un producto del carrito por su ID.
- `vaciarCarrito()`: vacía completamente el carrito emitiendo un arreglo vacío `[]`.

---

## 3. Pipes Personalizados (`src/app/pipes/`)

Los pipes permiten realizar transformaciones y cálculos directamente en las plantillas HTML sin sobrecargar la lógica de los controladores:

### 3.1 `SubtotalPipe` (`src/app/pipes/subtotal.pipe.ts`)
- **Nombre:** `subtotal`
- **Función:** Multiplica el precio unitario por la cantidad (`precio * cantidad`).
- **Uso:**
  - En la tarjeta del producto: `{{ (producto.precio | subtotal:cantidad) | moneda }}`
  - En cada fila del carrito: `{{ item | subtotal | moneda }}`

### 3.2 `TotalCarritoPipe` (`src/app/pipes/total-carrito.pipe.ts`)
- **Nombre:** `totalCarrito`
- **Función:** Suma los subtotales de todos los elementos contenidos en el arreglo `ItemCarrito[]`.
- **Uso:**
  - En el pie del carrito: `{{ items | totalCarrito | moneda }}`

### 3.3 `MonedaPipe` (`src/app/pipes/moneda.pipe.ts`)
- **Nombre:** `moneda`
- **Función:** Da formato estándar de moneda (`$0.00`).

---

## 4. Componentes y Flujo de Comunicación

1. **`NavbarComponent` (`src/app/components/navbar/`):**
   - Muestra el encabezado y el botón para ver el carrito.
   - El contador se suscribe reactivamente a `cantidadTotal$` mediante el pipe `async`: `{{ (cantidadTotal$ | async) || 0 }}`.
2. **`ProductListComponent` (`src/app/components/product-list/`):**
   - Obtiene el listado de productos desde `ProductoService` y los renderiza en una cuadrícula.
3. **`ProductCardComponent` (`src/app/components/product-card/`):**
   - Tarjeta individual con los datos del producto, selector de cantidad `+` / `-`, cálculo previo del subtotal y botón para agregar al carrito.
4. **`CartDrawerComponent` (`src/app/components/cart-drawer/`):**
   - Panel lateral desplegable que lista los ítems del carrito con botones para alterar cantidades, eliminar productos, vaciar el carrito y finalizar la compra.

---

## 5. Instrucciones de Ejecución y Pruebas

1. **Iniciar la aplicación:**
   ```bash
   ng serve
   ```
   Abrir en el navegador: `http://localhost:4200/`

2. **Ejecutar pruebas unitarias:**
   ```bash
   npx vitest run
   ```
