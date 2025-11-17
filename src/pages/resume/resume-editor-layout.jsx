import { Outlet } from 'react-router-dom'
import { useEffect, useCallback, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import EditorLayout from '@/pages/editor/editor-layout'
import { EditorPanelLeft, EditorPanelRight, EditorDrawingBoard, EditorPropertiesPanel } from '@/pages/editor/components'

import { ResumeEditProvider } from '@/context/resume-info-context'
import ResumePreviewPanel from '@/pages/resume/components/ResumePreviewPanel'
import ResumePropertiesPanel from '@/pages/resume/components/ResumePropertiesPanel'

import { userResumeData } from '@/data'
import { GetResumeById } from '@/services/resume'
import { useResumeEdit, useGlobalResume, useResumeStore } from '@/hooks'

function ResumeEditorLayout() {
    // hooks

    const { resumeId } = useParams()
    let location = useLocation()
    const { pathname } = location

    // States

    const [resumeInfo, setResumeInfo] = useState()

    // Method

    const fetchResumeInfo = useCallback(async resumeId => {
        try {
            const res = await GetResumeById(resumeId)
            if (!res || !res?.data) throw new Error(`Not found data for ID:${resumeId}`)

            useResumeStore.setState({ resume: res.data })
            setResumeInfo({ ...res.data })
        } catch (error) {
            console.log('[service] fetchResumeInfo API error', error)
        }
    }, [])

    useEffect(() => {
        if (resumeId) {
            fetchResumeInfo(resumeId)
        } else {
            useResumeStore.setState({
                resume: userResumeData,
            })
        }
    }, [resumeId])

    return (
        <ResumeEditProvider value={{ resumeInfo, setResumeInfo }}>
            <div data-label='resume-editor-layout-warpper' className='relative min-h-dvh'>
                <EditorLayout navKey='resume'>
                    <EditorPanelLeft>
                        <Outlet />
                    </EditorPanelLeft>
                    <EditorDrawingBoard>
                        <ResumePreviewPanel />
                    </EditorDrawingBoard>
                    <EditorPanelRight>
                        <EditorPropertiesPanel />
                        <ResumePropertiesPanel />
                        <div className='pb-12' />
                    </EditorPanelRight>
                </EditorLayout>
            </div>
        </ResumeEditProvider>
    )
}

export default ResumeEditorLayout
