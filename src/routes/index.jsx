import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import SignInPage from '@/pages/auth/sign-in'
import HomePage from '@/pages/home'
import DashboardPage from '@/pages/dashboard'
import { NotFound } from '@/components/systems'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/auth/signin',
        element: <SignInPage />,
    },
    {
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router
