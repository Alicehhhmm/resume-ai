import { useCallback } from 'react'

import { LayoutList } from 'lucide-react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'

import { ToolButton } from '@/components/common'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import EnabledModulesNav from './module-list/enabled-module-nav'

import { useTransformLang, useSectionManage } from '@/hooks/client'

function ModuleManageActions() {
    // Hooks

    const { t } = useTransformLang()
    const { getEnabledModules, reorder: reorderModules } = useSectionManage(state => state)

    // States

    // Computed
    const enabledModules = getEnabledModules()

    // Event handlers

    const handleDragOver = useCallback(event => {
        const { source } = event.operation

        if (source?.type === 'column') return
    }, [])

    const handleDragEnd = useCallback(
        event => {
            const { source, target } = event.operation

            if (event.canceled || source?.type === 'column') return

            // 重新排序模块并更新状态
            const reorderedModules = move(enabledModules, event)
            const newModuleIds = reorderedModules.map(module => module.id)

            reorderModules(newModuleIds)

            if (process.env.NODE_ENV === 'development') {
                console.log('Module reorder completed:', {
                    originalModules: enabledModules,
                    reorderedModules,
                    newOrder: newModuleIds,
                    source,
                    target,
                })
            }
        },
        [enabledModules, reorderModules]
    )

    return (
        <Popover openDelay={0}>
            <PopoverTrigger asChild>
                <div>
                    <ToolButton tooltip={t('modulesNav')}>
                        <LayoutList className='panel-icon' />
                    </ToolButton>
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-80 p-0' align='start'>
                <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                    <EnabledModulesNav items={enabledModules} />
                </DragDropProvider>
            </PopoverContent>
        </Popover>
    )
}

export default ModuleManageActions
