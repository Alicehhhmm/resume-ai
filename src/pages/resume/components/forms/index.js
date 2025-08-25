import { lazy } from 'react'

// Lazy Loading Components
export const PersonalDetail = lazy(() => import('./PersonalDetail'))
export const Education = lazy(() => import('./Education'))
export const Experience = lazy(() => import('./Experience'))
export const Skills = lazy(() => import('./Skills'))
export const Summary = lazy(() => import('./Summary'))

// Module Components

export const MODULE_COMPONENTS = {
    /* === REQUIRED === */
    'section-profile': PersonalDetail,
    'section-summary': Summary,
    'section-education': Education,
    'section-experience': Experience,
    'section-projects': '',
    'section-certifications': '',
    'section-awards': '',

    /* === OPTIONAL === */
    'section-skills': Skills,
    'section-languages': '',
    'section-publications': '',
    'section-interests': '',
    'section-volunteer': '',
    'section-internship': '',
    'section-portfolio': '',
    'section-references': '',

    /* === CUSTOM === */
    'section-custom': '',
}
