import { z } from 'zod'
import { customSchema } from '../share'

// schema

export const basicsSchema = z.object({
    name: z.string(),
    email: z.literal('').or(z.string().email()),
    phone: z.string(),
    address: z.string(),
    jobTitle: z.string(),
    avatarUrl: z.string(),
    dob: z.string(),
    website: z.string(),
    customFields: z.array(customSchema),
})

// default value

export const defaultBasics = {
    name: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    avatarUrl: '',
    dob: '',
    website: '',
    customFields: [],
}

export const defaultSectionBasics = {
    id: 'profile',
    sectionId: 'section-profile',
    description: 'Personal Info',
    category: 'basic',
    defaultLayout: 'main',
    name: 'personalInfo',
    isEnabled: true,
    isCustom: false,
    visible: true,
    disabled: false,
}
