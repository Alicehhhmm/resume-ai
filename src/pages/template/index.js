export * from './template-skeleton'
export * from './tempalet-provider'

import { SimpleResume } from './simple'
import { DefaultResume } from './standard'
import { ResumeSkeleton } from './template-skeleton'

export { SimpleResume, DefaultResume, ResumeSkeleton }

export const getTemplate = category => {
    switch (category) {
        case 'simple':
            return SimpleResume
        default:
            return DefaultResume
    }
}
