import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, Copy, Pencil, Trash, NotebookPen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

import { useTransformLang, useDialog } from '@/hooks/client'

function ResumeCardActions({ resume }) {
    // hooks

    const navigate = useNavigate()
    const { t } = useTransformLang()
    const { onOpen, targetDialog, onClose } = useDialog()

    // states

    const open = targetDialog(`resume:actions:${resume.documentId}`)

    // handle event

    const handleOpenChange = isOpen => {
        isOpen ? onOpen(`resume:actions:${resume.documentId}`) : onClose()
    }

    const handleOpen = e => {
        e.stopPropagation()
        navigate(`/edit-resume/${resume.documentId}/edit`)
    }

    const handleCopy = e => {
        e.stopPropagation()
        onOpen(`resume:copy:${resume.documentId}`, { did: resume.documentId, ...resume })
    }

    const handleRename = e => {
        e.stopPropagation()
        onOpen(`resume:rename:${resume.documentId}`, { did: resume.documentId, ...resume })
    }

    const handleDelete = e => {
        e.stopPropagation()
        onOpen(`resume:delete:${resume.documentId}`, { did: resume.documentId, ...resume })
    }

    return (
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        `rounded-full transition-opacity hover:bg-background/80 group-hover:opacity-100`,
                        open ? 'opacity-100 bg-background' : 'opacity-0'
                    )}
                >
                    <MoreHorizontal className='size-4' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='start' side='bottom' sideOffset={6} collisionPadding={8} className='w-40'>
                <DropdownMenuItem onClick={handleOpen}>
                    <NotebookPen className='size-3.5' />
                    {t('open')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRename}>
                    <Pencil className='size-3.5' />
                    {t('rename')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopy}>
                    <Copy className='size-3.5' />
                    {t('copy')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className='text-rose-600'>
                    <Trash className='size-3.5' />
                    {t('delete')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(ResumeCardActions)
