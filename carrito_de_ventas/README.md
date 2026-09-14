# Carrito de Ventas con Observables y Pipes en Angular

Aplicación web interactiva desarrollada con **Angular**, orientada a la gestión reactiva del flujo de un carrito de compras. Utiliza **Observables** con `BehaviorSubject` para compartir el estado entre componentes desacoplados y **Pipes personalizados** para el cálculo dinámico de subtotales y totales.

---

## 📌 ¿Qué se hizo en este proyecto?

Se desarrolló una solución modular, limpia y completamente en español que cumple con todos los objetivos del flujo de un carrito de ventas:

### 1. Modelo de Datos (`src/app/models/producto.model.ts`)
Se definieron interfaces tipadas para estructurar la información del catálogo y del carrito:
- **`Producto`**: contiene `id`, `nombre`, `descripcion`, `precio`, `categoria`, `imagen` y `stock`.
- **`ItemCarrito`**: representa la relación entre un producto y la `cantidad` seleccionada por el usuario.

### 2. Servicio Reactivo del Carrito (`src/app/services/carrito.service.ts`)
Actúa como la **fuente única de la verdad** del estado del carrito:
- Utiliza un `BehaviorSubject<ItemCarrito[]>` privado para almacenar la lista de productos seleccionados.
- Expone flujos observables públicos:
  - `carrito$`: emite la lista actualizada de ítems a todos los componentes suscritos.
  - `cantidadTotal$`: calcula y emite reactivamente la sumatoria de unidades en el carrito.
  - `totalPagar$`: calcula y emite el monto total acumulado.
- Métodos disponibles:
  - `agregarProducto(producto, cantidad)`: añade un producto o incrementa su cantidad si ya existe, validando el stock disponible.
  - `incrementarCantidad(productoId)`: aumenta en 1 la cantidad respetando las existencias.
  - `decrementarCantidad(productoId)`: reduce en 1 la cantidad o elimina el ítem si llega a 0.
  - `eliminarProducto(productoId)`: remueve un ítem específico por su ID.
  - `vaciarCarrito()`: limpia por completo el contenido del carrito.

### 3. Pipes Personalizados (`src/app/pipes/`)
Transforman y calculan datos directamente en las plantillas HTML:
- **`SubtotalPipe` (`subtotal`)**: Calcula el subtotal multiplicando `precio * cantidad`. Se utiliza tanto en la tarjeta del producto como en cada fila del carrito.
- **`TotalCarritoPipe` (`totalCarrito`)**: Recorre la lista de productos en el carrito y calcula la sumatoria total a pagar.
- **`MonedaPipe` (`moneda`)**: Da formato estándar de moneda (`$1,200.00`) con dos decimales y separador de miles.

### 4. Componentes Desacoplados (`src/app/components/`)
- **`NavbarComponent`**: Barra superior que muestra el título y el botón para abrir el carrito, con un contador reactivo (badge) que se actualiza automáticamente mediante el pipe `async` (`{{ (cantidadTotal$ | async) || 0 }}`).
- **`ProductListComponent`**: Catálogo que renderiza la lista de productos disponibles en una cuadrícula responsiva.
- **`ProductCardComponent`**: Tarjeta individual de producto con selector de cantidad, cálculo previo del subtotal y botón para agregar al carrito.
- **`CartDrawerComponent`**: Panel lateral del carrito donde se listan los productos añadidos, controles de cantidad `+` y `-`, botón de eliminar por ítem, subtotales por producto, total general y opciones para vaciar o comprar.

### 5. Estilos CSS Sencillos y Limpios
Se utilizó CSS estándar, ligero y directo, sin librerías pesadas ni estilos sobrecargados, garantizando una interfaz clara, responsiva y fácil de entender.

---

## 🚀 ¿Cómo probar la aplicación paso a paso?

### Requisitos previos
Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

### Paso 1: Iniciar el servidor local
Abre una terminal en la carpeta del proyecto (`carrito_de_ventas`) y ejecuta:

```bash
ng serve
```
*(o también puedes usar `npm start` / `pnpm start`)*

