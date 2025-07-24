import React from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'

import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

import { useResumeEdit } from '@/hooks/client'

function ResumePreviewPanel() {
    const { resumeInfo } = useResumeEdit()

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'>
            {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            {/* Summery  */}
            <SummeryPreview resumeInfo={resumeInfo} />

            {/* Professional Experience  */}
            <ExperiencePreview resumeInfo={resumeInfo} />

            {/* Educational  */}
            <EducationalPreview resumeInfo={resumeInfo} />

            {/* Skilss  */}
            <SkillsPreview resumeInfo={resumeInfo} />
        </div>
    )
}

export default ResumePreviewPanel
