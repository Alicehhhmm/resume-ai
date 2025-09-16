import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from '@/components/systems'
import { MetaAuthGuard as RouteWithGuard } from './meta-auth-guard'

// Static page
import { WithDefaultLayout } from '@/pages/layout'
import HomePage from '@/pages/home'
import SignInPage from '@/pages/auth/sign-in'
import ViewTemplatePage from '@/pages/template/view/page'

// Dashboard page
import DashboardLayout from '@/pages/dashboard/layout'
import DashboardPage from '@/pages/dashboard/resumes/page'
import SettingsPage from '@/pages/dashboard/settings/page'

// Resume page
import EditResumePage from '@/pages/resume/[resumeId]/edit'
import ViewResumePage from '@/pages/resume/[resumeId]/view'
import TemplatePage from '@/pages/resume/[resumeId]/template'
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
        path: '/auth/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/auth/sign-up',
        element: <SignInPage />,
    },
    {
        path: '/',
        element: <WithDefaultLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/template',
                element: <ViewTemplatePage />,
            },
            {
                path: '/my-resume',
                element: <DashboardPage />,
                meta: { auth: true },
            },
            {
                path: '/my-resume/:resumeId/view',
                element: <ViewResumePage />,
            },
        ],
    },
    {
        path: '/dashboard',
        meta: { auth: true },
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: '/dashboard/settings',
                element: <SettingsPage />,
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
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]

const router = createBrowserRouter(mappedRoutes(routesConfig))

export default router
