import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import SignInPage from '@/pages/auth/sign-in'
import HomePage from '@/pages/home'
import DashboardPage from '@/pages/dashboard'

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
        ],
    },
    {
        path: '/auth/signin',
        element: <SignInPage />,
    },
])

export default router
