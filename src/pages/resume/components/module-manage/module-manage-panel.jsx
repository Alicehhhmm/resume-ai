import { useCallback, useMemo } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'

import { CollapsibleRow } from '@/components/common'
import { EnabledModulesList } from './index'
import { useTransformLang, useSectionManage } from '@/hooks/client'

/**
 * 将启用的模块按默认布局分组
 * @param {Array} modules - 模块数组
 * @returns {Object} {main: [], sidebar: []} 按布局分组的模块对象
 */
function generateEnabledLayoutGroups(modules = []) {
    return modules.reduce((layoutGroups, module) => {
        if (module.isEnabled) {
            const { defaultLayout } = module
            layoutGroups[defaultLayout] = [...(layoutGroups[defaultLayout] || []), module]
        }
        return layoutGroups
    }, {})
}

export const ModuleManagePanel = () => {
    // Hooks

    const { t } = useTransformLang()
    const { getEnabledModules, reorder: reorderModules } = useSectionManage(state => state)

    // Computed
    const enabledModules = getEnabledModules()
    const modulesByLayout = useMemo(() => generateEnabledLayoutGroups(enabledModules), [enabledModules])

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
        <CollapsibleRow open title={t('moduleManage')} rightAsChild={<span>1</span>}>
            <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                <EnabledModulesList items={modulesByLayout} />
            </DragDropProvider>
        </CollapsibleRow>
    )
}
