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

    // Reusme Page layout
    const [layoutMode, setLayoutMode] = React.useState('multi')

    // DrawingBoard Cursors mode
    const [cursorMode, setCursorMode] = React.useState('default')

    // DrawingBoard panning mode
    const [panMode, setPanMode] = React.useState(false)

    // DrawingBoard rolue mode
    const [rolueMode, setRolueMode] = React.useState(false)

    // DrawingBoard bg mesh mode
    const [meshPanel, setMeshPanel] = React.useState({
        show: false,
        size: 'md',
        opacity: 0.5,
        model: 'lines',
        color: 'gray',
    })

    const contextValue = React.useMemo(
        () => ({
            panels,
            setPanels,
            layoutMode,
            setLayoutMode,
            cursorMode,
            setCursorMode,
            panMode,
            setPanMode,
            rolueMode,
            setRolueMode,
            meshPanel,
            setMeshPanel,
            ...value,
        }),
        [value, panels, layoutMode, cursorMode, panMode, rolueMode, meshPanel]
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
