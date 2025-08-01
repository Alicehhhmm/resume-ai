import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function ResumeEditorLayout() {
    const { isLoaded, isSignedIn } = useUser()

    if (!isSignedIn && isLoaded) {
        return <Navigate to='/auth/sign-in' />
    }

    return (
        <div data-label='resume-editor-layout-warpper' className='relative min-h-dvh'>
            <Outlet />
        </div>
    )
}

export default ResumeEditorLayout
