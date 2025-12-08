import EditPanelSkeleton from '@/pages/resume/components/edit-panel-skeleton'
import ReusmeEditPanel from '@/pages/resume/components/ReusmeEditPanel'

import { useResumeEdit } from '@/pages/resume/resume-editor-context'

function EditResumePage() {
    // hooks
    const { loading } = useResumeEdit()

    // States

    if (loading) {
        return <EditPanelSkeleton />
    }

    return <ReusmeEditPanel />
}

export default EditResumePage
