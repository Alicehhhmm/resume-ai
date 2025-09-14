import { RouterProvider } from 'react-router-dom'

import router from '@/routes'
import { Toaster } from '@/components/ui/sonner'
import { JWTClerkProvider, ThemeProvider, TanstackQueryClientProvider } from '@/components/provider'

function App() {
    return (
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <TanstackQueryClientProvider>
                <JWTClerkProvider>
                    <Toaster position='top-center' />
                    <RouterProvider router={router} />
                </JWTClerkProvider>
            </TanstackQueryClientProvider>
        </ThemeProvider>
    )
}

export default App
