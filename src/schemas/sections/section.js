import { z } from 'zod'

import { layoutSchema } from '../share'
import { educationSchema } from './education'
import { experienceSchema } from './experience'

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
        sectionId: z.literal('summary'),
        layout: layoutSchema.default('main'),
        contentx: z.string().default(''),
    }),
    education: sectionSchema.extend({
        sectionId: z.literal('education'),
        layout: layoutSchema.default('main'),
        items: z.array(educationSchema),
    }),
    experience: sectionSchema.extend({
        sectionId: z.literal('experience'),
        layout: layoutSchema.default('main'),
        items: z.array(experienceSchema),
    }),
})

export const defaultSections = {
    summary: { ...defaultSection, sectionId: 'summary', name: 'summary', layout: 'main', contentx: '' },
    education: { ...defaultSection, sectionId: 'education', name: 'education', layout: 'main', items: [] },
    experience: { ...defaultSection, sectionId: 'experience', name: 'experience', layout: 'main', items: [] },
}
