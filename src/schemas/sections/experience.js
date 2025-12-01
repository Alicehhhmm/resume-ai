import { z } from 'zod'

import { defaultItem } from '../share'

// schema
export const experienceSchema = z.object({
    companyName: z.string(),
    position: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string(),
})

// default value
export const defaultExperience = {
    ...defaultItem,
    companyName: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    summary: '',
}
