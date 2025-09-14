'use client'

import { memo, useEffect, useState, useTransition } from 'react'
import { GetUserResumes } from '@/services/resume'
import { useUser } from '@clerk/clerk-react'

import ResumeCardItem from './ResumeCardItem'
import ResumeSkeleton from './ResumeSkeleton'

import { useGlobalResume } from '@/hooks'

function ResumeList() {
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

    if (isLoading || isPending) {
        return <ResumeSkeleton num={3} />
    }

    return (
        <>
            {resumeList?.length ? (
                resumeList.map(resume => (
                    <ResumeCardItem
                        key={resume.resumeId}
                        resume={resume}
                        path={`/edit-resume/${resume.documentId}/edit`}
                        onHandle={onHandle}
                    />
                ))
            ) : (
                <div className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
                    <p className='text-sm'>No resumes found.</p>
                </div>
            )}
        </>
    )
}

export default memo(ResumeList)
