import { useUser } from '@clerk/clerk-react'

/**
 * useSystemAuth
 * 轴离 Clerk 权限认证
 * 便于后续替换认证服务的需求
 */
export const useSystemAuth = () => {
    const { isSignedIn, isLoaded, user, signOut } = useUser()

    const useInfo = {
        userId: user?.id || null,
        email: user?.primaryEmailAddress?.emailAddress || null,
        fullName: user?.fullName || null,
        avatarUrl: user?.imageUrl || null,
        userRole: user?.publicMetadata?.role || user?.organizationMemberships[0]?.role || 'guest',
    }

    return {
        isSignedIn,
        isLoaded,
        signOut,
        user,
        useInfo,
    }
}
