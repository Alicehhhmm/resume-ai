import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import { NotFound } from '@/components/systems'

import SignInPage from '@/pages/auth/sign-in'
import HomePage from '@/pages/home'
import DashboardPage from '@/pages/dashboard'
import EditResumePage from '@/pages/dashboard/resume/[resumeId]/edit'
import ViewResumePage from '@/pages/dashboard/resume/[resumeId]/view/index.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/auth/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/auth/sign-up',
        element: <SignInPage />,
    },
    {
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/dashboard/resume/:resumeId/edit',
                element: <EditResumePage />,
            },
        ],
    },
    {
        path: '/my-resume/:resumeId/view',
        element: <ViewResume />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router
