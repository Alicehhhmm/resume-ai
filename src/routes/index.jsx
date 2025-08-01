import { createBrowserRouter } from 'react-router-dom'
import { Edit, HomeIcon, SettingsIcon, TerminalIcon } from 'lucide-react'

import App from '../App.jsx'
import { NotFound } from '@/components/systems'

import SignInPage from '@/pages/auth/sign-in'
import HomePage from '@/pages/home'
import ViewTemplatePage from '@/pages/template/view'

import DashboardPage from '@/pages/dashboard'
import EditResumePage from '@/pages/dashboard/resume/[resumeId]/edit'
import ViewResumePage from '@/pages/dashboard/resume/[resumeId]/view'
import ResumeEditorLayout from '@/pages/dashboard/resume/layout/resume-editor-layout'

const router = createBrowserRouter([
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
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
        ],
    },
    {
        element: <ResumeEditorLayout />,
        children: [
            {
                path: '/edit-resume/:resumeId/edit',
                element: <EditResumePage />,
            },
            {
                path: '/edit-resume/template',
                element: <EditResumePage />,
            },
            {
                path: '/edit-resume/settings',
                element: <EditResumePage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router
