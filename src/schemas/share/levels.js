import { z } from 'zod'

// Default vaule

export const levelCategory = ['learn', 'technical']

//  learning proficiency levels — from low to high -(了解 → 熟悉 → 掌握 → 熟练 → 精通 )、
export const learnLevels = {
    1: 'aware',
    2: 'familiar',
    3: 'competent',
    4: 'proficient',
    5: 'expert',
}

// Technical proficiency levels - (入门 → 初级 → 中级 → 高级 → 资深 → 专家)
export const technicalLevels = {
    1: 'beginner',
    2: 'junior',
    3: 'intermediate',
    4: 'senior',
    5: 'advanced',
    6: 'master',
}

export const LEVEL_SYSTEMS = {
    learn: { max: 5, labels: learnLevels },
    technical: { max: 6, labels: technicalLevels },
}

// Schema

export const levelCategorySchema = z.enum(levelCategory)

export const levelSchema = z.number().int().min(1)
