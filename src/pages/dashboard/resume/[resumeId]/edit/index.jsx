import React, { useEffect, useState } from 'react'

import { SlantLineBackground } from '@/components/common'

import ResumeEditProvider from '@/pages/dashboard/resume/provider/resume-edit-provider'
import ReusmeEditPanel from '@/pages/dashboard/resume/components/ReusmeEditPanel'
import ResumePreviewPanel from '@/pages/dashboard/resume/components/ResumePreviewPanel'

import dummy from '@/data/dummy'

function EditResumePage() {
    const [resumeInfo, setResumeInfo] = useState()
    const [selectTemplate, setSelectTemplate] = useState()

    useEffect(() => {
        setResumeInfo(dummy)
        setSelectTemplate('default')
    }, [])

    return (
        <ResumeEditProvider value={{ resumeInfo, setResumeInfo, selectTemplate, setSelectTemplate }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10 relative'>
                <SlantLineBackground className='absolute z-[0]' />

                <ReusmeEditPanel />
                <ResumePreviewPanel />
            </div>
        </ResumeEditProvider>
    )
}

export default EditResumePage
