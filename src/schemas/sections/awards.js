import { z } from 'zod'

import { defaultItem } from '../share'

// schema
export const awardSchema = z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    description: z.string(),
})

// default value
export const defaultAward = {
    ...defaultItem,
    title: '',
    issuer: '',
    date: '',
    description: '',
}
