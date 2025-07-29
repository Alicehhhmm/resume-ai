import React from 'react'

import { SimpleResume } from '@/pages/template'
import { DefaultResume } from '@/pages/template/standard'
import { useResumeEdit } from '@/hooks/client'
import { ResumeSkeleton } from '@/pages/template'

function ResumePreviewPanel() {
    const { resumeInfo, selectTemplate } = useResumeEdit()

    if (!resumeInfo) {
        return <ResumeSkeleton />
    }

    switch (selectTemplate) {
        case 'simple':
            return <SimpleResume resumeInfo={resumeInfo} />
        default:
            return <DefaultResume resumeInfo={resumeInfo} />
    }
}

export default ResumePreviewPanel
