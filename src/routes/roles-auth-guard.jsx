import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * Routes Guard
 */
export const RolesAuthGuard = ({ children, roles }) => {
    const { isSignedIn, userRole } = useUser()
    const location = useLocation()

    if (!isSignedIn) {
        return <Navigate to='/auth/sign-in' state={{ from: location }} replace />
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to='/403' replace />
    }

    return children
}
