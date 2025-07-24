import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import router from './routes'
import { Toaster } from '@/components/ui/sonner'
import { JWTClerkProvider } from '@/components/provider'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <JWTClerkProvider>
            <Toaster />
            <RouterProvider router={router} />
        </JWTClerkProvider>
    </StrictMode>
)
