import { RouterProvider } from 'react-router-dom'

import router from '@/routes'
import { Toaster } from '@/components/ui/sonner'
import { JWTClerkProvider, ThemeProvider } from '@/components/provider'

function App() {
    return (
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <JWTClerkProvider>
                <Toaster />
                <RouterProvider router={router} />
            </JWTClerkProvider>
        </ThemeProvider>
    )
}

export default App
