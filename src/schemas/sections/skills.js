import { z } from 'zod'

import { defaultItem } from '../share'

// schema

export const skillSchema = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(6),
    ratio: z.number().min(0).max(100).default(0),
    description: z.string().optional(),
})

// default value
export const defaultSkill = {
    ...defaultItem,
    name: '',
    level: 1,
    ratio: 0,
    description: '',
}
