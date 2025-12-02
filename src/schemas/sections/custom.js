import { z } from 'zod'

import { itemSchema, defaultItem, linkSchemas, defaultLink } from '../share'

// schema
export const customSchema = itemSchema.extend({
    title: z.string(),
    startDateStr: z.string(),
    endDateStr: z.string(),
    link: linkSchemas,
    description: z.string(),
    summary: z.string(),
})

// default value
export const defaultCustom = {
    ...defaultItem,
    title: '',
    startDateStr: '',
    endDateStr: '',
    link: defaultLink,
    description: '',
    summary: '',
}
