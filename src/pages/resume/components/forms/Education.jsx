import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultEducation, educationSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'universityName', label: 'universityName', component: 'input', colSpan: 2 },
    { name: 'degree', label: 'degree', component: 'input' },
    { name: 'major', label: 'major', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'input' },
    { name: 'endDate', label: 'endDate', component: 'input' },
    { name: 'description', label: 'description', component: 'richtext', colSpan: 2 },
]

function Education() {
    const form = useForm({
        defaultValues: defaultEducation,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='education-content-wrapper'>
            <WithSection
                sectionKey='education'
                form={form}
                schema={componentSchema}
                title={item => item.universityName || 'Untitled School'}
            />
        </div>
    )
}

export default Education
