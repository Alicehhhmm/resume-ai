import { z } from 'zod'
import { uidSchema } from './uuid'

// schema

export const itemSchema = z.object({
    id: uidSchema,
    visible: z.boolean().default(true),
    disabled: z.boolean().default(false),
})

// default value

export const defaultItem = {
    id: '',
    visible: true,
    disabled: false,
}
