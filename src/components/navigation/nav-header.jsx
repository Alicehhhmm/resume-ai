'use client'

import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

import Logox from '@/components/common/Logox'
import { NavItems } from '@/components/navigation'
import { GitHubLine } from '@/components/iconx'
import { useSiteNavigation } from '@/hooks/server'

const NavHeader = ({ className }) => {
    const { isLoaded } = useUser()
    const { flattenMapNavigation, headerNavgations } = useSiteNavigation()

    const mappedHeaderItems = flattenMapNavigation(headerNavgations)

    return (
        <div className={cn('fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10 bg-background', className)}>
            <header className='flex h-14 items-center justify-between gap-8 px-6 lg:px-16 ba-background'>
                <Logox />
                <section>
                    <NavItems items={mappedHeaderItems} />
                </section>
                <section className='flex items-center gap-4'>
                    {!isLoaded ? <Skeleton className='size-7 rounded-full' /> : <UserButton />}
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                        <GitHubLine className='size-7 text-muted-foreground hover:text-primary transition-colors duration-200' />
                    </a>
                </section>
            </header>
        </div>
    )
}

NavHeader.displayName = 'NavHeader'

export default NavHeader
