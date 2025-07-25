import React from 'react'

import { SimpleResume } from '@/pages/template'
import { DefaultResume } from '@/pages/template/standard'
import { useResumeEdit } from '@/hooks/client'

function ResumePreviewPanel() {
    const { resumeInfo = {}, selectTemplate } = useResumeEdit()

    switch (selectTemplate) {
        case 'simple':
            return <SimpleResume resumeInfo={resumeInfo} />
        default:
            return <DefaultResume resumeInfo={resumeInfo} />
    }
}

export default ResumePreviewPanel
