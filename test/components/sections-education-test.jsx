import { SectionList } from '@/pages/resume/components/sections/section-list'
import { FieldRendererGroup } from '@/pages/resume/components/sections/section-form-group'
// import { educationSchema } from '@/schemas/education.schema'
import { MoreMenu } from '@/pages/resume/components/sections/section-actions'

import { useResumeStore, useTransformLang } from '@/hooks'

export const educationSchema = [
    { name: 'universityName', label: 'universityName', colSpan: 2, component: 'input' },
    { name: 'degree', label: 'degree', component: 'input' },
    { name: 'major', label: 'major', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'date' },
    { name: 'endDate', label: 'endDate', component: 'date' },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
]

export function EducationSection() {
    const { t } = useTransformLang()
    const setValue = useResumeStore(s => s.setValue)
    const items = useResumeStore(s => s.resume.data.sections.education.items)

    const handleInput = (e, index) => {
        const { name, value } = e.target
        // setValue(`sections.education.items.${index}.${name}`, value)
        console.log(`sections.education.items.${index}.${name}`, value)
    }

    return (
        <section id='education'>
            <SectionList
                items={items}
                actions={(item, index) => (
                    <>
                        <MoreMenu
                            t={t}
                            item={item}
                            // onToggleLock={() => handleToggleLock(item)}
                            // onToggleVisible={() => handleToggleVisible(item)}
                            // onDuplicate={() => handleDuplicate(item)}
                            // onDelete={() => handleDelete(item)}
                        />
                    </>
                )}
                // {/* 👇 完全自由控制 Title */}
                renderTitle={item => item.universityName}
                // {/* 👇 完全自由控制 Content */}
                renderContent={(item, index) => (
                    <>
                        {/* 内置 */}
                        <FieldRendererGroup schema={educationSchema} item={item} index={index} onInput={handleInput} t={t} />

                        {/* or: custom from */}
                    </>
                )}
            />
        </section>
    )
}
