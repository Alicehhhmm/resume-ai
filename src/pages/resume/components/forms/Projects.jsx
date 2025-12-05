import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultProjects, projectsSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'projectName', label: 'projectName', component: 'input', colSpan: 2 },
    { name: 'position', label: 'position', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'input' },
    { name: 'endDate', label: 'endDate', component: 'input' },
    { name: 'link', label: 'link', component: 'dialog' },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
    { name: 'summary', label: 'summary', component: 'richtext', colSpan: 2 },
]

function Projects() {
    const form = useForm({
        defaultValues: defaultProjects,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='projects-content-wrapper'>
            <WithSection
                sectionKey='projects'
                form={form}
                schema={componentSchema}
                title={item => item.projectName || 'Untitled Projects'}
            />
        </div>
    )
}

export default Projects
