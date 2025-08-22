/** ---------------------------------------
 * |    Default Module Store constants    |
 * ----------------------------------------
 */

/**
 * Groups:
 * - Enabled Modules |已启用/正在使用的模块
 * - Available Modules | 可添加/尚未使用的模块
 */
export const MODULE_GROUPS = {
    ENABLED: 'enabled',
    AVAILABLE: 'available',
}

/**
 * Actions
 */
export const MODULE_ACTIONS = {
    ADDED: 'add',
    REMOVE: 'remove',
    RENAME: 'rename',
    TOGGLE_VISIBLE: 'toggle_visible',
    MOVE: 'move',
}

// Category Options
export const MODULE_CATEGORY_COLORS = {
    basic: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    experience: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    ability: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    qualification: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    achievement: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    custom: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}

export const MODULE_CATEGORY_NAMES = {
    basic: '基础信息',
    experience: '经历经验',
    background: '背景资料',
    ability: '能力技能',
    qualification: '资质认证',
    achievement: '成就荣誉',
    custom: '自定义',
}

export const SECTION_MODULES = [
    // Required sections
    {
        id: 1,
        name: 'Personal_Info',
        description: '个人基本信息',
        category: 'basic',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'profile-section',
        isEnabled: true,
    },
    {
        id: 2,
        name: 'Professional_Summary',
        description: '专业概述',
        category: 'basic',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'summary-section',
        isEnabled: true,
    },
    {
        id: 3,
        name: 'Education',
        description: '教育背景',
        category: 'background',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'education-section',
        isEnabled: true,
    },
    {
        id: 4,
        name: 'Work_Experience',
        description: '工作经历',
        category: 'experience',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'experience-section',
        isEnabled: true,
    },
    {
        id: 5,
        name: 'Projects',
        description: '项目经历',
        category: 'experience',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'projects-section',
        isEnabled: true,
    },
    {
        id: 6,
        name: 'Certifications',
        description: '证书认证',
        category: 'qualification',
        defaultLayout: 'sidebar',
        isCustom: false,
        sectionId: 'certifications-section',
        isEnabled: true,
    },
    {
        id: 7,
        name: 'Awards',
        description: '获奖荣誉',
        category: 'achievement',
        defaultLayout: 'sidebar',
        isCustom: false,
        sectionId: 'awards-section',
        isEnabled: true,
    },

    // Optional sections
    {
        id: 8,
        name: 'Skills',
        description: '技能专长',
        category: 'ability',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'skills-section',
        isEnabled: false,
    },
    {
        id: 9,
        name: 'Languages',
        description: '语言能力',
        category: 'ability',
        defaultLayout: 'sidebar',
        isCustom: false,
        sectionId: 'languages-section',
        isEnabled: false,
    },
    {
        id: 10,
        name: 'Publications',
        description: '发表作品',
        category: 'achievement',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'publications-section',
        isEnabled: false,
    },
    {
        id: 11,
        name: 'Interests',
        description: '兴趣爱好',
        category: 'personal',
        defaultLayout: 'sidebar',
        isCustom: false,
        sectionId: 'interests-section',
        isEnabled: false,
    },
    {
        id: 12,
        name: 'Volunteer_Experience',
        description: '志愿服务',
        category: 'experience',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'volunteer-section',
        isEnabled: false,
    },
    {
        id: 13,
        name: 'Internships',
        description: '实习经历',
        category: 'experience',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'internship-section',
        isEnabled: false,
    },
    {
        id: 14,
        name: 'Portfolio',
        description: '作品集',
        category: 'achievement',
        defaultLayout: 'main',
        isCustom: false,
        sectionId: 'portfolio-section',
        isEnabled: false,
    },
    {
        id: 15,
        name: 'References',
        description: '推荐人',
        category: 'background',
        defaultLayout: 'sidebar',
        isCustom: false,
        sectionId: 'references-section',
        isEnabled: false,
    },

    // Custom section
    {
        id: 16,
        name: 'Custom_Section',
        description: '自定义内容',
        category: 'custom',
        defaultLayout: 'main',
        isCustom: true,
        sectionId: 'custom-section',
        isEnabled: false,
    },
]
