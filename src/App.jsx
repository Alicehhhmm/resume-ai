import { Outlet } from 'react-router-dom'
import { NavHeader } from '@/components/navigation'

function App() {
    return (
        <div className='relative min-h-dvh'>
            <NavHeader />

            <main className='pt-[var(--nav-header-height)]'>
                <Outlet />
            </main>
        </div>
    )
}

export default App
