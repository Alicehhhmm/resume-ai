'use client'

import { useResumeInfo } from '@/context/resume-info-context'

export const useResumeEdit = () => {
    const context = useResumeInfo()

    return {
        resumeInfo: context.resumeInfo,
        setResumeInfo: context.setResumeInfo,
        ...context,
        // Add more properties or methods as needed
    }
}