### Paso 2: Abrir en el navegador
Una vez iniciado el servidor, abre tu navegador web e ingresa a:
```
http://localhost:4200/
```

### Paso 3: Probar la reactividad del contador (Navbar)
1. Observa el botón **"Ver Carrito"** en la barra superior: inicialmente muestra el número **0**.
2. En cualquier producto del catálogo (por ejemplo, *Laptop Pro 15 pulgadas*), haz clic en el botón **"Agregar al Carrito"**.
3. Verifica que el contador de la barra superior cambie automáticamente a **1** sin recargar la página.

### Paso 4: Probar el pipe de Subtotal en la tarjeta
1. En un producto del catálogo, aumenta la cantidad a **2** o **3** usando el botón **`+`**.
2. Verás que aparece debajo del precio la etiqueta:
   `Subtotal (X unidades): $XXX.00`
   Este cálculo se realiza en tiempo real mediante el pipe **`subtotal`**.
3. Haz clic en **"Agregar al Carrito"** y confirma que el contador superior sume las unidades correspondientes.

### Paso 5: Abrir y revisar el panel del carrito
1. Haz clic en el botón **"Ver Carrito"** de la barra superior.
2. Se desplegará el panel lateral con la lista de todos los productos que agregaste.
3. Observa que en cada fila se muestra:
   - El precio unitario formateado con el pipe **`moneda`**.
   - Los botones **`−`** y **`+`** con la cantidad actual.
   - El **Subtotal** de ese producto calculado mediante **`SubtotalPipe`**.
4. En la parte inferior se muestra el **Total General**, calculado automáticamente mediante el pipe **`TotalCarritoPipe`**.

### Paso 6: Modificar cantidades en el carrito
1. Dentro del panel del carrito, haz clic en el botón **`+`** de cualquier producto para incrementar su cantidad.
2. Observa cómo el subtotal de ese producto y el Total General cambian de forma instantánea y reactiva.
3. Haz clic en el botón **`−`** para decrementar la cantidad.

### Paso 7: Eliminar productos individuales
1. Haz clic en el enlace rojo **"Eliminar"** de cualquier producto en el carrito.
2. El producto desaparecerá de la lista y el Total General se recalculará inmediatamente.

### Paso 8: Vaciar el carrito
1. Haz clic en el botón **"Vaciar Carrito"**.
2. Confirma el mensaje en pantalla.
3. El carrito quedará en estado vacío y el contador del Navbar volverá a **0**.

### Paso 9: Ejecutar las pruebas unitarias automáticas
Para comprobar que los servicios, pipes y componentes funcionan correctamente a nivel de código, ejecuta:

```bash
npx vitest run
```

Se ejecutarán todas las pruebas unitarias verificando:
- Cálculos correctos de `SubtotalPipe`.
- Sumatorias de `TotalCarritoPipe`.
- Flujos reactivos de agregar, incrementar, decrementar y vaciar en `CarritoService`.
- Estado inicial y alternancia del componente principal `App`.

---

## 📁 Estructura del Código

```text
src/
└── app/
    ├── models/
    │   └── producto.model.ts          # Interfaces Producto e ItemCarrito
    ├── pipes/
    │   ├── subtotal.pipe.ts           # Pipe para cálculo de subtotal (precio * cantidad)
    │   ├── total-carrito.pipe.ts      # Pipe para sumatoria total del carrito
    │   └── moneda.pipe.ts             # Pipe para formateo de montos a moneda
    ├── services/
    │   ├── carrito.service.ts         # Servicio con BehaviorSubject y lógica del carrito
    │   └── producto.service.ts        # Catálogo de productos disponibles
    ├── components/
    │   ├── navbar/                    # Barra de navegación con contador reactivo
    │   ├── product-list/              # Catálogo de productos en cuadrícula
    │   ├── product-card/              # Tarjeta de producto individual
    │   └── cart-drawer/               # Panel lateral del carrito de compras
    ├── app.ts                         # Componente raíz
    ├── app.html                       # Plantilla principal
    ├── app.css                        # Estilos generales del layout
    └── styles.css                     # Estilos globales y reset
```
