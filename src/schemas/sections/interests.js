import { z } from 'zod'

// schema
export const interestSchema = z.object({
    name: z.string(),
})

// default value
export const defaultInterest = {
    id: '',
    name: '',
}
