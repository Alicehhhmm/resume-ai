import { z } from 'zod'

import { defaultItem, linkSchemas, defaultLink } from '../share'

// schema
export const portfolioSchema = z.object({
    title: z.string(),
    publisher: z.string(),
    date: z.string(),
    link: linkSchemas,
    description: z.string(),
})

// default value
export const defaultPortfolio = {
    ...defaultItem,
    title: '',
    publisher: '',
    date: '',
    link: defaultLink,
    description: '',
}
