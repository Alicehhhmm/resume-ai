import React, { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { EnabledSortableItem } from '../module-item/EnabledSortableItem'
import { useTransformLang } from '@/hooks'
import { cn } from '@/lib/utils'
import { Added } from '@/components/common'
import { SnailIcon } from 'lucide-react'
import { Actions, Handle, Nav } from '@/components/common/Action'
import { ListEndIcon } from 'lucide-react'
import { MilestoneIcon } from 'lucide-react'

/**
 * 移除确认对话框组件
 */
const RemoveConfirmDialog = ({ isOpen, onOpenChange, onConfirm, itemName, t }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirmRemoveTitle')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('confirmRemoveDescription', { itemName })}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{t('confirm')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

/**
 * 空状态组件
 */
const EmptyState = ({ t }) => (
    <div className='flex items-center justify-center py-8 text-muted-foreground'>
        <p>{t('noEnabledModules')}</p>
    </div>
)

const EnabledModulesNav = ({ items = [], onRemove, className }) => {
    // Hooks
    const { t } = useTransformLang()
    const navigate = useNavigate()
    const location = useLocation()

    // States
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        pendingRemove: null,
    })

    // Event handlers
    const handleAddModule = () => {
        navigate(location.pathname + `#section-available`)
    }

    const handleNavigate = (itemId, moduleId) => {
        navigate(location.pathname + `#section-${itemId}`)
    }

    const handleRemoveRequest = useCallback(
        (itemId, moduleId) => {
            const item = items.find(item => item.id === itemId)
            setConfirmDialog({
                isOpen: true,
                pendingRemove: {
                    itemId,
                    moduleId,
                    itemName: item?.name || itemId,
                },
            })
            console.log('location.pathname@', location.pathname, itemId, moduleId)
        },
        [items]
    )

    const handleConfirmRemove = useCallback(() => {
        const { pendingRemove } = confirmDialog
        if (pendingRemove && onRemove) {
            onRemove(pendingRemove.itemId, pendingRemove.moduleId)
        }
        setConfirmDialog({ isOpen: false, pendingRemove: null })
    }, [confirmDialog, onRemove])

    const handleDialogClose = useCallback(isOpen => {
        if (!isOpen) {
            setConfirmDialog({ isOpen: false, pendingRemove: null })
        }
    }, [])

    // 渲染空状态
    if (!items.length) {
        return (
            <div className='w-full flex flex-col gap-2'>
                <header>
                    <h2 className='text-lg font-semibold'>{t('enabledModules')}</h2>
                </header>
                <EmptyState t={t} />
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col'>
            <header className='flex items-center justify-between py-2 px-3 gap-2 border-b border-b-accent'>
                <div className='flex items-center gap-2'>
                    <h2 className='text-lg font-semibold'>{t('enabledModules')}</h2>
                    <Badge variant='secondary' className='rounded-full p-1 text-xs text-lime-700 font-medium font-mono tabular-nums'>
                        {items.length}
                    </Badge>
                </div>
                <Added onClick={handleAddModule} />
            </header>

            <ScrollArea className={'w-full h-80 p-2'}>
                <ul role='list' className='space-y-1'>
                    {items.map((item, index) => (
                        <li key={item.id} role='listitem'>
                            <EnabledSortableItem
                                id={item.id}
                                column={'enabled-modules-actions'}
                                index={index}
                                label={item.name ?? item.id}
                                onRemove={handleRemoveRequest}
                                onNavigate={handleNavigate}
                                className={cn('!shadow-none hover:!bg-muted hover:!text-primary transition-colors duration-200')}
                            />
                        </li>
                    ))}
                </ul>
            </ScrollArea>

            <RemoveConfirmDialog
                isOpen={confirmDialog.isOpen}
                onOpenChange={handleDialogClose}
                onConfirm={handleConfirmRemove}
                itemName={confirmDialog.pendingRemove?.itemName}
                t={t}
            />
        </div>
    )
}

export default React.memo(EnabledModulesNav)
