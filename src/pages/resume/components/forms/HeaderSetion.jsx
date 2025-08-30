'use client'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ViewIcon } from 'lucide-react'

import { toast } from 'sonner'
import { EditableTitle, ToolButton } from '@/components/common'

import { useResumeEdit, useTransformLang } from '@/hooks'
import { UpdateResumeDetail } from '@/api/apis/resume'
import { ModuleManageActions } from '../module-manage'

function HeaderSetion() {
    // hooks

    const { resumeId } = useParams()

    const { t } = useTransformLang()
    const { resumeInfo, setResumeInfo } = useResumeEdit()

    // States

    const [loading, setLoading] = useState(false)
    const [renameTitle, setRenameTitle] = useState('')

    // Method

    useEffect(() => {
        if (resumeInfo?.title) {
            setRenameTitle(resumeInfo.title)
        }
    }, [resumeInfo?.title])

    const onChangTitle = val => {
        setRenameTitle(val)
    }

    const onSubmit = async () => {
        setLoading(true)

        try {
            const updateData = {
                title: renameTitle,
            }

            const res = await UpdateResumeDetail(resumeId, updateData)
            if (res) toast.success('Saved successfully')
        } catch (error) {
            toast.error(error?.message || 'Save error')
            console.error('Submit error', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // 延迟同步到全局，减少频率
        const timer = setTimeout(() => {
            setResumeInfo(prev => ({ ...prev, title: renameTitle }))
        }, 300)
        return () => clearTimeout(timer)
    }, [renameTitle, setResumeInfo])

    return (
        <div className='flex justify-between items-center h-14 px-4 sticky top-0 z-10 border-b bg-background'>
            <div className='flex flex-row gap-x-4 '>
                <EditableTitle
                    name='resumeTitle'
                    value={renameTitle}
                    onChange={onChangTitle}
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
