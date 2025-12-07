import { z } from 'zod'
import { defaultItem } from '../share'

// schema
export const interestSchema = z.object({
    name: z.string(),
})

// default value
export const defaultInterest = {
    ...defaultItem,
    name: '',
}
