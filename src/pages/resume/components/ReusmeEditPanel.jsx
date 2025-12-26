import { useEffect, useCallback, useMemo, memo, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from '@/components/common/collapsible-panel'
import { MODULE_COMPONENTS, PlaceholderModule, HeaderSetion } from './forms'
import { AvailableModuleList } from './module-manage'

import { useSectionManage } from '@/hooks/client'

function ResumeEditPanel() {
    // hooks

    const { hash } = useLocation()
    const { getEnabledModules, modules, basics } = useSectionManage(state => state)

    // States

    const sortableList = getEnabledModules()
    const sectionListRef = useRef(null)
    const firstSectionId = Object.keys(MODULE_COMPONENTS)[0]

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

    const memoizedBasicSection = useMemo(() => {
        const section = basics
        const SectionComponent = MODULE_COMPONENTS[section.sectionId]

        return (
            <CollapsiblePanel
                id={section.sectionId}
                key={section.sectionId}
                value={section.sectionId}
                title={section.name}
                className='scroll-mt-16'
            >
                {SectionComponent ? <SectionComponent /> : <PlaceholderModule />}
            </CollapsiblePanel>
        )
    }, [basics])

    const memoizedEnabledSection = useMemo(() => {
        return sortableList.map(section => {
            const SectionComponent = section.sectionId.match(/^(section-)?custom/)
                ? MODULE_COMPONENTS['section-custom']
                : MODULE_COMPONENTS[section.sectionId]
            return (
                <CollapsiblePanel
                    id={section.sectionId}
                    key={section.sectionId}
                    value={section.sectionId}
                    title={section.name}
                    className='scroll-mt-16'
                >
                    {SectionComponent ? <SectionComponent /> : <PlaceholderModule />}
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
                    {memoizedBasicSection}
                    {memoizedEnabledSection}
                    <AvailableModuleList />
                    <div className='h-20' id='section-bottom' />
                </Accordion>
            </div>
        </div>
    )
}

export default memo(ResumeEditPanel)
