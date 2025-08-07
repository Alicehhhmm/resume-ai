import { v4 as uuidv4 } from 'uuid'

import { SimpleResume, DefaultResume } from '@/pages/template'

const uuid = uuidv4()

export const templateMap = {
    default: {
        resumeId: uuid,
        title: 'Default Template',
        category: 'default',
        thumbnail: '',
        component: DefaultResume,
        description: 'Classic layout with complete information presentation',
    },
    simple: {
        resumeId: uuid,
        title: 'Simple Style',
        category: 'simple',
        thumbnail: '',
        component: SimpleResume,
        description: 'Minimalist layout, highlighting core content',
    },
}
