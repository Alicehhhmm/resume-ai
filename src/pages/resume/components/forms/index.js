import { lazy } from 'react'
export { default as PlaceholderModule } from './Placeholder'
export { default as HeaderSetion } from './HeaderSetion'

// Lazy Loading Components
export const PersonalDetail = lazy(() => import('./PersonalDetail'))
export const Education = lazy(() => import('./Education'))
export const Experience = lazy(() => import('./Experience'))
export const Summary = lazy(() => import('./Summary'))
export const Projects = lazy(() => import('./Projects'))
export const Certifications = lazy(() => import('./Certifications'))
export const Award = lazy(() => import('./Award'))

export const Skills = lazy(() => import('./Skills'))
export const Interests = lazy(() => import('./Interests'))
export const internships = lazy(() => import('./internship'))
export const Volunteer = lazy(() => import('./Volunteer'))
export const Internship = lazy(() => import('./Internship'))
export const Portfolio = lazy(() => import('./Portfolio'))

export const Custom = lazy(() => import('./Custom'))

// Module Components

export const MODULE_COMPONENTS = {
    /* === REQUIRED === */
    'section-profile': PersonalDetail,
    'section-summary': Summary,
    'section-education': Education,
    'section-experience': Experience,
    'section-projects': Projects,
    'section-certifications': Certifications,
    'section-awards': Award,

    /* === OPTIONAL === */
    'section-skills': Skills,
    'section-interests': Interests,
    'section-volunteer': Volunteer,
    'section-internship': Internship,
    'section-internships': internships,
    'section-portfolio': Portfolio,

    /* === CUSTOM === */
    'section-custom': Custom,
}
