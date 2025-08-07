'use client'

import qs from 'query-string'
import { useNavigate } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'
import ViewTemplateCard from './view-template-card'

import { templateMap } from '@/pages/template/view'
import { useGlobalResume } from '@/hooks'

const getResumeTemplates = (templates = []) => {
    if (templates?.length === 0) return []

    return Object.entries(templates).map(([key, item]) => ({
        id: key,
        ...item,
    }))
}

function ViewTemplatePage() {
    // hooks

    const navigation = useNavigate()
    const { selectTemplate, setSelectTemplate } = useGlobalResume()

    // method

    const templateList = getResumeTemplates(templateMap)

    const onHandleView = item => {
        setSelectTemplate({
            ...item,
        })

        const url = qs.stringifyUrl({
            url: `/my-resume/${item.resumeId}/view`,
            query: {
                flag: 'readonly',
            },
        })

        navigation(url)
    }

    const onHandleEdit = item => {
        setSelectTemplate({
            category: item.category,
        })

        console.log('item:', item)
        console.log('selectTemplate:', selectTemplate)

        // todo： create user resume

        // Use the existing resume ID
        if (selectTemplate?.documentId) {
            navigation(`/edit-resume/${selectTemplate?.documentId}/edit`)
        }
    }

    return (
        <div data-label='view-template-page' className='relative min-h-dvh bg-background flex flex-col'>
            <main className='flex-1'>
                <div className='mx-auto max-w-7xl px-4 py-10 sm:px-10 lg:px-16'>
                    <div className='space-y-2'>
                        <h2 className='text-3xl font-semibold tracking-tight text-foreground'>Resume Template</h2>
                        <p className='text-muted-foreground leading-relaxed'>
                            Choose a template you like. Start creating your AI-powered resume for your next job role
                        </p>
                    </div>

                    <Separator className='my-6' />

                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {templateList.map(temp => (
                            <ViewTemplateCard key={temp.id} {...temp} onHandleView={onHandleView} onHandleEdit={onHandleEdit} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ViewTemplatePage
