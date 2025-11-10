import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { set as _set, get as _get } from 'lodash-es'

export const useResumeStore = create()(
    immer((set, get) => ({
        resume: {},
        setValue: (path, value) => {
            set(state => {
                state.resume.data = _set(state.resume.data, path, value)
            })
        },
    }))
)
