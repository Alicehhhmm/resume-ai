import React, { useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Added } from '@/components/common'
import { RemoveConfirmDialog } from '@/pages/resume/components/dialog'
import { EnabledSortableItem } from '../module-item/EnabledSortableItem'

import { cn } from '@/lib/utils'
import { useTransformLang } from '@/hooks'

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
                title={t('removeModule') + ' : ' + confirmDialog.pendingRemove?.itemName}
                description={'This operation cannot be undone.'}
                cancelText={t('cancel')}
                confirmText={t('confirm')}
            />
        </div>
    )
}

export default React.memo(EnabledModulesNav)
