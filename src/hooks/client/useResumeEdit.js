'use client'

import { useResumeInfo } from '@/pages/dashboard/resume/context/resume-info-context'

export const useResumeEdit = () => {
    const context = useResumeInfo()

    return {
        resumeInfo: context.resumeInfo,
        setResumeInfo: context.setResumeInfo,
        // Add more properties or methods as needed
    }
}
