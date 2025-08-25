import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getDefaultAppState } from '@/pages/editor/appState'

const STORAGE_KEY = 'editor-app-state'

// 定义需要持久化的字段
const PERSISTENCE_CONFIG = {
    panels: ['leftHide', 'rightHide'],
    boardMode: ['viewprotMargin', 'isWheelPanning', 'cursorMode', 'rolueMode'],
    pageMode: ['layout', 'pageGap', 'showPageNumber', 'pageBreak'],
    meshPanel: ['show', 'size', 'opacity', 'model', 'color', 'unit'],
}

export const useEditorAppState = create()(
    persist(
        immer((set, get) => ({
            ...getDefaultAppState(),

            // 通用更新方法
            updateState: (category, updates) =>
                set(state => {
                    const current = state[category]
                    const applied = typeof updates === 'function' ? updates(current) : updates
                    state[category] = { ...current, ...applied }
                }),

            // 便捷更新方法
            updatePanels: updates => get().updateState('panels', updates),
            updateBoardMode: updates => get().updateState('boardMode', updates),
            updatePageMode: updates => get().updateState('pageMode', updates),
            updateMeshPanel: updates => get().updateState('meshPanel', updates),

            // 重置状态
            resetState: (categories = []) =>
                set(state => {
                    const defaults = getDefaultAppState()
                    if (categories?.length) {
                        categories.forEach(cat => {
                            state[cat] = { ...defaults[cat] }
                        })
                    } else {
                        Object.keys(defaults).forEach(cat => {
                            state[cat] = { ...defaults[cat] }
                        })
                    }
                }),

            // 清除持久化数据
            clearPersistedData: () => {
                localStorage.removeItem(STORAGE_KEY)
                get().resetState()
            },

            // 兼容原有的 setter 方法
            setPanels: updates => get().updatePanels(updates),
            setBoardMode: updates => get().updateBoardMode(updates),
            setPageMode: updates => get().updatePageMode(updates),
            setMeshPanel: updates => get().updateMeshPanel(updates),
        })),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),

            // 只持久化指定的字段
            partialize: state => {
                return Object.keys(PERSISTENCE_CONFIG).reduce((acc, category) => {
                    const fields = PERSISTENCE_CONFIG[category]

                    acc[category] = fields.reduce((obj, field) => {
                        if (state[category]?.[field] !== undefined) obj[field] = state[category][field]
                        return obj
                    }, {})
                    return acc
                }, {})
            },

            // 合并持久化数据时的处理
            merge: (persistedState, currentState) => {
                return {
                    ...currentState,
                    ...Object.keys(persistedState).reduce((acc, category) => {
                        if (currentState[category]) {
                            acc[category] = { ...currentState[category], ...persistedState[category] }
                        }
                        return acc
                    }, {}),
                }
            },
        }
    )
)
