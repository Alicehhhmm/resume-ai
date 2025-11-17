import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { set as _set } from 'lodash-es'

import { debouncedUpdateResume } from '@/services/resume'

export const useResumeStore = create()(
    immer(set => ({
        resume: {},
        setValue: (path, value) => {
            set(state => {
                state.resume.data = _set(state.resume.data, path, value)

                const updateData = JSON.parse(JSON.stringify(state.resume))
                void debouncedUpdateResume(updateData)
            })
        },
    }))
)
