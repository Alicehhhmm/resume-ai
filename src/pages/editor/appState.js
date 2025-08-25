/**
 * editor default initialize state
 */
export const getDefaultAppState = () => ({
    panels: {
        leftHide: false,
        rightHide: true,
    },
    boardMode: {
        viewprotMargin: 30,
        reservedSpace: { top: 0, right: 0, bottom: 0, left: 0 },
        isOngoingTransfromed: false, // false: enable CenterOnResize
        isWheelPanning: true,
        cursorMode: 'default',
        rolueMode: false,
    },
    pageMode: {
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
    },
    meshPanel: {
        show: false,
        size: 'sm',
        opacity: 0.5,
        model: 'lines',
        color: 'gray',
        unit: 10, // md: 20px
    },
})
