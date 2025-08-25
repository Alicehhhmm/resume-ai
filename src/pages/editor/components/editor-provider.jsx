import React from 'react'
import { cn } from '@/lib/utils'
import { useEditorAppState } from '../hooks/useEditorAppState'

const EditorContext = React.createContext(null)

export const useEditor = () => {
    const context = React.useContext(EditorContext)

    if (!context) {
        throw new Error('useEditor must be used within a EditorProvider.')
    }

    return context
}

function EditorProvider({ value, className, style, children, ...props }) {
    const store = useEditorAppState()

    const contextValue = React.useMemo(
        () => ({
            // States
            panels: store.panels,
            boardMode: store.boardMode,
            pageMode: store.pageMode,
            meshPanel: store.meshPanel,

            // Update methods
            updateState: store.updateState,
            updatePanels: store.updatePanels,
            updateBoardMode: store.updateBoardMode,
            updatePageMode: store.updatePageMode,
            updateMeshPanel: store.updateMeshPanel,

            // Utility methods
            resetState: store.resetState,
            clearPersistedData: store.clearPersistedData,

            // Compatibility methods
            setPanels: store.setPanels,
            setBoardMode: store.setBoardMode,
            setPageMode: store.setPageMode,
            setMeshPanel: store.setMeshPanel,

            ...value,
        }),
        [store, value]
    )

    return (
        <EditorContext.Provider value={contextValue}>
            <div className={cn(className)} style={style} {...props}>
                {children}
            </div>
        </EditorContext.Provider>
    )
}

export default EditorProvider
