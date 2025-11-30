import CollapsiblePanel from '@/components/common/collapsible-panel'
import { WithSection } from '@/pages/resume/components/sections/WithSection'
import { useResumeStore } from '@/hooks'

export const educationSchema = [
    { name: 'universityName', label: 'universityName', component: 'input', colSpan: 2 },
    { name: 'degree', label: 'degree', component: 'input' },
    { name: 'major', label: 'major', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'date' },
    { name: 'endDate', label: 'endDate', component: 'date' },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
]

export const SectionEducation = () => {
    const section = useResumeStore(s => s.resume.data.sections.education)

    return (
        <section id={'sectionKey'} className=''>
            <CollapsiblePanel
                id={section.sectionId}
                key={section.sectionId}
                value={section.sectionId}
                title={section.name}
                className='scroll-mt-16'
            >
                <WithSection sectionKey='education' schema={educationSchema} title={item => item.universityName || 'Untitled School'} />
            </CollapsiblePanel>
        </section>
    )
}
