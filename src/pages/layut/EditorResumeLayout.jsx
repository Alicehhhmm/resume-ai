import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function EditorResumeLayout() {
    const { isLoaded, isSignedIn } = useUser()

    if (!isSignedIn && isLoaded) {
        return <Navigate to='/auth/sign-in' />
    }

    return (
        <div className='editor-layout-warpper relative min-h-dvh'>
            <Outlet />
        </div>
    )
}

export default EditorResumeLayout
