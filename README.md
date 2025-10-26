# Proyecto React — Resumen

Descripción breve
- Aplicación frontend creada con React (plantilla Vite).  
- Interfaz con componente de navegación (Navbar) y carrito de compra (Cart).  
- Estilos organizados por componente en `src/Componentes/...`.

Cómo ejecutar (Windows)
1. Abrir PowerShell o Terminal en la carpeta del proyecto:
   cd "c:\Users\kayli\OneDrive\Desktop\proyectoReact"
2. Instalar dependencias:
   npm install
3. Iniciar servidor de desarrollo (mantener la terminal abierta para live reload):
   npm run dev
4. Abrir la URL que muestre la terminal (ej. http://localhost:5173).

Estructura y archivos principales
- .gitignore  
  - Excluye `node_modules`, logs, carpetas de build y configuraciones de editores.

- package.json (raíz)  
  - Scripts típicos: `dev`, `build`, `preview`. Dependencias de React y Vite.

- src/
  - Componentes/
    - Navbar/
      - Navbar.css — estilos del encabezado: logo, links, barra de búsqueda, iconos y contador. Diseño responsive y efectos hover.
      - Navbar.jsx (o .js) — (componente) controla navegación, búsqueda y accesos rápidos (favicon, carrito, etc.).
    - Cart/
      - Cart.css — estilos del carrito: lista de artículos, controles de cantidad, resumen y botón de checkout. Incluye adaptaciones responsive y estilos de resumen/total.
      - Cart.jsx (o .js) — (componente) muestra los productos añadidos, permite aumentar/disminuir cantidad, eliminar y visualizar total.
  - App.jsx (o .js)  
    - Enrutamiento básico / layout global. Renderiza Navbar y rutas/páginas principales.
  - main.jsx (o index.jsx)  
    - Punto de entrada que monta la app en el DOM.

Funcionalidades principales
- Navegación: logo y enlaces para moverse entre secciones. Hover y estilos activos.
- Búsqueda: input en el Navbar para filtrar o buscar elementos (dependiendo de la implementación).
- Carrito: lista dinámica de productos, controles de cantidad, eliminación y resumen con total. Botón de checkout con estilos y comportamiento responsive.
- Estilos: CSS modular por componentes para mantener lógica y diseño separados.

