'use client'

import { Separator } from '@/components/ui/separator'

import CeatedResume from './layout/gird/created-resume'
import ResumeGrid from './layout/gird'
import ReusmeCreateDialog from './dialog/created'
import ResumeDeleteDialog from './dialog/delete'
import { useTransformLang } from '@/hooks/client'

export default function DashboardPage() {
    const { t } = useTransformLang()

    return (
        <div className='py-10 px-4 md:px-10 lg:px-16'>
            <div className='space-y-2'>
                <h2 className='text-3xl font-semibold tracking-tight text-foreground'>{t('myResume')}</h2>
                <p className='text-muted-foreground leading-relaxed'>
                    {t('Start creating your AI-powered resume for your next job role.')}
                </p>
            </div>

            <Separator className='my-6' />

            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                <CeatedResume />
                <ResumeGrid />
            </div>

            {/* dialogs  */}
            <ReusmeCreateDialog />
            <ResumeDeleteDialog />
        </div>
    )
}
