import { z } from 'zod'

import { defaultItem, linkSchemas, defaultLink } from '../share'

// schema
export const certificationSchema = z.object({
    title: z.string(),
    issuer: z.string(),
    validDate: z.string(),
    link: linkSchemas,
})

// default value
export const defaultCertification = {
    ...defaultItem,
    title: '',
    issuer: '',
    validDate: '',
    link: defaultLink,
}
