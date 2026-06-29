import { useState } from 'react'

interface Order {
  id: string
  customer: string
  email: string
  books: string[]
  address: string
  date: string
  status: 'pendiente' | 'enviado' | 'entregado'
  total: number
}

const mockOrders: Order[] = [
  {
    id: 'ORD-7721',
    customer: 'Martin Ruiz',
    email: 'test@relatos.com',
    books: ['El Principito (Vol. 1)', '1984 (Vol. 42)'],
    address: 'Av. Siempre Viva 742, Springfield',
    date: '05 May 2024, 14:30',
    status: 'pendiente',
    total: 45.98
  },
  {
    id: 'ORD-7722',
    customer: 'Laura Gomez',
    email: 'laura@email.com',
    books: ['Rayuela (Vol. 12)'],
    address: 'Calle Falsa 123, Ciudad de México',
    date: '04 May 2024, 09:15',
    status: 'enviado',
    total: 22.50
  },
  {
    id: 'ORD-7723',
    customer: 'Carlos Slim',
    email: 'carlos@mail.com',
    books: ['Cien años de soledad (Vol. 5)', 'Don Quijote (Vol. 8)'],
    address: 'Paseo de la Reforma 456, CDMX',
    date: '03 May 2024, 18:20',
    status: 'entregado',
    total: 65.00
  },
  {
    id: 'ORD-7724',
    customer: 'Ana Martinez',
    email: 'ana.m@relatos.com',
    books: ['El Principito (Vol. 88)'],
    address: 'Jr. Los Claveles 123, Lima',
    date: '02 May 2024, 11:45',
    status: 'pendiente',
    total: 15.99
  }
]

export default function OrdersPage() {
  const [filter, setFilter] = useState<'all' | 'pendiente' | 'enviado' | 'entregado'>('all')

  const filteredOrders = mockOrders.filter(order => 
    filter === 'all' ? true : order.status === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'enviado': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'entregado': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
      default: return 'bg-muted/10 text-muted border-muted/20'
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold text-text mb-2">Gestión de Pedidos</h1>
        <p className="text-muted">Seguimiento de envíos y estado de compras físicas.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        {['all', 'pendiente', 'enviado', 'entregado'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              filter === f 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-surface text-muted border-border hover:border-primary/30'
            }`}
          >
            {f === 'all' ? 'Todos' : f}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-raised/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Orden</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Libros</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Dirección de Envío</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-center">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-raised/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-text">{order.id}</p>
                      <p className="text-[10px] text-muted font-mono">{order.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-text">{order.customer}</p>
                      <p className="text-[10px] text-muted">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {order.books.map((book, i) => (
                        <p key={i} className="text-xs text-text flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary/40" />
                          {book}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[200px]">
                      <p className="text-xs text-muted leading-relaxed">
                        📍 {order.address}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {order.status === 'pendiente' && (
                        <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                          Marcar Enviado
                        </button>
                      )}
                      <button className="p-2 hover:bg-raised text-muted rounded-lg transition-colors" title="Ver Detalles">
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
