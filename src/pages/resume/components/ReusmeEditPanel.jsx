import { useEffect, useCallback, useMemo, memo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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

    const { hash } = useLocation()
    const { getEnabledModules, init } = useSectionManage(state => state)

    // States

    const sortableList = getEnabledModules()
    const firstSectionId = sortableList[0]?.sectionId ?? 'personal-section'
    const sectionListRef = useRef(null)

    // Methods

    const scrollToSection = useCallback((ref, sectionId) => {
        if (!ref.current || !sectionId) return
        const selector = sectionId.startsWith('#') ? sectionId : `#${sectionId}`
        const element = ref.current.querySelector(selector)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [])

    useEffect(() => {
        if (hash && sectionListRef.current) {
            // hash: #section-{sectionId}
            scrollToSection(sectionListRef, hash)
        }
    }, [hash, scrollToSection])

    // Memoized

    const memoizedPanels = useMemo(() => {
        return sortableList.map(section => {
            const SectionEditComponent = MODULE_COMPONENTS[section.sectionId]
            return (
                <CollapsiblePanel
                    id={section.sectionId}
                    key={section.sectionId}
                    value={section.sectionId}
                    title={section.name}
                    className='scroll-mt-16'
                >
                    {SectionEditComponent ? <SectionEditComponent /> : <PlaceholderModule />}
                </CollapsiblePanel>
            )
        })
    }, [sortableList])

    return (
        <div id='ResumeEditPanel' className='flex flex-col'>
            <HeaderSetion />

            <div className='bg-background flex-1 p-2'>
                <Accordion
                    ref={sectionListRef}
                    type='single'
                    collapsible
                    defaultValue={firstSectionId}
                    className='gap-3 py-4 flex-1 flex flex-col '
                >
                    {memoizedPanels}
                    <AvailableModuleList />
                    <div className='h-20' id='section-bottom' />
                </Accordion>
            </div>
        </div>
    )
}

export default memo(ResumeEditPanel)
