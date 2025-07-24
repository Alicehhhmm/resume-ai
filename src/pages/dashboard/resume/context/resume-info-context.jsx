import { createContext, useContext } from 'react'

export const ResumeInfoContext = createContext({})

export const useResumeInfo = () => {
    const context = useContext(ResumeInfoContext)
    if (!context) {
        throw new Error(
            `useResumeInfo must be used within a ResumeEditProvider. 
            Make sure your component is wrapped with <ResumeEditProvider>.`
        )
    }
    return context
}
