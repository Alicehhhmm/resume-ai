import { z } from 'zod'

import { defaultItem, linkSchemas, defaultLink } from '../share'

// schema
export const projectsSchema = z.object({
    projectName: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    link: linkSchemas,
    description: z.string(),
    summary: z.string(),
})

// default value
export const defaultProjects = {
    ...defaultItem,
    projectName: '',
    position: '',
    startDate: '',
    endDate: '',
    link: defaultLink,
    description: '',
    summary: '',
}
