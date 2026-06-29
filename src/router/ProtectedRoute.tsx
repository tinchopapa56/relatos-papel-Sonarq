import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth'

interface ProtectedRouteProps {
  adminOnly?: boolean
}

export default function ProtectedRoute({ adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
