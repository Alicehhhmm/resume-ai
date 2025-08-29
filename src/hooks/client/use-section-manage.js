import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SECTION_MODULES } from '@/constants/section-module'

/**
 * modules that can only be in the main section
 */
const MAIN_ONLY_MODULES = [
    'summary',
    'education',
    'workExperience',
    'projects',
    'volunteerExperience',
    'internships',
    'portfolio',
    'publications',
    'customSection',
]

function initState(modules = SECTION_MODULES) {
    const registry = {}
    const initEnabled = []
    const initAvailable = []

    modules.forEach(module => {
        registry[module.id] = module
        if (module.isEnabled) {
            initEnabled.push(module.id)
        } else {
            initAvailable.push(module.id)
        }
    })

    return { registry, initEnabled, initAvailable }
}

const { registry, initEnabled, initAvailable } = initState() // 防止首次渲染时，声明的变量为空值

export const useSectionManage = create()(
    persist(
        (set, get) => ({
            modules: { ...registry },
            enabledModuleIds: [...initEnabled],
            availableModuleIds: [...initAvailable],
            initialized: false,

            init() {
                const { modules, initialized } = get()
                if (initialized) return

                const hasData = Object.keys(modules).length > 0
                if (!hasData) {
                    const { registry, initEnabled, initAvailable } = initState()
                    set({ modules: registry, enabledModuleIds: initEnabled, availableModuleIds: initAvailable })
                }
                set({ initialized: true })
            },
            canMoveToSidebar: id => !MAIN_ONLY_MODULES.includes(id),

            // Getter action
            getEnabledModules: () => {
                const { modules, enabledModuleIds } = get()
                return enabledModuleIds.map(id => modules[id]).filter(Boolean)
            },
            getAvailableModules: () => {
                const { modules, availableModuleIds } = get()
                return availableModuleIds.map(id => modules[id]).filter(Boolean)
            },

            // server action

            loadFromServer: async () => {
                // TODO: load state from server
            },
            saveToServer: async () => {
                // TODO: update state to server
            },

            // enabled module actions

            pushToEnabled(moduleId) {
                const { modules, enabledModuleIds, availableModuleIds } = get()
                const module = modules[moduleId]
                if (!module) return

                let newModules = { ...modules }
                newModules[moduleId] = { ...module, isEnabled: true }

                set({
                    modules: newModules,
                    enabledModuleIds: [...enabledModuleIds, moduleId],
                    availableModuleIds: availableModuleIds.filter(i => i !== moduleId),
                })

                // get().saveToServer()
            },

            disable(id) {
                // get().saveToServer()
            },

            toggle(id) {
                // get().saveToServer()
            },

            reorder(newIds) {
                set({ enabledModuleIds: [...newIds] })
                // get().saveToServer()
            },

            // custom module actions
            customToEnabled() {
                // get().saveToServer()
            },
        }),
        {
            name: 'resume-ai-modules',
            partialize: ({ modules, enabledModuleIds, availableModuleIds, initialized }) => ({
                modules,
                enabledModuleIds,
                availableModuleIds,
                initialized,
            }),
        }
    )
)
