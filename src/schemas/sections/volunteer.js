import { z } from 'zod'

import { defaultItem } from '../share'

// schema
export const volunteerSchema = z.object({
    organization: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
})

// default value
export const defaultVolunteer = {
    ...defaultItem,
    organization: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
}
