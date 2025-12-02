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

export const SECTION_MODULES_KEY = [
    /* === REQUIRED === */
    'profile',
    'summary',
    'education',
    'experience',
    'projects',
    'certifications',
    'awards',

    /* === OPTIONAL === */
    'skills',
    'interests',
    'volunteer',
    'internship',
    'portfolio',

    /* === CUSTOM === */
    'custom',
]
/**
 * 模块配置
 * ----------------
 *  @param {*} id 模块ID
 *  @param {*} name 模块名称
 *  @param {*} description 模块描述
 *  @param {*} category 模块分类
 *  @param {*} defaultLayout 模块默认布局
 *  @param {*} sectionId 模块对应sectionId
 *  @param {*} isCustom 判断是否为自定义模块
 *  @param {*} isEnabled 判断模块所在列表（true: 表示在已启用列表 enabledModules, false: 表示在可引用列表 availableModules）
 *  @param {*} isVisible 是否显示在编辑面板中
 *  @param {*} disabled 模块是否可编辑
 *  @param {*} items 子项列表
 */
export const SECTION_MODULES = [
    // Required sections
    {
        id: 'profile',
        name: 'Personal_Info',
        description: '个人基本信息',
        category: 'basic',
        defaultLayout: 'main',
        sectionId: 'section-profile',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'summary',
        name: 'Professional_Summary',
        description: '专业概述',
        category: 'basic',
        defaultLayout: 'main',
        sectionId: 'section-summary',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'education',
        name: 'Education',
        description: '教育背景',
        category: 'background',
        defaultLayout: 'main',
        sectionId: 'section-education',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'workExperience',
        name: 'Work_Experience',
        description: '工作经历',
        category: 'experience',
        defaultLayout: 'main',
        sectionId: 'section-experience',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'projects',
        name: 'Projects',
        description: '项目经历',
        category: 'experience',
        defaultLayout: 'main',
        sectionId: 'section-projects',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'certifications',
        name: 'Certifications',
        description: '证书认证',
        category: 'qualification',
        defaultLayout: 'sidebar',
        sectionId: 'section-certifications',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'awards',
        name: 'Awards',
        description: '获奖荣誉',
        category: 'achievement',
        defaultLayout: 'sidebar',
        sectionId: 'section-awards',
        isCustom: false,
        isEnabled: true,
        isVisible: true,
        disabled: false,
        items: [],
    },

    // Optional sections
    {
        id: 'skills',
        name: 'Skills',
        description: '技能专长',
        category: 'ability',
        defaultLayout: 'main',
        sectionId: 'section-skills',
        isCustom: false,
        isEnabled: false,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'interests',
        name: 'Interests',
        description: '兴趣爱好',
        category: 'personal',
        defaultLayout: 'sidebar',
        sectionId: 'section-interests',
        isCustom: false,
        isEnabled: false,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'volunteerExperience',
        name: 'Volunteer_Experience',
        description: '志愿服务',
        category: 'experience',
        defaultLayout: 'main',
        sectionId: 'section-volunteer',
        isCustom: false,
        isEnabled: false,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'internships',
        name: 'Internships',
        description: '实习经历',
        category: 'experience',
        defaultLayout: 'main',
        sectionId: 'section-internship',
        isCustom: false,
        isEnabled: false,
        isVisible: true,
        disabled: false,
        items: [],
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        description: '作品集',
        category: 'achievement',
        defaultLayout: 'main',
        sectionId: 'section-portfolio',
        isCustom: false,
        isEnabled: false,
        isVisible: true,
        disabled: false,
        items: [],
    },

    // Custom section
    {
        id: 'customSection',
        name: 'Custom_Section',
        description: '自定义内容',
        category: 'custom',
        defaultLayout: 'main',
        sectionId: 'section-custom',
        isCustom: true,
        isEnabled: false,
        isVisible: true,
        disabled: false,
        items: [],
    },
]
