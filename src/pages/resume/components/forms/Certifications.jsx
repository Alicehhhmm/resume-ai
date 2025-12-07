import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultCertification, certificationSchema as formSchema } from '@/schemas/sections'
import { WithSection } from '../sections/WithSection'

const componentSchema = [
    { name: 'title', label: 'title', component: 'input', colSpan: 2 },
    { name: 'issuer', label: 'issuer', component: 'input' },
    { name: 'validDate', label: 'validDate', component: 'input' },
    { name: 'link', label: 'link', component: 'dialog', colSpan: 2 },
]

function Certifications() {
    const form = useForm({
        defaultValues: defaultCertification,
        resolver: zodResolver(formSchema),
    })

    return (
        <div data-slot='certifications-content-wrapper'>
            <WithSection
                sectionKey='certifications'
                form={form}
                schema={componentSchema}
                title={item => item.title || 'Untitled Certifications'}
            />
        </div>
    )
}

export default Certifications
