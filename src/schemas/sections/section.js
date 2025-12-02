import { z } from 'zod'

import { layoutSchema } from '../share'
/* === REQUIRED === */
import { educationSchema } from './education'
import { experienceSchema } from './experience'
import { projectsSchema } from './projects'
import { certificationSchema } from './certifications'
import { awardSchema } from './awards'
/* === OPTIONAL === */
import { skillSchema } from './skills'

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
    projects: sectionSchema.extend({
        sectionId: z.literal('projects'),
        layout: layoutSchema.default('main'),
        items: z.array(projectsSchema),
    }),
    certifications: sectionSchema.extend({
        sectionId: z.literal('certifications'),
        layout: layoutSchema.default('sidebar'),
        items: z.array(certificationSchema),
    }),
    awards: sectionSchema.extend({
        sectionId: z.literal('awards'),
        layout: layoutSchema.default('sidebar'),
        items: z.array(awardSchema),
    }),
    skills: sectionSchema.extend({
        sectionId: z.literal('skills'),
        layout: layoutSchema.default('main'),
        items: z.array(skillSchema),
    }),
})

// default value

export const defaultSections = {
    summary: { ...defaultSection, sectionId: 'summary', name: 'summary', layout: 'main', contentx: '' },
    education: { ...defaultSection, sectionId: 'education', name: 'education', layout: 'main', items: [] },
    experience: { ...defaultSection, sectionId: 'experience', name: 'experience', layout: 'main', items: [] },
    projects: { ...defaultSection, sectionId: 'projects', name: 'projects', layout: 'main', items: [] },
    certifications: { ...defaultSection, sectionId: 'certifications', name: 'certifications', layout: 'sidebar', items: [] },
    awards: { ...defaultSection, sectionId: 'awards', name: 'awards', layout: 'sidebar', items: [] },
    skills: { ...defaultSection, sectionId: 'skills', name: 'skills', layout: 'main', items: [] },
}
