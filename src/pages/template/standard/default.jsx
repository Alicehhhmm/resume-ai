import React from 'react'

import { cn } from '@/lib/utils'

import PersonalDetailPreview from './PersonalDetailPreview'
import SummeryPreview from './SummeryPreview'
import ExperiencePreview from './ExperiencePreview'
import EducationalPreview from './EducationalPreview'
import SkillsPreview from './SkillsPreview'

function DefaultResume({ resumeInfo, className }) {
    return (
        <div
            className={cn('h-full z-10 rounded-md border-t-[20px] p-12 shadow-xl bg-background text-foreground', className)}
            style={{
                borderColor: resumeInfo?.themeColor,
            }}
        >
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

export default DefaultResume
