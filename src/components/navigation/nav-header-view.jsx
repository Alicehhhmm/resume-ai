'use client'

import { useState } from 'react'
import { Menu, Download, Printer, Share2Icon, StickyNote, Columns2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import Logox from '@/components/common/Logox'
import { GitHubLine } from '@/components/iconx'
import { ThemeToggleBtn } from '@/components/common'

import { useSiteNavigation, useTransformLang } from '@/hooks'

const ViewNavHeader = ({ className }) => {
    // hooks

    const params = useParams()
    const navigation = useNavigate()
    const { isLoaded, isSignedIn } = useUser()
    const { t } = useTransformLang()
    const {} = useSiteNavigation()

    // state

    const [activeBtn, setActiveBtn] = useState('')
    const [layoutColumn, setLayoutColumn] = useState(false)

    // methods

    const handleChangePage = () => {
        setActiveBtn('editor-btn')
        const resumeId = params?.resumeId
        if (resumeId) navigation(`/dashboard/resume/${resumeId}/edit`)
    }

    const handleChangeLayout = () => {
        setLayoutColumn(!layoutColumn)
        // TODO: add change state form theme steing state
    }

    const handlePrint = () => {
        setActiveBtn('print-btn')
        window.print()
    }

    const handleDownloadPdf = () => {
        setActiveBtn('download-btn')
        // TODO: exportToPdf('print-area', `resume-${Date.now()}.pdf`)
    }

    const handleShare = () => {
        setActiveBtn('share-btn')
        // TODO: navigator.share() or custom modal
    }

    return (
        <div className={cn('fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b print:hidden', className)}>
            <header className='h-14 flex items-center justify-between gap-6 px-4 sm:px-6 md:px-10 lg:px-16'>
                <Logox />

                <nav className='hidden md:flex items-center gap-3 text-sm font-medium'>
                    <Button variant={activeBtn === 'editor-btn' ? 'default' : 'outline'} size='sm' onClick={handleChangePage}>
                        <Menu size={16} className='mr-2' />
                        {t('editor')}
                    </Button>

                    <Button variant={activeBtn === 'layout-btn' ? 'default' : 'outline'} size='sm' onClick={handleChangeLayout}>
                        {layoutColumn ? <StickyNote size={16} className='mr-2' /> : <Columns2 size={16} className='mr-2' />}
                        {layoutColumn ? t('singlePage') : t('multiPage')}
                    </Button>

                    <Button variant={activeBtn === 'download-btn' ? 'default' : 'outline'} size='sm' onClick={handleDownloadPdf}>
                        <Download size={16} className='mr-2' />
                        {t('downloadPDF')}
                    </Button>

                    <Button variant={activeBtn === 'print-btn' ? 'default' : 'outline'} size='sm' onClick={handlePrint}>
                        <Printer size={16} className='mr-2' />
                        {t('print')}
                    </Button>

                    <Button variant={activeBtn === 'share-btn' ? 'default' : 'outline'} size='sm' onClick={handleShare}>
                        <Share2Icon size={16} className='mr-2' />
                        {t('share')}
                    </Button>
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

                    <ThemeToggleBtn />

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

ViewNavHeader.displayName = 'ViewNavHeader'

export default ViewNavHeader
