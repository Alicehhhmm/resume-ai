import { createContext, useContext, useMemo } from 'react'

const TemplateContext = createContext(null)

export const useTemplate = () => {
    const context = useContext(TemplateContext)

    if (!context) {
        throw new Error('useTemplate must be used within a TemplateProvider.')
    }

    return context
}

export function TemplateProvider({ value, children }) {
    const contextValue = useMemo(
        () => ({
            ...value,
        }),
        [value]
    )

    return <TemplateContext.Provider value={contextValue}>{children}</TemplateContext.Provider>
}
