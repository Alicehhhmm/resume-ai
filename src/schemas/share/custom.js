import { z } from 'zod'
import { idSchema } from './uuid'

// schema

export const customSchema = z.object({
    id: idSchema,
    label: z.string(),
    value: z.string(),
})

// default value

export const defaultCustom = {
    id: '',
    label: '',
    value: '',
}
