import React from 'react'

import { SimpleResume } from '@/pages/template'
import { DefaultResume } from '@/pages/template/standard'
import { useResumeEdit } from '@/hooks/client'
import { ResumeSkeleton } from '@/pages/template'

import { useGlobalResume } from '@/hooks/'

function ResumePreviewPanel() {
    const { resumeInfo } = useResumeEdit()
    const { selectTemplate } = useGlobalResume()

    if (!resumeInfo) {
        return <ResumeSkeleton />
    }

    switch (selectTemplate?.category) {
        case 'simple':
            return <SimpleResume resumeInfo={resumeInfo} />
        default:
            return <DefaultResume resumeInfo={resumeInfo} />
    }
}

export default ResumePreviewPanel
