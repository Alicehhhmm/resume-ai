import { z } from 'zod'

import { educationSchema } from './education'

// 1.section

export const sectionSchema = z.object({
    name: z.string(),
    visible: z.boolean().default(true),
    disabled: z.boolean().default(false),
})

export const defaultSection = {
    name: '',
    visible: true,
    disabled: false,
}

// 2.sections
export const sectionsSchema = z.object({
    summary: sectionSchema.extend({
        id: z.literal('summary'),
        contentx: z.string().default(''),
    }),
    education: sectionSchema.extend({
        id: z.literal('education'),
        items: z.array(educationSchema),
    }),
})

export const defaultSections = {
    summary: { ...defaultSection, id: 'summary', name: 'summary', contentx: '' },
    education: { ...defaultSection, id: 'education', name: 'education', items: [] },
}
