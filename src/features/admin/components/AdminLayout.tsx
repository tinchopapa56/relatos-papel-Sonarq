import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: '🏠' },
    { label: 'Inventario', path: '/admin/inventory', icon: '📚' },
    { label: 'Usuarios', path: '/admin/users', icon: '👥' },
    { label: 'Pedidos', path: '/admin/orders', icon: '📦' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface text-text flex">

      <aside className="w-64 border-r border-border bg-raised/50 backdrop-blur-xl flex flex-col sticky top-16 h-[calc(100vh-64px)]">
        <div className="p-6">
          <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">
            Menú de Administración
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                    : 'hover:bg-primary-subtle text-muted hover:text-primary'
                }`}
              >
                <span className={`text-lg transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'grayscale-0' : 'grayscale'}`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-border">
          <div className="bg-surface rounded-xl p-3 flex items-center gap-3 mb-4 border border-border shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-xs font-bold shadow-md">
              {user?.name?.[0]}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-text truncate">{user?.name}</p>
              <p className="text-[9px] text-muted truncate uppercase tracking-tighter">Admin Access</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors text-sm font-medium border border-error/10"
          >
            <span>🚪</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>


      <main className="flex-1 p-8 lg:p-10 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
