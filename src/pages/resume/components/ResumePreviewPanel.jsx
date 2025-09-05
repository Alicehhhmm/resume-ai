import { useResumeEdit } from '@/hooks/client'
import { ResumeSkeleton, getTemplate } from '@/pages/template'

import { useGlobalResume } from '@/hooks/'

function ResumePreviewPanel() {
    const { resumeInfo } = useResumeEdit()
    const { selectTemplate } = useGlobalResume()

    if (!resumeInfo) {
        return <ResumeSkeleton />
    }

    const TemplateCompoents = getTemplate(selectTemplate?.category)

    return <TemplateCompoents resumeInfo={resumeInfo} />
}

export default ResumePreviewPanel
