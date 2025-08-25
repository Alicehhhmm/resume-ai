import EditPanelSkeleton from '@/pages/resume/components/edit-panel-skeleton'
import ReusmeEditPanel from '@/pages/resume/components/ReusmeEditPanel'

import { useResumeEdit } from '@/hooks'

function EditResumePage() {
    // hooks
    const { resumeInfo } = useResumeEdit()

    // States

    if (!resumeInfo) {
        return <EditPanelSkeleton />
    }

    return <ReusmeEditPanel />
}

export default EditResumePage
