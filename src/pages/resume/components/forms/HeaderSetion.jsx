'use client'

import { Link } from 'react-router-dom'
import { ViewIcon } from 'lucide-react'

import { EditableTitle, ToolButton } from '@/components/common'

import { useTransformLang, useResumeStore } from '@/hooks'
import { useUpdateResume } from '@/services/resume'
import { ModuleManageActions } from '../module-manage'

function HeaderSetion() {
    // hooks

    const { t } = useTransformLang()
    const { updateResume, loading } = useUpdateResume()

    // States

    const resumeId = useResumeStore(state => state.resume.documentId)
    const title = useResumeStore(state => state.resume.title ?? `untitled`)
    const setResume = useResumeStore(state => state.setResume)

    // Method

    const handleChange = value => {
        setResume('title', value)
    }

    const onSubmit = async value => {
        await updateResume({
            id: resumeId,
            data: {
                title: value,
            },
        })
    }

    return (
        <div className='flex justify-between items-center h-14 px-4 sticky top-0 z-10 border-b bg-background'>
            <div className='flex flex-row gap-x-4 '>
                <EditableTitle
                    name='title'
                    value={title}
                    onChange={handleChange}
                    onSave={onSubmit}
                    disabled={loading}
                    placeholder='请输入简历标题'
                />
            </div>

            <div className='flex flex-row items-center gap-x-1'>
                <Link to={'/my-resume/' + resumeId + '/view'}>
                    <ToolButton tooltip={t('preview')}>
                        <ViewIcon className='panel-icon' />
                    </ToolButton>
                </Link>
                <ModuleManageActions />
            </div>
        </div>
    )
}

export default HeaderSetion
