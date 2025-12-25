import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultCustom, customSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'title', label: 'title', component: 'input' },
    { name: 'link', label: 'link', component: 'dialog' },
    { name: 'startDateStr', label: 'startDateStr', component: 'input' },
    { name: 'endDateStr', label: 'endDateStr', component: 'input' },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
    { name: 'summary', label: 'summary', component: 'richtext', colSpan: 2 },
]

function Custom() {
    const form = useForm({
        defaultValues: defaultCustom,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='custom-content-wrapper'>
            <WithSection sectionKey='custom' form={form} schema={componentSchema} title={item => item.title || 'Untitled Custom'} />
        </div>
    )
}

export default Custom
