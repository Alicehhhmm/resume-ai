import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

/**
 * useDialog
 * ----------
 *
 * @param {string} mode - 对话框模式
 * - create | update | delete | info
 * @param {boolean} isOpen - 对话框状态（default: false）
 * @param {object} options - 对话框选项
 * @param {function} onOpen - 打开对话框
 * @param {function} onClose - 关闭对话框
 *
 */
export const useDialog = create()(
    immer((set, get) => ({
        mode: null,
        isOpen: false,
        options: {},

        onOpen: (mode, options = {}) => {
            set(state => {
                state.isOpen = true
                state.mode = mode
                state.options = options
            })
        },
        onClose: () => {
            set({
                isOpen: false,
                mode: null,
                options: {},
            })
        },
        targetDialog: modeKey => {
            const { isOpen, mode } = get()
            return isOpen && mode === modeKey
        },
    }))
)
