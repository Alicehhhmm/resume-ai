import { Outlet } from 'react-router-dom'
import { NavHeader } from '@/components/navigation'
import EditorLayout from '@/pages/editor/editor-layout'

function WithDashboardLayout() {
    return (
        <EditorLayout date-label='dashboard-layout' className='relative min-h-dvh'>
            <Outlet />
        </EditorLayout>
    )
}

export default WithDashboardLayout
