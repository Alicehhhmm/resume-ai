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

import { More } from '@/components/common/Action'
import { cn } from '@/lib/utils'

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

export function MoreMenu({ item, t, onToggleLock, onToggleVisible, onDuplicate, onDelete }) {
    if (!item) return null

    const { visible, disabled } = item

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <More />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-40'>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onToggleLock}>
                        {disabled ? <LockKeyholeIcon size={14} /> : <LockKeyholeOpenIcon size={14} />}
                        <span className=''>{t('disabled')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onToggleVisible}>
                        {visible ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
                        <span className=''>{t('visible')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDuplicate}>
                        <CopyIcon size={14} />
                        <span className=''>{t('Copy')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant='destructive' onClick={onDelete}>
                        <Trash2Icon size={14} />
                        <span className=''>{t('trash')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
