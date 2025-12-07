import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultSkill, skillSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'name', label: 'name', component: 'input' },
    { name: 'level', label: 'level', component: 'dropdown-menu', levelType: 'technical' },
    { name: 'ratio', label: 'ratio', component: 'slider', colSpan: 2 },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
]

function Skills() {
    const form = useForm({
        defaultValues: defaultSkill,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='skills-content-wrapper'>
            <WithSection sectionKey='skills' form={form} schema={componentSchema} title={item => item.name || 'Untitled Skills'} />
        </div>
    )
}

export default Skills
