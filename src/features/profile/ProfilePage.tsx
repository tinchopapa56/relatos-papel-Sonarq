import { useAuth } from '@/features/auth'
import { books } from '@/features/books/books'

// Mock de pedidos para la demo
const MOCK_ORDERS = [
  {
    id: 'RP-2024-005',
    date: '15 Abr 2024',
    status: 'Entregado',
    total: 34.50,
    items: [books[0], books[1]]
  },
  {
    id: 'RP-2024-004',
    date: '02 Mar 2024',
    status: 'Entregado',
    total: 18.00,
    items: [books[2]]
  },
  {
    id: 'RP-2024-003',
    date: '20 Feb 2024',
    status: 'Cancelado',
    total: 20.00,
    items: [books[3]]
  },
  {
    id: 'RP-2024-002',
    date: '10 Ene 2024',
    status: 'Entregado',
    total: 30.70,
    items: [books[4], books[5]]
  },
  {
    id: 'RP-2024-001',
    date: '28 Dic 2023',
    status: 'Entregado',
    total: 15.99,
    items: [books[0]]
  }
]

export default function ProfilePage() {
  const { logout, user } = useAuth()

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado': return 'bg-success/10 text-success'
      case 'En camino': return 'bg-primary/10 text-primary'
      case 'Cancelado': return 'bg-error/10 text-error'
      default: return 'bg-muted/10 text-muted'
    }
  }

  return (
    <main className="flex flex-1 flex-col p-6 sm:p-12 lg:px-24">
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Header de Perfil - Diseño Premium */}
        <section className="mb-12 flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8 text-center shadow-sm sm:flex-row sm:text-left">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-3xl font-bold text-primary shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h1 className="text-3xl font-bold text-heading">{user.name}</h1>
            <p className="text-muted">{user.email}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-4 sm:justify-start">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">Miembro desde</span>
                <span className="text-sm font-medium text-text">{user.memberSince}</span>
              </div>
              <div className="h-10 w-px bg-border hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">Tipo de Cuenta</span>
                <span className="text-sm font-medium text-primary">Lector Premium</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-4 rounded-full border border-error/20 px-6 py-2.5 text-sm font-semibold text-error transition-all hover:bg-error hover:text-white active:scale-95 sm:mt-0"
          >
            Cerrar sesión
          </button>
        </section>

        {/* Historial de Pedidos */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-xl font-bold text-heading">Mis Pedidos</h2>
              <p className="text-xs text-muted">Historial de tus últimas 5 compras</p>
            </div>
            <span className="rounded-full bg-raised px-3 py-1 text-xs font-medium text-muted border border-border">
              {MOCK_ORDERS.length} pedidos
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_ORDERS.map((order) => (
              <div 
                key={order.id}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex flex-col p-5 sm:flex-row sm:items-center">
                  
                  {/* Info del Pedido */}
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-widest text-primary">
                        {order.id}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter sm:hidden ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-text">{order.date}</span>
                  </div>

                  {/* Libros Comprados (Miniaturas con efecto stack) */}
                  <div className="my-6 flex items-center -space-x-3 sm:my-0 sm:mx-8">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="relative">
                        <img 
                          src={item.coverImage} 
                          alt={item.title}
                          className="h-12 w-9 rounded-md border-2 border-surface bg-raised object-cover shadow-sm transition-transform group-hover:-translate-y-1.5"
                          title={item.title}
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex h-12 w-9 items-center justify-center rounded-md border-2 border-surface bg-raised text-[10px] font-bold text-muted shadow-sm">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Estado y Precio (Lado derecho en desktop) */}
                  <div className="flex items-center justify-between gap-8 sm:w-64 sm:justify-end">
                    <span className={`hidden rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:block ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted/50">Total</span>
                      <span className="text-xl font-black text-heading">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-raised text-muted transition-colors hover:bg-primary/10 hover:text-primary">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mensaje de Ayuda */}
        <footer className="mt-12 rounded-xl bg-raised border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted">
            ¿Tienes problemas con algún pedido? <button className="font-bold text-primary hover:underline">Contactar soporte</button>
          </p>
        </footer>

      </div>
    </main>
  )
}
