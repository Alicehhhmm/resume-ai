import { Outlet } from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { ResumeEditProvider } from '@/context/resume-info-context'
import ResumePreviewPanel from '@/pages/resume/components/ResumePreviewPanel'

import EditorLayout from '@/pages/editor/editor-layout'
import { EditorPanelLeft, EditorPanelRight, EditorDrawingBoard } from '@/pages/editor/components'

import dummy from '@/data/dummy'
import { GetResumeById } from '@/api/apis/resume'
import { useResumeEdit, useGlobalResume } from '@/hooks'

function ResumeEditorLayout() {
    // hooks

    const { resumeId } = useParams()
    let location = useLocation()
    const { pathname } = location

    const { selectTemplate, setSelectTemplate } = useGlobalResume()

    // States

    const [resumeInfo, setResumeInfo] = useState()

    // Method

    const GetResumeInfo = async resumeId => {
        const res = await GetResumeById(resumeId)
        if (res?.data) {
            setResumeInfo({ ...res.data })
        }
    }

    useEffect(() => {
        if (resumeId) {
            GetResumeInfo(resumeId)
        } else {
            setResumeInfo(dummy)
        }
    }, [])

    return (
        <ResumeEditProvider value={{ resumeInfo, setResumeInfo }}>
            <div data-label='resume-editor-layout-warpper' className='relative min-h-dvh'>
                <EditorLayout>
                    <EditorPanelLeft>
                        <Outlet />
                    </EditorPanelLeft>
                    <EditorDrawingBoard>
                        <p>ResumePreviewPanel</p>
                        {/* <ResumePreviewPanel /> */}
                    </EditorDrawingBoard>
                    <EditorPanelRight>
                        <p>ResumePreviewPanel info</p>
                    </EditorPanelRight>
                </EditorLayout>
            </div>
        </ResumeEditProvider>
    )
}

export default ResumeEditorLayout
