# Componentes compartidos

Documentación de uso de `Toast` y `Dialog`.

---

## Toast

Mensaje no bloqueante que se muestra y se auto-cierra. El padre controla cuándo se muestra y reacciona al cierre.

### Props

| Prop       | Tipo                                          | Default  | Descripción                         |
| ---------- | --------------------------------------------- | -------- | ----------------------------------- |
| `message`  | `string`                                      | —        | Texto principal. **Requerido.**     |
| `title`    | `string`                                      | —        | Título opcional encima del mensaje. |
| `severity` | `'success' \| 'error' \| 'info' \| 'warning'` | `'info'` | Color y ícono.                      |
| `life`     | `number` (ms)                                 | `3000`   | Tiempo antes de auto-cerrarse.      |
| `onClose`  | `(reason: 'timeout' \| 'manual') => void`     | —        | Se llama al cerrar. **Requerido.**  |

### Posicionamiento

El componente **no se posiciona solo**. El padre lo envuelve en un contenedor `fixed` (típicamente arriba a la derecha):

```tsx
{
  toast && (
    <div className="fixed right-6 top-6 z-50">
      <Toast {...toast} onClose={() => setToast(null)} />
    </div>
  );
}
```

### Ejemplo: feedback al modificar el carrito

```tsx
import { useState } from "react";
import { Toast, type ToastSeverity } from "@/shared";

type ToastState = { severity: ToastSeverity; title: string; message: string };

const [toast, setToast] = useState<ToastState | null>(null);

const handleAdd = () => {
  addItem(book);
  setToast({
    severity: "info",
    title: "Agregado al carrito",
    message: `${book.title} se añadió a tu carrito.`,
  });
};

return (
  <>
    {/* ... */}
    {toast && (
      <div className="fixed right-6 top-6 z-50">
        <Toast
          key={`${toast.severity}-${toast.message}`}
          {...toast}
          onClose={() => setToast(null)}
        />
      </div>
    )}
  </>
);
```

> **Tip:** usá un `key` que dependa del contenido para reiniciar el timer cuando se dispara el mismo tipo de toast varias veces seguidas.

### Reaccionar distinto según el motivo de cierre

```tsx
<Toast
  message="Sesión por expirar"
  severity="warning"
  onClose={(reason) => {
    if (reason === "manual") logActivity("user-dismissed");
    setToast(null);
  }}
/>
```

---

## Dialog

Modal bloqueante centrado en la pantalla con backdrop oscuro. Se cierra por backdrop, ESC o botón ×.

### Props

| Prop              | Tipo                                                   | Default | Descripción                                 |
| ----------------- | ------------------------------------------------------ | ------- | ------------------------------------------- |
| `open`            | `boolean`                                              | —       | Si está abierto. **Requerido.**             |
| `title`           | `string`                                               | —       | Título opcional.                            |
| `children`        | `ReactNode`                                            | —       | Contenido del modal. **Requerido.**         |
| `footer`          | `ReactNode`                                            | —       | Acciones (botones) alineadas a la derecha.  |
| `onClose`         | `(reason: 'backdrop' \| 'escape' \| 'manual') => void` | —       | Se llama al cerrar. **Requerido.**          |
| `closeOnBackdrop` | `boolean`                                              | `true`  | Si el click en el backdrop cierra el modal. |
| `closeOnEscape`   | `boolean`                                              | `true`  | Si la tecla ESC cierra el modal.            |

### Ejemplo: confirmación de pedido

```tsx
import { useState } from "react";
import { Dialog } from "@/shared";

const [orderTotal, setOrderTotal] = useState<number | null>(null);

return (
  <Dialog
    open={orderTotal !== null}
    title="¡Pedido realizado con éxito!"
    footer={
      <button
        type="button"
        onClick={handleAccept}
        className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white"
      >
        Volver al catálogo
      </button>
    }
    onClose={handleAccept}
  >
    <p>Tu pedido fue procesado correctamente.</p>
    <p className="mt-2 text-base font-semibold text-heading">
      Total abonado: ${orderTotal?.toFixed(2)}
    </p>
  </Dialog>
);
```

### Ejemplo: confirmar acción destructiva

```tsx
<Dialog
  open={confirmOpen}
  title="¿Eliminar libro del carrito?"
  closeOnBackdrop={false}
  footer={
    <>
      <button onClick={() => setConfirmOpen(false)}>Cancelar</button>
      <button
        onClick={() => {
          removeItem(book.id);
          setConfirmOpen(false);
        }}
        className="bg-error text-white"
      >
        Eliminar
      </button>
    </>
  }
  onClose={() => setConfirmOpen(false)}
>
  Esta acción no se puede deshacer.
</Dialog>
```

> **Tip:** para diálogos críticos, desactivá `closeOnBackdrop` (y opcionalmente `closeOnEscape`) para forzar al usuario a usar los botones del footer.

