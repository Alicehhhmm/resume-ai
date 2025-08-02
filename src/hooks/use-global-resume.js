import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// initialize template states
const initTemplate = {
    category: 'default',
}

// No need for persistent state names
const unPersistMap = ['']

const useGlobalResume = create()(
    persist(
        (set, get) => ({
            selectTemplate: null,

            setSelectTemplate: template => set({ selectTemplate: template }),
        }),
        {
            name: 'resume-ai-storage',
            partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => ![...unPersistMap].includes(key))),
        }
    )
)

export default useGlobalResume
