import React, { createContext, useContext } from 'react'

export const ResumeEditContext = createContext({})

export const useResumeEdit = () => {
    const context = useContext(ResumeEditContext)
    if (!context) {
        throw new Error(
            `useResumeEdit must be used within a ResumeEditProvider. 
            Make sure your component is wrapped with <ResumeEditProvider>.`
        )
    }
    return context
}

export function ResumeEditProvider({ value, children }) {
    const contextValue = React.useMemo(
        () => ({
            ...value,
        }),
        [value]
    )

    return <ResumeEditContext.Provider value={contextValue}>{children}</ResumeEditContext.Provider>
}
