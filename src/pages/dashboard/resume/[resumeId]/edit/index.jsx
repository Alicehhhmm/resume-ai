import React, { useState } from 'react'

import ResumeEditProvider from '@/pages/dashboard/resume/provider/resume-edit-provider'
import ReusmeEditPanel from '@/pages/dashboard/resume/components/ReusmeEditPanel'
import ResumePreviewPanel from '@/pages/dashboard/resume/components/ResumePreviewPanel'

function EditResumePage() {
    const [resumeInfo, setResumeInfo] = useState({
        // 添加初始状态
        basicInfo: {},
        sections: [],
    })

    return (
        <ResumeEditProvider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <ReusmeEditPanel />
                <ResumePreviewPanel />
            </div>
        </ResumeEditProvider>
    )
}

export default EditResumePage
