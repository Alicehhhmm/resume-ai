import { z } from 'zod'

import { defaultItem } from '../share'

// schema

const baseSkillSchema = z.object({
    name: z.string(),
    ratio: z.number().min(0).max(100).default(0),
    description: z.string().optional(),
})

export const skillSchema = z.discriminatedUnion('category', [
    baseSkillSchema.extend({
        category: z.literal('technical'),
        level: z.number().int().min(1).max(6),
    }),
    baseSkillSchema.extend({
        category: z.literal('learn'),
        level: z.number().int().min(1).max(5),
    }),
])

// default value
export const defaultSkills = {
    ...defaultItem,
    name: '',
    category: 'technical',
    level: 1,
    ratio: 0,
    description: '',
}
