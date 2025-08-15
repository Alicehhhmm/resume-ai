import { useControls } from 'react-zoom-pan-pinch'
import {
    ZoomIn,
    ZoomOut,
    RefreshCcw,
    StickyNote,
    Columns2,
    Move,
    MousePointer2,
    RulerDimensionLine,
    Expand,
    Shrink,
    Grid3x3,
    FlipHorizontal,
} from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import { ToolButton } from '@/components/common'
import { useEditor } from '@/pages/editor/components'

import { useTransformLang } from '@/hooks'
import { PAGE_MIN_SCALE, PAGE_MAX_SCALE } from '@/pages/editor/constants'

export function Toolbar() {
    // hooks

    const { t } = useTransformLang()
    const { zoomIn, zoomOut, resetTransform, centerView, ...rest } = useControls()
    const {
        boardMode,
        setBoardMode,
        panels,
        setPanels,
        pageMode,
        setPageMode,
        cursorMode,
        setCursorMode,
        rolueMode,
        setRolueMode,
        meshPanel,
        setMeshPanel,
    } = useEditor()

    // States

    const isAllHidden = panels.leftHide && panels.rightHide
    const isSinglePage = pageMode.layout === 'single'

    // Method

    const centerOnViewport = () => {
        setBoardMode(prev => ({
            ...prev,
            isOngoingTransfromed: false,
        }))
    }

    const onHandleReset = () => {
        resetTransform()
    }

    return (
        <div className='h-10 absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center z-50 px-4 py-1 gap-1 rounded-2xl bg-background shadow-sm backdrop-blur-md'>
            <ToolButton
                tooltip={cursorMode === 'move' ? t('move') : t('default')}
                onClick={() => setCursorMode(cursorMode != 'move' ? 'move' : 'default')}
            >
                {cursorMode === 'move' ? <Move className='size-3.5' /> : <MousePointer2 className='size-3.5' />}
            </ToolButton>

            <ToolButton tooltip={t('reset') + ' (Ctrl + R)'} onClick={onHandleReset}>
                <RefreshCcw className='size-3.5' />
            </ToolButton>

            <ToolButton
                disabled={!boardMode.isOngoingTransfromed}
                tooltip={t('adaptiveCenter') + ' (Ctrl + R)'}
                onClick={() => centerOnViewport()}
            >
                <FlipHorizontal className='size-3.5' />
            </ToolButton>

            <ToolButton tooltip={t('ruler')} active={rolueMode} onClick={() => setRolueMode(!rolueMode)}>
                <RulerDimensionLine className='size-3.5' />
            </ToolButton>

            <ToolButton
                tooltip={meshPanel.show ? t('hidMesh') : t('showMesh')}
                active={meshPanel.show}
                onClick={() => setMeshPanel(pre => ({ ...pre, show: !meshPanel.show }))}
            >
                <Grid3x3 className='size-3.5' />
            </ToolButton>

            <ToolButton
                tooltip={isAllHidden ? t('showSidebarPanel') : t('hidSidebarPanel')}
                onClick={() => {
                    if (isAllHidden) {
                        setPanels({ leftHide: false, rightHide: false })
                    } else {
                        setPanels({ leftHide: true, rightHide: true })
                    }
                }}
            >
                {!isAllHidden ? <Expand className='size-3.5' /> : <Shrink className='size-3.5' />}
            </ToolButton>

            <ToolButton
                disabled={pageMode.pageCount <= 1}
                tooltip={isSinglePage ? t('multiPage') : t('singlePage')}
                onClick={() => setPageMode(pre => ({ ...pre, layout: isSinglePage ? 'multi' : 'single' }))}
            >
                {isSinglePage ? <Columns2 className='size-3.5' /> : <StickyNote className='size-3.5' />}
            </ToolButton>

            <Separator orientation='vertical' className='h-10' />

            <ToolButton
                disabled={pageMode.position.scale === PAGE_MAX_SCALE}
                tooltip={t('ZoomIn') + ' (Ctrl +)'}
                onClick={() => zoomIn(0.2)}
            >
                <ZoomIn className='size-3.5' />
            </ToolButton>
            <ToolButton
                disabled={pageMode.position.scale === PAGE_MIN_SCALE}
                tooltip={t('zoomOut') + ' (Ctrl -)'}
                onClick={() => zoomOut(0.2)}
            >
                <ZoomOut className='size-3.5' />
            </ToolButton>
        </div>
    )
}
