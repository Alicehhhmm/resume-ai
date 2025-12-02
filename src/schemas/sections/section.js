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
import { interestSchema } from './interests'
import { volunteerSchema } from './volunteer'
import { internshipSchema } from './internships'
import { portfolioSchema } from './portfolio'

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
    interests: sectionSchema.extend({
        sectionId: z.literal('interests'),
        layout: layoutSchema.default('sidebar'),
        items: z.array(interestSchema),
    }),
    volunteer: sectionSchema.extend({
        sectionId: z.literal('volunteer'),
        layout: layoutSchema.default('main'),
        items: z.array(volunteerSchema),
    }),
    internships: sectionSchema.extend({
        sectionId: z.literal('internships'),
        layout: layoutSchema.default('main'),
        items: z.array(internshipSchema),
    }),
    portfolio: sectionSchema.extend({
        sectionId: z.literal('portfolio'),
        layout: layoutSchema.default('main'),
        items: z.array(portfolioSchema),
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
    interests: { ...defaultSection, sectionId: 'interests', name: 'interests', layout: 'sidebar', items: [] },
    volunteer: { ...defaultSection, sectionId: 'volunteer', name: 'volunteer', layout: 'main', items: [] },
    internships: { ...defaultSection, sectionId: 'internships', name: 'internships', layout: 'main', items: [] },
    portfolio: { ...defaultSection, sectionId: 'portfolio', name: 'portfolio', layout: 'main', items: [] },
}
