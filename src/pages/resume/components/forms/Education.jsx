'use client'

import { WithSection } from '../sections/WithSection'

const educationSchema = [
    { name: 'universityName', label: 'universityName', component: 'input', colSpan: 2 },
    { name: 'degree', label: 'degree', component: 'input' },
    { name: 'major', label: 'major', component: 'input' },
    { name: 'startDate', label: 'startDate', component: 'input' },
    { name: 'endDate', label: 'endDate', component: 'input' },
    { name: 'description', label: 'description', component: 'textarea', colSpan: 2 },
]

function Education() {
    // hooks

    // States

    // Method

    return (
        <div data-slot='education-content-wrapper'>
            <WithSection sectionKey='education' schema={educationSchema} title={item => item.universityName || 'Untitled School'} />
        </div>
    )
}

export default Education
