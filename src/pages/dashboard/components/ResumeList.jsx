'use client'

import { memo, useEffect, useState, useTransition } from 'react'
import { GetUserResumes } from '@/api/apis/resume'
import { useUser } from '@clerk/clerk-react'

import ResumeCardItem from './ReusmeCardItem'
import ResumeSkeleton from './ResumeSkeleton'

function ResumeList() {
    const { user } = useUser()

    const [resumeList, setResumeList] = useState([])
    const [isPending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)

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

    if (isLoading || isPending) {
        return <ResumeSkeleton num={3} />
    }

    return (
        <>
            {resumeList.length ? (
                resumeList.map(resume => (
                    <ResumeCardItem key={resume.resumeId} resume={resume} path={`/dashboard/resume/${resume.resumeId}/edit`} />
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
