# Proyecto en React para Coderhouse

Este proyecto fue creado como parte de un curso de Coderhouse y se puede encontrar en [hym.netlify.app](https://hym.netlify.app). Está construido utilizando React y consta de varios componentes que se describen a continuación.

## Componentes

### App
En este componente, se utiliza BrowserRouter para dirigir al usuario hacia distintos componentes a través de la navegación. Los componentes que se incluyen son: Home, Product Seccion, Nosotros, Cart y ProductManagementPage.

### Home
Este componente contiene un carousel que muestra todos los productos disponibles y una galería de imágenes en formato 3D. También incluye el footer en la parte inferior de la página.

### Navbar
Este componente siempre está visible y contiene tres links llamados Inicio, Productos y Nosotros. Además, hay una imagen de un carrito que lleva al usuario a la lista de los productos seleccionados. El navbar también incluye un icono que permite cambiar los estilos de la página de claro a oscuro y viceversa.

### Product Seccion
Este componente muestra todos los productos disponibles con sus respectivos detalles. Al hacer clic en uno de los productos, el usuario es dirigido al ProductDetailViewLink.

### ProductDetailViewLink
Este componente muestra todos los detalles de un producto elegido, así como la opción de agregarlo al carrito con la cantidad deseada.

### Cart
Este componente es el carrito donde se muestran todos los productos seleccionados por el usuario para revisar lo elegido. Incluye diversas opciones, incluyendo un botón para realizar el check-out.

### Checkout
Este componente pide al usuario que proporcione su nombre, teléfono y correo electrónico para crear una orden de compra, que se mostrará en pantalla después de cargarla en Firebase.

### Nosotros
Este componente presenta una carta de presentación personal del creador del proyecto, junto con algunos datos relevantes.

### ProductManagementPage
Este componente está diseñado para el administrador del e-commerce y permite agregar, buscar y ver los productos en el inventario.

## Conclusión
En resumen, este proyecto de React para Coderhouse consta de varios componentes que interactúan entre sí para crear un e-commerce funcional. Entre los aspectos destacados se incluyen la navegación a través de BrowserRouter, el carrito de compras y la gestión de productos utilizando FireBase. Este proyecto se puede encontrar en [hym.netlify.app](https://hym.netlify.app).
