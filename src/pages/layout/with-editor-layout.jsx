import { Outlet } from 'react-router-dom'
import EditorLayout from '@/pages/editor/editor-layout'

function WithEditorLayout({ navKey }) {
    return (
        <EditorLayout className='relative min-h-dvh' navKey={navKey}>
            <Outlet />
        </EditorLayout>
    )
}

export default WithEditorLayout
