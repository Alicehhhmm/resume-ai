import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultAward, awardSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'title', label: 'title', component: 'input', colSpan: 2 },
    { name: 'issuer', label: 'issuer', component: 'input' },
    { name: 'date', label: 'date', component: 'input' },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
]

function Award() {
    const form = useForm({
        defaultValues: defaultAward,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='award-content-wrapper'>
            <WithSection sectionKey='awards' form={form} schema={componentSchema} title={item => item.title || 'Untitled Award'} />
        </div>
    )
}

export default Award
