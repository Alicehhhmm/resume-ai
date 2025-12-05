import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultInternship, internshipSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'companyName', label: 'companyName', component: 'input' },
    { name: 'position', label: 'position', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'input' },
    { name: 'endDate', label: 'endDate', component: 'input' },
    { name: 'description', label: 'description', component: 'richtext', colSpan: 2 },
]

function Internship() {
    const form = useForm({
        defaultValues: defaultInternship,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='internship-content-wrapper'>
            <WithSection
                sectionKey='internships'
                form={form}
                schema={componentSchema}
                title={item => item.companyName || 'Untitled Internship'}
            />
        </div>
    )
}

export default Internship
