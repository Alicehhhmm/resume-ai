'use client'

import { memo, useEffect, useState, useTransition } from 'react'
import { useUser } from '@clerk/clerk-react'

import CeatedResume from './created-resume'
import ResumeCardItem from './items-card'
import ResumeSkeleton from './items-skeleton'
import ResumeCardActions from '../../dialog/actions'

import { useGlobalResume } from '@/hooks'
import { GetUserResumes } from '@/services/resume'

function GridView() {
    // hooks
    const { user } = useUser()
    const { setSelectTemplate } = useGlobalResume()

    // states

    const [isLoading, setIsLoading] = useState(false)
    const [resumeList, setResumeList] = useState([])
    const [isPending, startTransition] = useTransition()

    // method

    const GetUserResumeList = () => {
        if (!user) return

        setIsLoading(true)
        startTransition(async () => {
            try {
                const res = await GetUserResumes(user.primaryEmailAddress?.emailAddress)
                setResumeList(res.data)
            } catch (err) {
                console.error('Failed to load resumes:', err)
            } finally {
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        GetUserResumeList()
    }, [user])

    const onHandle = item => {
        setSelectTemplate({
            ...item,
        })
    }

    return (
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <CeatedResume />

            {resumeList?.length ? (
                resumeList.map(resume => (
                    <ResumeCardItem
                        key={resume.resumeId}
                        resume={resume}
                        path={`/edit-resume/${resume.documentId}/edit`}
                        onHandle={onHandle}
                        actions={<ResumeCardActions resume={resume} />}
                    />
                ))
            ) : (
                <>
                    {isLoading && <ResumeSkeleton num={3} />}
                    {!isLoading && (
                        <div className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
                            <p className='text-sm'>No resumes found.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default memo(GridView)
