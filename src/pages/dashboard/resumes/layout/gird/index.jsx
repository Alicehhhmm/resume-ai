'use client'

import { memo } from 'react'

import CreatedResume from './created-resume'
import ResumeCardItem from './items-card'
import ResumeSkeleton from './items-skeleton'
import ResumeCardActions from '../../dialog/actions'

import { useGlobalResume, useTransformLang, useSystemAuth } from '@/hooks'
import { useGetUserResumes } from '@/services/resume'

function GridView() {
    // hooks

    const { t } = useTransformLang()
    const { user } = useSystemAuth()
    const { setSelectTemplate } = useGlobalResume()

    // method

    const { resumes, loading } = useGetUserResumes(user?.primaryEmailAddress?.emailAddress)

    const onHandle = item => {
        setSelectTemplate({ ...item })
    }

    if (loading) {
        return (
            <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <CreatedResume />
                <ResumeSkeleton num={3} />
            </div>
        )
    }

    return (
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <CreatedResume />

            {resumes?.length ? (
                resumes.map(resume => (
                    <ResumeCardItem
                        key={resume.resumeId}
                        resume={resume}
                        path={`/edit-resume/${resume.documentId}/edit`}
                        onHandle={onHandle}
                        actions={<ResumeCardActions resume={resume} />}
                    />
                ))
            ) : (
                <div className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
                    <p className='text-sm'>{t('noResumesFound')}</p>
                </div>
            )}
        </div>
    )
}

export default memo(GridView)
