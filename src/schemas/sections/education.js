import { z } from 'zod'

import { defaultItem } from '../share'

// schema
export const educationSchema = z.object({
    universityName: z.string(),
    degree: z.string(),
    major: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
})

// default value
export const defaultEducation = {
    ...defaultItem,
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
}
