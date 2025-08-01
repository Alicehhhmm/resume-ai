import React from 'react'
import { cn } from '@/lib/utils'

const EditorContext = React.createContext(null)

export const useEditor = () => {
    const context = React.useContext(EditorContext)

    if (!context) {
        throw new Error('useEditor must be used within a EditorProvider.')
    }

    return context
}

function EditorProvider({ value, className, style, children, ...props }) {
    // Editor left or right panel show and hide state
    const [panels, setPanels] = React.useState({
        leftHide: false,
        rightHide: true,
    })

    const contextValue = React.useMemo(
        () => ({
            panels,
            setPanels,
            ...value,
        }),
        [value, panels, setPanels]
    )

    return (
        <EditorContext.Provider value={contextValue}>
            <div
                className={cn(className)}
                style={{
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        </EditorContext.Provider>
    )
}

export default EditorProvider
