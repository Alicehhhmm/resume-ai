import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultPortfolio, portfolioSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'title', label: 'title', component: 'input' },
    { name: 'publisher', label: 'publisher', component: 'input' },
    { name: 'date', label: 'date', component: 'input' },
    { name: 'link', label: 'link', component: 'dialog' },
    { name: 'description', label: 'description', component: 'richtext', colSpan: 2 },
]

function Portfolio() {
    const form = useForm({
        defaultValues: defaultPortfolio,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='portfolio-content-wrapper'>
            <WithSection sectionKey='portfolio' form={form} schema={componentSchema} title={item => item.title || 'Untitled Portfolio'} />
        </div>
    )
}

export default Portfolio
