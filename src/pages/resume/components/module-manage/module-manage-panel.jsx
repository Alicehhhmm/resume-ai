import React, { useCallback } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'

import { CollapsibleRow } from '@/components/common'
import EnabledModules from './module-list/EnabledModules'

import { useSectionModules, useModuleStore, useTransformLang } from '@/hooks'

export const ModuleManagePanel = () => {
    // hooks

    const { t } = useTransformLang()
    const state = useModuleStore(state => state)
    const { enabledModules } = useSectionModules()

    // States

    const setEnabledList = state.updateEnabledModules

    // Method

    const onDragOver = useCallback(
        event => {
            const { source, target } = event.operation

            if (source?.type === 'column') return

            setEnabledList(move(enabledModules, event))
        },
        [enabledModules, setEnabledList]
    )

    const onDragEnd = useCallback(event => {
        const { source, target } = event.operation
        if (event.canceled || source.type !== 'column') return
    }, [])

    return (
        <CollapsibleRow open title={t('moduleManage')} rightAsChild={<>1</>}>
            <DragDropProvider onDragOver={onDragOver} onDragEnd={onDragEnd}>
                <EnabledModules items={enabledModules} />
            </DragDropProvider>
        </CollapsibleRow>
    )
}
