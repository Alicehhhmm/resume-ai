import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultVolunteer, volunteerSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'organization', label: 'organization', component: 'input' },
    { name: 'role', label: 'role', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'input' },
    { name: 'endDate', label: 'endDate', component: 'input' },
    { name: 'description', label: 'description', component: 'richtext', colSpan: 2 },
]

function Volunteer() {
    const form = useForm({
        defaultValues: defaultVolunteer,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='volunteer-content-wrapper'>
            <WithSection
                sectionKey='volunteer'
                form={form}
                schema={componentSchema}
                title={item => item.organization || 'Unorganizationd Volunteer'}
            />
        </div>
    )
}

export default Volunteer
