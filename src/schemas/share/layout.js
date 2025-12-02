import { z } from 'zod'

// schema

export const layoutSchema = z.enum(['main', 'sidebar'])

// default value

export const defaultLayout = layoutSchema.default('main')
