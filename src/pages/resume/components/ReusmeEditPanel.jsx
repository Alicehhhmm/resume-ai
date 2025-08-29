import { useMemo, memo } from 'react'
import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from '@/components/common/collapsible-panel'
import HeaderSetion from './forms/HeaderSetion'
import { MODULE_COMPONENTS } from './forms'
import { AvailableModuleList } from './module-manage'

import { useSectionManage } from '@/hooks/client'

function PlaceholderModule() {
    return <div className='text-muted-foreground italic'>Not Configured</div>
}

function ResumeEditPanel() {
    // hooks

    const { getEnabledModules, init } = useSectionManage(state => state)

    // States

    const sortableList = getEnabledModules()
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

            <div className='bg-background flex-1 p-2'>
                <Accordion type='single' collapsible='true' defaultValue={firstSectionId} className='gap-3 py-4 flex-1 flex flex-col '>
                    {memoizedPanels}
                    <AvailableModuleList />
                    <div className='h-20' />
                </Accordion>
            </div>
        </div>
    )
}

export default memo(ResumeEditPanel)
