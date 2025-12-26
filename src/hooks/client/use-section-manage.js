import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { set as _set } from 'lodash-es'

import { defaultOnlyMain, defaultSections, defaultSectionBasics } from '@/schemas'

export const useSectionManage = create()(
    immer((set, get) => ({
        basics: defaultSectionBasics,
        modules: {},
        enabledModuleIds: [],
        availableModuleIds: [],

        setModules: modules => {
            const registry = {}
            const enabled = []
            const available = []

            modules.forEach(m => {
                registry[m.id] = m
                m.isEnabled ? enabled.push(m.id) : available.push(m.id)
            })

            set(state => {
                state.modules = registry
                state.enabledModuleIds = enabled
                state.availableModuleIds = available
            })
        },

        // Getter action

        getModuleById: id => {
            return get().modules[id]
        },
        getEnabledModules: () => {
            const { modules, enabledModuleIds } = get()
            return enabledModuleIds.map(id => modules[id]).filter(Boolean)
        },
        getAvailableModules: () => {
            const { modules, availableModuleIds } = get()
            return availableModuleIds.map(id => modules[id]).filter(Boolean)
        },

        // enabled module actions
        canMoveToSidebar: id => !defaultOnlyMain.includes(id),

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
        },
        remove(moduleId) {
            const { modules, enabledModuleIds, availableModuleIds, getModuleById } = get()
            const removeModule = getModuleById(moduleId)
            const newModules = { ...modules }

            if (!removeModule) return

            if (removeModule.isCustom) {
                delete newModules[moduleId]

                set({
                    modules: newModules,
                    enabledModuleIds: enabledModuleIds.filter(i => i !== moduleId),
                })
            } else {
                newModules[moduleId] = { ...removeModule, isEnabled: false }

                set({
                    modules: newModules,
                    enabledModuleIds: enabledModuleIds.filter(i => i !== moduleId),
                    availableModuleIds: [moduleId, ...availableModuleIds],
                })
            }
        },
        reorder(newIds) {
            set({ enabledModuleIds: [...newIds] })
        },

        // custom module actions

        create(module) {
            const { modules, enabledModuleIds } = get()
            const newModule = { ...module, isEnabled: true }

            set({
                modules: { ...modules, [newModule.id]: newModule },
                enabledModuleIds: [...enabledModuleIds, newModule.id],
            })
        },
    }))
)

export const sectionsToModulesUi = (sections, builtinModules = defaultSections) => {
    if (!sections || Object.keys(sections).length === 0) return []

    const result = []
    const enabledModuleIds = new Set()

    /* ----------------------------------
     * 1. 已启用模块（服务端数据：resume.sections）
     * ---------------------------------- */

    for (const sectionId in sections) {
        const section = sections[sectionId]
        const moduleId = sectionId.startsWith('section-') ? sectionId.replace('section-', '') : sectionId

        enabledModuleIds.add(sectionId)

        result.push({
            id: moduleId,
            sectionId: `section-${sectionId}`,
            name: section.name ?? '',
            category: section.category ?? 'experience',
            defaultLayout: section.layout ?? 'main',
            isEnabled: true,
            isCustom: sectionId.startsWith('custom'),
            visible: section.visible ?? true,
            disabled: section.disabled ?? false,
        })
    }

    /* ----------------------------------
     * 2. 补全未启用的内置模块
     * ---------------------------------- */

    for (const key in builtinModules) {
        const module = builtinModules[key]
        const sectionId = module.sectionId ?? key

        if (enabledModuleIds.has(sectionId)) continue

        result.push({
            id: key,
            sectionId: `section-${sectionId}`,
            name: module.name ?? sectionId.startsWith('custom') ? 'Custom' : 'UntiledSection',
            category: module.category ?? 'experience',
            defaultLayout: module.layout ?? 'main',
            isEnabled: false,
            isCustom: sectionId.startsWith('custom'),
            visible: module.visible ?? true,
            disabled: module.disabled ?? false,
        })
    }

    return result
}
