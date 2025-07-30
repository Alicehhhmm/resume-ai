'use client'

import { Separator } from '@/components/ui/separator'
import { NavHeader } from '@/components/navigation'
import { SimpleResume, DefaultResume } from '@/pages/template'

import ViewTemplateCard from './view-template-card'

const templateMap = {
    default: {
        name: 'Default Template',
        component: DefaultResume,
        category: 'General',
        thumbnailDesc: 'Classic layout with complete information presentation',
    },
    simple: {
        name: 'Simple Style',
        component: SimpleResume,
        category: 'General',
        thumbnailDesc: 'Minimalist layout, highlighting core content',
    },
}

const getResumeTemplates = (templates = []) => {
    if (templates?.length === 0) return []

    return Object.entries(templates).map(([key, item]) => ({
        id: key,
        ...item,
    }))
}

function ViewTemplatePage() {
    const templateList = getResumeTemplates(templateMap)

    return (
        <section className='relative min-h-dvh bg-background flex flex-col'>
            <NavHeader />

            <main className='pt-[var(--nav-header-height)] flex-1'>
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
                            <ViewTemplateCard key={temp.id} {...temp} />
                        ))}
                    </div>
                </div>
            </main>
        </section>
    )
}

export default ViewTemplatePage
