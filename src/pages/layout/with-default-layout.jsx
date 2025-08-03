import { Outlet } from 'react-router-dom'
import { NavHeader } from '@/components/navigation'

function WithDefaultLayout() {
    return (
        <div date-label='default-layout' className='relative min-h-dvh'>
            <NavHeader />

            <main className='pt-[var(--nav-header-height)]'>
                <Outlet />
            </main>
        </div>
    )
}

export default WithDefaultLayout
