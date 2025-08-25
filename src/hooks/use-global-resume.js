import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const STORAGE_KEY = 'resume-ai-storage'

// No need for persistent state names
const unPersistMap = ['']

const useGlobalResume = create()(
    persist(
        (set, get) => ({
            selectTemplate: null,

            setSelectTemplate: template => {
                const { selectTemplate } = get()

                set({
                    selectTemplate: { ...selectTemplate, ...template },
                })
            },
        }),
        {
            name: STORAGE_KEY,
            partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => ![...unPersistMap].includes(key))),
        }
    )
)

export default useGlobalResume
