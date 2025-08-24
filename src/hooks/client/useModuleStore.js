import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { SECTION_MODULES } from '@/constants/section-module'

/**------------------------------
 * |    Section Module Store   |
 * ------------------------------
 */
// No need for persistent state names
const unPersistMap = ['']

export const useModuleStore = create()(
    persist(
        immer((set, get) => ({
            // Initial state with default modules
            modules: SECTION_MODULES.reduce((acc, module) => {
                acc[module.id] = {
                    ...module,
                }
                return acc
            }, {}),

            // Initial state with default enabled-modules
            enabledModules: SECTION_MODULES.reduce((acc, module) => {
                if (module.isEnabled) {
                    acc[module.defaultLayout] = [...(acc[module.defaultLayout] || []), module.id]
                }
                return acc
            }, {}),

            // Initial state with default available-modules
            availableModules: SECTION_MODULES.reduce((acc, module) => {
                if (!module.isEnabled) {
                    acc[module.defaultLayout] = [...(acc[module.defaultLayout] || []), module.id]
                }
                return acc
            }, {}),

            // Update enabledModules based on current modules
            updateEnabledModules: updater =>
                set(state => {
                    if (typeof updater === 'function') {
                        state.enabledModules = updater(state.enabledModules)
                    } else {
                        state.enabledModules = { ...state.enabledModules, ...updater }
                    }
                }),

            // Update availableModules based on current modules
            updateAvailableModules: updater => {
                set(state => {
                    if (typeof updater === 'function') {
                        state.availableModules = updater(state.availableModules)
                    } else {
                        state.availableModules = { ...state.availableModules, ...updater }
                    }
                })
            },

            // Actions to manage modules
            addModule: module => {
                set(state => {
                    state.modules[module.id] = { ...module, isEnabled: false }
                })
            },

            removeModule: id => {
                set(state => {
                    delete state.modules[id]
                })
            },

            toggleModule: id => {
                set(state => {
                    if (state.modules[id]) {
                        state.modules[id].isEnabled = !state.modules[id].isEnabled
                    }
                })
            },

            renameModule: (id, newName) => {
                set(state => {
                    if (state.modules[id]) {
                        state.modules[id].name = newName
                    }
                })
            },

            moveModule: (id, newIndex) => {
                set(state => {
                    const module = state.modules[id]
                    if (module) {
                        delete state.modules[id]
                        const keys = Object.keys(state.modules)
                        keys.splice(newIndex, 0, id)
                        const newModules = {}
                        keys.forEach(key => {
                            newModules[key] = state.modules[key] || module
                        })
                        state.modules = newModules
                    }
                })
            },
        })),
        {
            name: 'section-module-storage',
            partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => ![...unPersistMap].includes(key))),
        }
    )
)

/**------------------------------
 * |    Custom Hook for Modules  |
 * ------------------------------
 */

/**
 *
 * @returns
 */
export const useSectionModules = () => {
    const state = useModuleStore(state => state)
    return {
        enabledModules: state.enabledModules,
        availableModules: state.availableModules,
    }
}
