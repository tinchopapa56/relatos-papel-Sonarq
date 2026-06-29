# Tareas

## Vistas

1. Landing DONE
2. Vista de inicio de sesión DONE
3. Vista de página principal DONE
4. Vista de libro DONE
5. Carrito DONE
6. Vista de checkout DONE
7. Vista de perfil DONE

---

## Detalle

### 1. Vista de acceso

Muestra la landing page pública de la aplicación.

---

### 2. Vista de inicio de sesión

Formulario sencillo para iniciar sesión.

- No se contempla registro; se asume que los usuarios ya existen.
- Al iniciar sesión correctamente, redirige a la **vista de perfil**.

---

### 3. Vista de página principal

Catálogo de libros disponibles en la tienda.

- Barra de búsqueda en la parte superior.
  - En el futuro filtrará por cualquier término (autor, código, título, etc.).
  - Por ahora filtra únicamente por **título de libro**.
- Al hacer clic en un libro se redirige a la **vista de libro**.

---

### 4. Vista de libro

Detalle de un libro en concreto.

- Muestra la información completa del libro.
- Permite añadir el libro al carrito.
- **Solo se puede añadir al carrito desde esta vista**, no desde el catálogo.

---

### 5. Carrito

Visible tanto en la vista de página principal como en la de libro (siempre visible o mediante un panel desplegable).

- Lista todos los libros que el usuario decidió comprar.
- Permite eliminar libros individualmente.
- Permite proceder al checkout.

---

### 6. Vista de checkout _(protegida)_

Accesible únicamente si el usuario está autenticado.

- Muestra un resumen de los libros a comprar.
- Al confirmar el pago:
  1. Mostrar `window.alert` indicando que el pedido se realizó.
  2. Vaciar el carrito.
  3. Redirigir a la vista de página principal.

---

### 7. Vista de perfil _(protegida)_

Accesible únicamente si el usuario está autenticado.

- Muestra los datos del perfil del usuario.
- Muestra un listado con los **últimos 5 pedidos** realizados.