---

## Cuándo usar cada uno

| Situación                                              | Componente |
| ------------------------------------------------------ | ---------- |
| Confirmación rápida de una acción ya completada        | `Toast`    |
| Notificación de error que no requiere acción inmediata | `Toast`    |
| Confirmar acción destructiva antes de ejecutarla       | `Dialog`   |
| Mostrar resumen importante que el usuario debe aceptar | `Dialog`   |
| Formulario o flujo que necesita pausar la UI principal | `Dialog`   |

---

# RELATOS-PAPEL-FRONT — Roadmap

## ✅ Features Completadas (Frontend Ready)

### **Autenticación & Usuarios**

- [x] Página de Login con Formik + Yup
- [x] Página de Register con validaciones
- [x] Context de Auth con localStorage
- [x] Protected Routes (checkout, profile)
- [x] Rol-based access (admin dashboard)

### **Landing Page**

- [x] Hero section con gradient overlay
- [x] Features grid (Envío Flash, Lectura Inmediata, Pago Seguro)
- [x] Featured Carousel (3-item slider con prev/next)
- [x] CTA section personalizado por rol
- [x] Responsive design (mobile-first)

### **Catálogo de Libros**

- [x] Grid responsivo (1/2/3/4 columnas según viewport)
- [x] Búsqueda por título con URL params
- [x] Paginación (8 items/página)
- [x] BookCard con hover effects
- [x] Bookdetail page con "Agregar al carrito"

### **Carrito & Checkout**

- [x] CartContext global (add/remove/update/clear)
- [x] Icono de carrito en navbar con contador
- [x] Checkout page con formulario de envío
- [x] Soporte: Envío Digital + Envío Estándar
- [x] Validación condicional (Formik + Yup)
- [x] Dialog de confirmación de orden

### **Perfil de Usuario**

- [x] Página de perfil con info del usuario
- [x] Últimos 5 pedidos realizados
- [x] Status badges (processing, shipped, delivered)
- [x] Responsive layout

### **Admin Dashboard**

- [x] Rutas protegidas (admin-only)
- [x] Dashboard con estadísticas
- [x] Inventory: CRUD de libros
- [x] Users: Listado con paginación
- [x] Orders: Órdenes físicas con búsqueda

### **UI/UX**

- [x] Dark mode toggle con localStorage
- [x] Sistema de diseño tokens (colors, spacing, shadows)
- [x] Navbar responsive con mobile menu dropdown
- [x] Toast notifications
- [x] Dialog component
- [x] Quantity counter

---

## 🔄 En Progreso / Ajustes Finales

- [ ] Carousel vertical spacing (spacing entre secciones)
- [ ] Navbar responsive refinement (mobile menu UX)
- [ ] "Pendientes" → converted to user pending orders page

---

## 📋 Pendientes para Backend / API Integration

### **Autenticación**

- [ ] API POST `/auth/login` → validar credenciales reales
- [ ] API POST `/auth/register` → guardar usuario en BD
- [ ] JWT tokens + refresh tokens
- [ ] Session persistence

### **Catálogo & Libros**

- [ ] API GET `/books` → traer libros reales de BD
- [ ] API GET `/books/:id` → detalles de libro
- [ ] API POST `/books/:id/reviews` → reseñas de usuarios
- [ ] Filtros avanzados: genre, author, price range
- [ ] Rating/stars system

### **Carrito & Órdenes**

- [ ] API POST `/orders` → crear orden en BD
- [ ] API GET `/orders` → órdenes del usuario
- [ ] API PATCH `/orders/:id` → actualizar estado
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Envío digital: generar link de descarga

### **Admin Features**

- [ ] API PATCH `/books/:id` → editar inventario
- [ ] API DELETE `/books/:id` → eliminar libro
- [ ] Real-time order tracking
- [ ] Reportes de ventas

### **General**

- [ ] Email notifications (confirmación, envío, entrega)
- [ ] Push notifications
- [ ] Analytics & user tracking
- [ ] SEO optimization
- [ ] CDN para imágenes

---

## 🛠️ Tech Stack Actual

| Aspecto       | Herramienta                 |
| ------------- | --------------------------- |
| Framework     | React 18 + TypeScript       |
| Build         | Vite                        |
| Styling       | Tailwind CSS v4             |
| Routing       | React Router v6             |
| State         | React Context               |
| Forms         | Formik + Yup                |
| UI Components | Custom (Dialog, Toast, etc) |

---

## 🚀 Siguientes Pasos

1. **Backend Setup**: Node.js + Express/NestJS + MongoDB
2. **API Integration**: Conectar endpoints al frontend
3. **Database Schema**: Users, Books, Orders, Reviews
4. **Authentication**: JWT implementation
5. **Testing**: Unit tests + E2E tests

---

_Last updated: May 7, 2026_
