import { Outlet } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import EditorLayout from '@/pages/editor/editor-layout'
import { EditorPanelLeft, EditorPanelRight, EditorDrawingBoard, EditorPropertiesPanel } from '@/pages/editor/components'

import { ResumeEditProvider } from '@/pages/resume/resume-editor-context'
import ResumePreviewPanel from '@/pages/resume/components/ResumePreviewPanel'
import ResumePropertiesPanel from '@/pages/resume/components/ResumePropertiesPanel'

import { useGetResumeById } from '@/services/resume'
import { useArtboardStore, useResumeStore, sectionsToModulesUi, useSectionManage } from '@/hooks'

function ResumeEditorLayout() {
    // hooks

    const { resumeId } = useParams()

    // States

    const setResume = useArtboardStore(state => state.setResume)
    const setSectionModules = useSectionManage(state => state.setModules)

    // Method

    const { error, isSuccess, loading, resume } = useGetResumeById(resumeId)

    const modulesUi = useMemo(() => {
        if (isSuccess && resume?.data?.sections) return sectionsToModulesUi(resume.data.sections)
        return sectionsToModulesUi({})
    }, [isSuccess, resume])

    useEffect(() => {
        if (isSuccess && resume) {
            useResumeStore.setState({ resume })
            setResume({ resume })
        }

        setSectionModules(modulesUi)
    }, [resumeId, loading, isSuccess, resume, modulesUi])

    return (
        <ResumeEditProvider value={{ loading: loading }}>
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
