import { useAuth } from '@/features/auth'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    { label: 'Libros Totales', value: '124', change: '+12%', color: 'from-blue-500 to-cyan-400' },
    { label: 'Usuarios Activos', value: '1,240', change: '+5%', color: 'from-purple-500 to-pink-400' },
    { label: 'Ventas (Mes)', value: '$12,450', change: '+18%', color: 'from-orange-500 to-yellow-400' },
    { label: 'Nuevos Pedidos', value: '45', change: '+2', color: 'from-emerald-500 to-teal-400' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold text-text mb-2">Panel de Control</h1>
        <p className="text-muted">Bienvenido de nuevo, {user?.name}. Aquí tienes un resumen de hoy.</p>
      </header>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="relative group overflow-hidden rounded-2xl p-6 bg-surface border border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
            <p className="text-xs font-bold text-muted mb-1 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-text">{stat.value}</h3>
              <span className="text-xs font-semibold text-success mb-1">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">

        <div className="rounded-2xl bg-surface border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-raised/50 hover:bg-raised transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {String.fromCharCode(64 + item)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Nuevo pedido #ORD-{1000 + item}</p>
                    <p className="text-xs text-muted">Hace {item * 5} minutos</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-tight">
                  Procesando
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
