import React, { useState, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Added } from '@/components/common'
import { RemoveConfirmDialog } from '@/pages/resume/components/dialog'
import { EnabledSortableItem } from '../module-item/EnabledSortableItem'

import { cn } from '@/lib/utils'
import { useTransformLang, useSectionManage, useResumeStore } from '@/hooks/client'

/**
 * 已启用模块导航组件
 * 显示已启用的模块列表，支持添加、删除、导航和排序功能
 *
 * @param {Object} props - 组件属性
 * @param {Array} [props.items=[]] - 已启用的模块列表
 * @param {string} [props.className] - 可选的CSS类名
 * @returns {JSX.Element} 已启用模块导航组件
 */
const EnabledModulesNav = ({ items = [], className }) => {
    // Hooks

    const { t } = useTransformLang()
    const navigate = useNavigate()
    const location = useLocation()
    const onRemove = useSectionManage(state => state.remove)
    const onRemoveSection = useResumeStore(state => state.removeSection)

    // States

    const [dialogState, setDialogState] = useState({
        isOpen: false,
        moduleId: null,
        name: '',
    })

    // Event handlers

    const handleAddModule = useCallback(() => {
        navigate(location.pathname + `#section-available`)
    }, [navigate, location.pathname])

    const handleNavigate = useCallback(
        moduleId => {
            navigate(location.pathname + `#section-${moduleId}`)
        },
        [navigate, location.pathname]
    )

    const handleRemoveRequest = useCallback(
        moduleId => {
            const item = items.find(item => item.id === moduleId)
            setDialogState({
                isOpen: true,
                moduleId,
                name: item?.name,
            })
        },
        [items]
    )

    const handleConfirmRemove = useCallback(() => {
        if (dialogState.moduleId && onRemove) {
            onRemove(dialogState.moduleId)
            onRemoveSection(dialogState.moduleId)
        }
        setDialogState({
            isOpen: false,
            moduleId: null,
            name: '',
        })
    }, [dialogState.moduleId, onRemove])

    const handleDialogClose = useCallback(() => {
        setDialogState({
            isOpen: false,
            moduleId: null,
            name: '',
        })
    }, [])

    const dialogProps = useMemo(
        () => ({
            isOpen: dialogState.isOpen,
            title: `${t('removeModule')} : ${dialogState.name}`,
            description: t('removeModuleWarning') || 'This operation cannot be undone.',
            cancelText: t('cancel'),
            confirmText: t('confirm'),
        }),
        [dialogState.isOpen, dialogState.name, handleConfirmRemove, t]
    )

    return (
        <div className={cn('w-full flex flex-col', className)}>
            <header className='flex items-center justify-between py-2 px-3 gap-2 border-b border-b-accent'>
                <div className='flex items-center gap-2'>
                    <h2 className='text-lg font-semibold'>{t('enabledModules')}</h2>
                    <Badge variant='secondary' className='rounded-full p-1 text-xs text-lime-700 font-medium font-mono tabular-nums'>
                        {items.length}
                    </Badge>
                </div>
                <Added onClick={handleAddModule} />
            </header>

            <ScrollArea className='w-full h-70 p-2'>
                <ul role='list' className='space-y-1'>
                    {items.map((item, index) => (
                        <li key={item.id} role='listitem'>
                            <EnabledSortableItem
                                id={item.id}
                                column='enabled-modules-actions'
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
                isOpen={dialogState.isOpen}
                onOpenChange={handleDialogClose}
                onConfirm={handleConfirmRemove}
                {...dialogProps}
            />
        </div>
    )
}

export default React.memo(EnabledModulesNav)
