import { create } from 'zustand'

export const useArtboardStore = create()((set, get) => ({
    resume: null,
    setResume: resume => {
        set({ resume })
    },
}))
