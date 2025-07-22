import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { NavHeader } from '@/components/navigation'

function App() {
    const { isLoaded, isSignedIn } = useUser()

    if (!isSignedIn && isLoaded) {
        return <Navigate to='/auth/sign-in' />
    }

    return (
        <div className='relative min-h-dvh'>
            <NavHeader />

            <main className='pt-[var(--nav-header-height)]'>
                <Outlet />
            </main>
        </div>
    )
}

export default App
