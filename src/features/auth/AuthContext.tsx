import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { users, type User } from './users'

interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user_data')
    return saved ? JSON.parse(saved) : null
  })

  const isAuthenticated = !!user

  function login(email: string, password: string): boolean {
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      // No queremos guardar la password en el estado/storage
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword as User)
      localStorage.setItem('user_data', JSON.stringify(userWithoutPassword))
      return true
    }
    
    return false
  }

  function logout() {
    localStorage.removeItem('user_data')
    setUser(null)
  }

  return (
    <AuthContext value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
