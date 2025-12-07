import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultInterest, interestSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [{ name: 'name', label: 'name', component: 'input', colSpan: 2 }]

function Interests() {
    const form = useForm({
        defaultValues: defaultInterest,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='interests-content-wrapper'>
            <WithSection sectionKey='interests' form={form} schema={componentSchema} title={item => item.name || 'Untitled Interests'} />
        </div>
    )
}

export default Interests
