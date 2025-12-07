import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultExperience, experienceSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'companyName', label: 'companyName', component: 'input', colSpan: 2 },
    { name: 'position', label: 'position', component: 'input' },
    { name: 'location', label: 'location', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'input' },
    { name: 'endDate', label: 'endDate', component: 'input' },
    { name: 'summary', label: 'summary', component: 'richtext', colSpan: 2 },
]

function Experience() {
    const form = useForm({
        defaultValues: defaultExperience,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='experience-content-wrapper'>
            <WithSection
                sectionKey='experience'
                form={form}
                schema={componentSchema}
                title={item => item.companyName || 'Untitled Experience'}
            />
        </div>
    )
}

export default Experience
