import { useParams } from 'react-router-dom'
import { ModuleManagePanel } from '@/pages/resume/components/module-manage'

function ResumePropertiesPanel() {
    // hooks
    const { resumeId } = useParams()

    return (
        <div data-label='resume_properties_panel' className=''>
            <ModuleManagePanel />
        </div>
    )
}

export default ResumePropertiesPanel
