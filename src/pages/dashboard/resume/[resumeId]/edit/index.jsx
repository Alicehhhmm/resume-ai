import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Outlet } from 'react-router-dom'

import { SlantLineBackground } from '@/components/common'

import ResumeEditProvider from '@/pages/dashboard/resume/provider/resume-edit-provider'
import ReusmeEditPanel from '@/pages/dashboard/resume/components/ReusmeEditPanel'
import ResumePreviewPanel from '@/pages/dashboard/resume/components/ResumePreviewPanel'

import EditorLayout from '@/pages/editor/editor-layout'
import { EditorPanelLeft, EditorPanelRight, EditorDrawingBoard } from '@/pages/editor/components'

import dummy from '@/data/dummy'
import { GetResumeById } from '@/api/apis/resume'

function EditResumePage() {
    // hooks

    const { resumeId } = useParams()
    let location = useLocation()
    const { pathname } = location

    // States

    const [resumeInfo, setResumeInfo] = useState()
    const [selectTemplate, setSelectTemplate] = useState()

    // Method

    const GetResumeInfo = async () => {
        const res = await GetResumeById(resumeId)
        if (res) {
            setResumeInfo({ ...res.data })
        } else {
            setResumeInfo(dummy)
        }
    }

    useEffect(() => {
        GetResumeInfo()
        setSelectTemplate('default')
    }, [])

    return (
        <ResumeEditProvider value={{ resumeInfo, setResumeInfo, selectTemplate, setSelectTemplate }}>
            <EditorLayout>
                <EditorPanelLeft>
                    {pathname}
                    {pathname === `/edit-resume/${resumeId}/edit` && <ReusmeEditPanel />}
                    {pathname === '/edit-resume/template' && <ReusmeEditPanel />}
                    {pathname === '/edit-resume/settings' && <p>ReusmeEditPanel</p>}
                </EditorPanelLeft>
                <EditorDrawingBoard>
                    <p>ResumePreviewPanel</p>
                    {/* <ResumePreviewPanel /> */}
                </EditorDrawingBoard>
                <EditorPanelRight>
                    <p>ResumePreviewPanel info</p>
                </EditorPanelRight>
            </EditorLayout>
        </ResumeEditProvider>
    )
}

export default EditResumePage
