'use client'

import { Separator } from '@/components/ui/separator'

import AddResume from './components/AddResume'
import ResumeList from './components/ResumeList'

export default function DashboardPage() {
    return (
        <div className='py-10 px-4 md:px-10 lg:px-16'>
            <div className='space-y-2'>
                <h2 className='text-3xl font-semibold tracking-tight text-foreground'>My Resume</h2>
                <p className='text-muted-foreground leading-relaxed'>Start creating your AI-powered resume for your next job role.</p>
            </div>

            <Separator className='my-6' />

            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                <AddResume />
                <ResumeList />
            </div>
        </div>
    )
}
