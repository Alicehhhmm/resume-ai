import { Navigate, useLocation } from 'react-router-dom'
import { useSystemAuth } from '@/hooks/server'

/**
 * Routes Guard
 */
export const RolesAuthGuard = ({ children, roles }) => {
    const { isSignedIn, isLoaded, userRole } = useSystemAuth()
    const location = useLocation()

    if (!isSignedIn && isLoaded) {
        return <Navigate to='/auth/sign-in' state={{ from: location }} replace />
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to='/403' replace />
    }

    return children
}
