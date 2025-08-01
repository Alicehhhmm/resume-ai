'use client'

import React, { useEffect, useState } from 'react'
import qs from 'query-string'
import { useParams, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

import { GetResumeById } from '@/api/apis/resume'
import { ResumeEditProvider } from '@/context/resume-info-context'

import { ViewNavHeader } from '@/components/navigation'
import ResumePreviewPanel from '@/pages/dashboard/resume/components/ResumePreviewPanel'

import dummy from '@/data/dummy'

function ViewResumePage() {
    // hooks

    const { resumeId } = useParams()
    const location = useLocation()
    const { isSignedIn } = useUser()

    const queryParams = qs.parse(location.search)

    // states
    const [resumeInfo, setResumeInfo] = useState()

    // method

    useEffect(() => {
        if (queryParams.flag === 'readonly') {
            setResumeInfo(dummy)
        } else {
            GetResumeInfo()
        }
    }, [])

    const GetResumeInfo = async () => {
        const resp = await GetResumeById(resumeId)
        setResumeInfo(resp.data)
    }

    return (
        <ResumeEditProvider value={{ resumeInfo, setResumeInfo }}>
            <div className='view-resume-wrapper bg-[var(--view-bg)]'>
                <div id='no-print'>
                    <ViewNavHeader />
                </div>

                <main className='flex flex-col items-center pt-[var(--nav-header-height)] min-h-[var(--nav-header-height)]'>
                    {isSignedIn && (
                        <div id='no-print' className='my-10 px-4 sm:px-10 md:px-20'>
                            <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI-generated Resume is ready!</h2>
                            <p className='text-center text-gray-400'>You can now download or share your resume using this unique link.</p>
                        </div>
                    )}

                    <div className='max-w-[850px] flex-1 flex justify-center items-center my-10 mx-10 md:mx-20 lg:mx-36'>
                        <div id='print-area'>
                            <ResumePreviewPanel />
                        </div>
                    </div>
                </main>
            </div>
        </ResumeEditProvider>
    )
}

export default ViewResumePage
