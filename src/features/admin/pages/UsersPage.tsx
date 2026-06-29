import { users } from '@/features/auth/users'

export default function UsersPage() {
  const totalAdmins = users.filter(u => u.role === 'admin').length
  const totalReaders = users.filter(u => u.role === 'reader').length

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold text-text mb-2">Gestión de Usuarios</h1>
        <p className="text-muted">Administra los accesos y roles de los usuarios de la plataforma.</p>
      </header>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Total Usuarios</p>
            <h3 className="text-3xl font-bold text-text">{users.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
            👥
          </div>
        </div>
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Administradores</p>
            <h3 className="text-3xl font-bold text-text">{totalAdmins}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 text-2xl">
            🛡️
          </div>
        </div>
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Lectores</p>
            <h3 className="text-3xl font-bold text-text">{totalReaders}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-2xl">
            📖
          </div>
        </div>
      </div>


      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-raised/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Rol</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Miembro desde</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-raised/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold border border-primary/10">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text">{user.name}</p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
                        : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                    }`}>
                      {user.role === 'admin' ? '🛡️ Admin' : '📖 Lector'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted italic">
                    {user.memberSince}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors" title="Editar Rol">
                        🔄
                      </button>
                      <button className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors" title="Banear">
                        🚫
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
