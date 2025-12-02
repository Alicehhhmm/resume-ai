import { z } from 'zod'

export const linkTargets = ['_self', '_blank', '_parent', '_top']

// schemas

export const targetSchemas = z.enum(linkTargets)

export const linkSchemas = z.object({
    label: z.string().default(''),
    href: z.literal('').or(z.string().url()),
    target: targetSchemas.default('_self'),
})

export const linksSchemas = z.array(linkSchemas)

// default value

export const defaultLink = {
    label: '',
    href: '',
    target: '_self',
}
