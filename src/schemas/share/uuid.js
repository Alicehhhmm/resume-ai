import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

// schema
export const uidSchema = z.string().uuid().default(uuidv4())

export const idSchema = z.string().uuid()

export const sectionIdSchema = z.string().trim().min(1, 'sectionId must be a non-empty string')

// default value

export const defaultCustomId = 'custom-' + uuidv4()
