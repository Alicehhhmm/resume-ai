import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

function TanstackQueryClientProvider({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default TanstackQueryClientProvider
