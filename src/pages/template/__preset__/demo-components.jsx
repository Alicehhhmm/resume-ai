import React, { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { TemplateProvider, useTemplate } from '../tempalet-provider'

// share components
const WithSection = React.memo(({ section, children, className, ...rest }) => {
    if (!section?.visible) return null

    return (
        <section
            id={section.sectionId}
            aria-label={section.name}
            className={cn('grid grid-cols-5 gap-2 border-t pt-3', className)}
            {...rest}
        >
            {children}
        </section>
    )
})

// section-item components
const Header = () => {
    return (
        <section id='section-header'>
            <h1>Header</h1>
        </section>
    )
}

const Profiles = () => {
    return (
        <WithSection section={{}}>
            <h1>Profiles</h1>
        </WithSection>
    )
}

const Summary = () => {
    return (
        <WithSection section={{}}>
            <h1>Summary</h1>
        </WithSection>
    )
}

const Education = () => {
    return (
        <WithSection section={{}}>
            <h1>Education</h1>
        </WithSection>
    )
}

const Experience = () => {
    return (
        <WithSection section={{}}>
            <h1>Experience</h1>
        </WithSection>
    )
}

const Projects = ({ id }) => {
    const { section } = useTemplate()
    console.log('data', section[id])
    return (
        <WithSection section={section ?? {}}>
            <h1>Projects</h1>
        </WithSection>
    )
}

const Certifications = () => {
    return (
        <WithSection section={{}}>
            <h1>Certifications</h1>
        </WithSection>
    )
}

const Awards = () => {
    return (
        <WithSection section={{}}>
            <h1>Awards</h1>
        </WithSection>
    )
}

const Skills = () => {
    return (
        <WithSection section={{}}>
            <h1>Skills</h1>
        </WithSection>
    )
}

const Publications = () => {
    return (
        <WithSection section={{}}>
            <h1>Publications</h1>
        </WithSection>
    )
}

const Interests = () => {
    return (
        <WithSection section={{}}>
            <h1>Interests</h1>
        </WithSection>
    )
}

const Volunteer = () => {
    return (
        <WithSection section={{}}>
            <h1>Volunteer</h1>
        </WithSection>
    )
}

const Internships = () => {
    return (
        <WithSection section={{}}>
            <h1>Internships</h1>
        </WithSection>
    )
}

const Portfolio = () => {
    return (
        <WithSection section={{}}>
            <h1>Portfolio</h1>
        </WithSection>
    )
}

const References = () => {
    return (
        <WithSection section={{}}>
            <h1>References</h1>
        </WithSection>
    )
}

const Custom = ({ id }) => {
    return (
        <section id={id}>
            <h1>Custom - {id}</h1>
        </section>
    )
}

// Map section-components
const SECTION_MAP = {
    /* === REQUIRED === */
    'section-profile': Profiles,
    'section-summary': Summary,
    'section-education': Education,
    'section-experience': Experience,
    'section-projects': Projects,
    'section-certifications': Certifications,
    'section-awards': Awards,
    /* === OPTIONAL === */
    'section-skills': Skills,
    'section-publications': Publications,
    'section-interests': Interests,
    'section-volunteer': Volunteer,
    'section-internship': Internships,
    'section-portfolio': Portfolio,
    'section-references': References,
    /* === CUSTOM === */
    'section-custom': Custom,
}

const mapSectionToComponent = ({ sectionKey }) => {
    if (sectionKey.startsWith('section-custom-')) {
        const [, , customId] = sectionKey.split('-')
        return <Custom key={sectionKey} id={customId} />
    }

    const SectionComponent = SECTION_MAP[sectionKey]

    if (!SectionComponent) {
        console.warn(`Unknown section: ${sectionKey}`)
        return null
    }

    return <SectionComponent key={sectionKey} id={sectionKey} />
}

function DemoComponents({ layout, resumeData }) {
    const { main = [], sidebar = [] } = layout || {}

    return (
        <TemplateProvider value={{ layout, section: resumeData?.sections }}>
            <div id='resume-container-wrapper' className='h-full max-w-[850px] z-10 bg-background resume-content'>
                <Header />

                <div className='grid grid-cols-2 gap-2'>
                    <aside id='sidebar-layout' className=''>
                        {sidebar.map(sectionKey => (
                            <Fragment key={sectionKey}>{mapSectionToComponent({ sectionKey })}</Fragment>
                        ))}
                    </aside>
                    <main id='main-layout' className=''>
                        {main.map(sectionKey => (
                            <Fragment key={sectionKey}>{mapSectionToComponent({ sectionKey })}</Fragment>
                        ))}
                    </main>
                </div>
            </div>
        </TemplateProvider>
    )
}

export default DemoComponents
