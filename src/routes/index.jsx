import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from '@/components/systems'
import { MetaAuthGuard as RouteWithGuard } from './meta-auth-guard'

// Static page
import App from '../App.jsx'
import HomePage from '@/pages/home'
import SignInPage from '@/pages/auth/sign-in'
import ViewTemplatePage from '@/pages/template/view'

// Dashboard page
import DashboardPage from '@/pages/dashboard'

// Resume page
import EditResumePage from '@/pages/resume/[resumeId]/edit'
import ViewResumePage from '@/pages/resume/[resumeId]/view'
import TemplatePage from '@/pages/resume/[resumeId]/template'
import SettingsPage from '@/pages/resume/[resumeId]/settings'
import ResumeEditorLayout from '@/pages/resume/resume-editor-layout'

function mappedRoutes(routes) {
    return routes.map(({ children, element, meta, ...rest }) => ({
        ...rest,
        element: <RouteWithGuard element={element} meta={meta} />,
        ...(children && { children: mappedRoutes(children) }),
    }))
}

const routesConfig = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/template',
        element: <ViewTemplatePage />,
    },
    {
        path: '/my-resume/:resumeId/view',
        element: <ViewResumePage />,
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
        meta: { auth: true },
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
        ],
    },
    {
        path: '/edit-resume',
        meta: { auth: true },
        element: <ResumeEditorLayout />,
        children: [
            {
                index: true,
                element: <EditResumePage />,
            },
            {
                path: '/edit-resume/:resumeId/edit',
                element: <EditResumePage />,
            },
            {
                path: '/edit-resume/template',
                element: <TemplatePage />,
            },
            {
                path: '/edit-resume/settings',
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]

const router = createBrowserRouter(mappedRoutes(routesConfig))

export default router
