import { EyeIcon, EyeOffIcon, Trash2Icon, PlusIcon, LockKeyholeIcon, LockKeyholeOpenIcon, CopyIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { SectionDialog } from './section-dialog'
import { More } from '@/components/common/Action'

import { cn } from '@/lib/utils'
import { useDialog } from '@/hooks'

export function CreateItemButton({ onClick, t, className, ...props }) {
    return (
        <Button
            type='button'
            variant='outline'
            size='default'
            onClick={onClick}
            className={cn('w-full gap-2 border-dashed h-10', 'hover:bg-accent hover:border-primary/50', 'transition-all duration-200')}
            {...props}
        >
            <PlusIcon className='size-3.5' />
            <span className='font-medium'>{t('createdItem')}</span>
        </Button>
    )
}

export function MoreMenu({ item, t, sectionKey, onToggleLock, onToggleVisible, onDuplicate, onSubmitDelete }) {
    if (!item) return null
    const { visible, disabled } = item
    const { onOpen } = useDialog()

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <More />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-40'>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={onToggleLock}>
                            {disabled ? <LockKeyholeIcon size={14} /> : <LockKeyholeOpenIcon size={14} />}
                            <span className=''>{t('disabled')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onToggleVisible} disabled={disabled}>
                            {visible ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
                            <span className=''>{t('visible')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onDuplicate} disabled={disabled}>
                            <CopyIcon size={14} />
                            <span className=''>{t('Copy')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            variant='destructive'
                            onSelect={() => onOpen(`${sectionKey}:delete:${item.id}`)}
                            disabled={disabled}
                        >
                            <Trash2Icon size={14} />
                            <span className=''>{t('trash')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <SectionDialog sectionKey={sectionKey} item={item} onSubmit={onSubmitDelete} />
        </>
    )
}
