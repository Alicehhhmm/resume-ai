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

    // DrawingBoard mode
    const [boardMode, setBoardMode] = React.useState({
        viewportRef: null,
        viewprotMargin: 30,
        reservedSpace: { top: 0, right: 0, bottom: 0, left: 0 },
        isOngoingTransfromed: false, // false: enable CenterOnResize
        isWheelPanning: true,
        cursorMode: 'default',
        boardMode: false,
    })

    // Page elements mode
    const [pageMode, setPageMode] = React.useState({
        pageLayoutRef: null,
        layout: 'multi', // 'single' | 'multi'
        pageCount: 1,
        pageGap: 40,
        pageSize: { width: 794, height: 1123 },
        showPageNumber: false,
        pageBreak: {
            show: false,
            type: 'dashed', // 'solid' | 'dashed' | 'custom'
            color: '#a1a1a1',
            thickness: 1,
        },
        position: {
            x: 0,
            y: 0,
            scale: 1,
        },
    })

    // DrawingBoard bg mesh mode
    const [meshPanel, setMeshPanel] = React.useState({
        show: false,
        size: 'sm',
        opacity: 0.5,
        model: 'lines',
        color: 'gray',
        unit: 10, // md: 20px
    })

    const contextValue = React.useMemo(
        () => ({
            panels,
            setPanels,
            boardMode,
            setBoardMode,
            pageMode,
            setPageMode,
            meshPanel,
            setMeshPanel,
            ...value,
        }),
        [value, panels, boardMode, pageMode, meshPanel]
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
