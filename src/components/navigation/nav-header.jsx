'use client'

import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

import Logox from '@/components/common/Logox'
import { NavItems } from '@/components/navigation'
import { GitHubLine } from '@/components/iconx'
import { useSiteNavigation } from '@/hooks/server'

import { Button } from '@/components/ui/button'

const NavHeader = ({ className }) => {
    const { isLoaded, isSignedIn } = useUser()
    const { flattenMapNavigation, headerNavgations } = useSiteNavigation()
    const mappedHeaderItems = flattenMapNavigation(headerNavgations)

    return (
        <div className={cn('fixed inset-x-0 top-0 z-100 border-b border-gray-950/5 dark:border-white/10 bg-background', className)}>
            <header className='flex h-14 items-center justify-between gap-8 px-6 lg:px-16 ba-background'>
                <Logox />

                <nav className='hidden md:flex items-center gap-6 text-sm font-medium'>
                    <NavItems items={mappedHeaderItems} />
                </nav>

                <div className='flex items-center gap-4'>
                    {!isLoaded ? (
                        <Skeleton className='size-7 rounded-full' />
                    ) : isSignedIn ? (
                        <UserButton />
                    ) : (
                        <div className='flex items-center gap-2'>
                            <SignInButton mode='modal'>
                                <Button variant='ghost' size='sm'>
                                    Sign in
                                </Button>
                            </SignInButton>
                            <SignUpButton mode='modal'>
                                <Button variant='default' size='sm'>
                                    Sign up
                                </Button>
                            </SignUpButton>
                        </div>
                    )}

                    <a
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-primary transition-colors'
                    >
                        <GitHubLine className='size-7' />
                    </a>
                </div>
            </header>
        </div>
    )
}

NavHeader.displayName = 'NavHeader'

export default NavHeader
