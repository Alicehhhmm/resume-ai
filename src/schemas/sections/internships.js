import { z } from 'zod'

import { defaultItem } from '../share'

// schema
export const internshipSchema = z.object({
    companyname: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
})

// default value
export const defaultInternship = {
    ...defaultItem,
    companyname: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
}
