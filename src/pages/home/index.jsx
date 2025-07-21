import React from 'react'
import { Button } from '@/components/ui/button'
import { NavHeader } from '@/components/navigation'
import { SlantLineBackground } from '@/components/common'

export default function HomePage() {
    return (
        <div className='relative'>
            <NavHeader />

            <main className='min-h-dvh pt-[var(--nav-header-height)] grid grid-cols-1 lg:grid-cols-2'>
                {/* Left conten */}
                <section className='flex flex-col justify-center px-6 lg:px-16'>
                    <div className='max-w-xl'>
                        <h1 className='text-4xl font-bold tracking-tight mb-6'>
                            Welcome to{' '}
                            <span className='bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent'>
                                Resume AI +
                            </span>
                        </h1>
                        <p className='text-muted-foreground text-lg mb-6'>Create your resume effortlessly using the power of AI.</p>
                        <Button size='lg'>Get Started</Button>
                    </div>
                </section>

                {/* Right conten */}
                <section className='relative flex justify-center items-center bg-background overflow-hidden'>
                    <SlantLineBackground className='absolute inset-0 z-0' />

                    {/* A4 preview */}
                    <div className='z-10 aspect-[1/1.414] w-full max-w-[360px] border-gray-950/5 dark:border-white/10 bg-background shadow-md rounded-md'>
                        <div className='size-full flex items-center justify-center text-muted'>A4 Resume Preview</div>
                    </div>
                </section>
            </main>
        </div>
    )
}
