import React, { useMemo, memo } from 'react'
import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from './common/collapsible-panel'
import HeaderSetion from './forms/HeaderSetion'
import { MODULE_COMPONENTS } from './forms'

import { useModuleStore } from '@/hooks/client'

function PlaceholderModule() {
    return <div className='text-muted-foreground italic'>Not Configured</div>
}

function flatModulesToSortableList(obj) {
    if (!obj) return []
    return Object.entries(obj)
        .flatMap(([, items]) => items)
        .flat(i => i)
}

function ResumeEditPanel() {
    // hooks

    const { enabledModules } = useModuleStore(state => state)

    // States

    const sortableList = flatModulesToSortableList(enabledModules)
    const firstSectionId = sortableList[0]?.sectionId ?? 'personal-section'

    // Memoized

    const memoizedPanels = useMemo(() => {
        return sortableList.map(section => {
            const SectionEditComponent = MODULE_COMPONENTS[section.sectionId]
            return (
                <CollapsiblePanel key={section.sectionId} value={section.sectionId} title={section.name}>
                    {SectionEditComponent ? <SectionEditComponent /> : <PlaceholderModule />}
                </CollapsiblePanel>
            )
        })
    }, [sortableList])

    return (
        <div className='flex flex-col'>
            <HeaderSetion />

            <div className='bg-background flex-1 w-full overflow-hidden p-4'>
                <Accordion type='single' collapsible='true' defaultValue={firstSectionId} className='space-y-4 py-4 flex-1 flex flex-col'>
                    {memoizedPanels}
                    <div className='h-20' />
                </Accordion>
            </div>
        </div>
    )
}

export default memo(ResumeEditPanel)
