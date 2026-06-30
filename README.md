# Relatos de Papel — Frontend

React 19 + TypeScript + Vite + Tailwind CSS v4
test synk
---

## Convenciones del proyecto

### Nomenclatura

- **Componentes**: PascalCase — `BookCard.tsx`, `CartDrawer.tsx`
- **Hooks**: camelCase con prefijo `use` obligatorio — `useAuth.ts`, `useCart.ts`
- **Archivos de utilidades**: camelCase — `formatters.ts`
- **Archivos CSS**: kebab-case — `global-tokens.css`
- **Tipos/Interfaces**: PascalCase — `Book`, `CartItem`

### Imports

Se usa el alias `@/` apuntando a `src/`. Preferir siempre imports absolutos.

```ts
// bien
import { BookCard } from '@/features/books'
import { useAuth } from '@/features/auth'

// evitar
import { BookCard } from '../../features/books'
```

### Barrel exports

Cada feature expone su API pública a través de `index.ts`. Solo se exporta lo que otras partes de la app necesitan consumir.

```ts
// features/books/index.ts
export { BookCard } from './components/BookCard'
export { useBooks } from './hooks/useBooks'
export type { Book } from './types'
```

### Regla entre features

Los features **no se importan entre sí**. Si un componente o tipo es necesario en dos features distintas, se mueve a `shared/`.

```
features/books  -->  shared/   OK
features/books  -->  features/cart   NO
```

### Estructura de una feature

```
features/nombre/
├── components/   # Componentes UI específicos de esta feature
├── hooks/        # Custom hooks propios
├── store/        # Context + reducer (solo si la feature tiene estado global)
├── types.ts      # Tipos e interfaces de dominio
└── index.ts      # Barrel export (API pública de la feature)
```

### Pages

Las pages son **thin**: no tienen lógica propia, solo componen features y manejan el layout de la ruta.

```tsx
// bien
export default function HomePage() {
  return (
    <Layout>
      <BookGrid />
      <CartDrawer />
    </Layout>
  )
}
```

### Capa API (`src/api/`)

- `http.ts`: base client (fetch wrapper con base URL y manejo de errores)
- Un archivo por dominio: `books.ts`, `auth.ts`, `orders.ts`
- Hoy usan datos mockeados; cuando llegue el backend Java, se reemplaza el cuerpo de cada función sin tocar componentes

### Variables de entorno

```
VITE_API_URL=http://localhost:8080
```
