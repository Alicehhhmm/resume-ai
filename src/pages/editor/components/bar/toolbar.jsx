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
} from 'lucide-react'

import { useEditor } from '@/pages/editor/components'
import { ToolButton } from '@/components/common'

import { useTransformLang } from '@/hooks'
import { Separator } from '@/components/ui/separator'

export function Toolbar() {
    // hooks

    const { t } = useTransformLang()
    const { zoomIn, zoomOut, resetTransform } = useControls()
    const { panels, setPanels, layoutMode, setLayoutMode, cursorMode, setCursorMode, rolueMode, setRolueMode, meshMode, setMeshMode } =
        useEditor()

    // States

    const isAllHidden = panels.leftHide && panels.rightHide
    const isSinglePage = layoutMode === 'single'

    return (
        <div className='h-10 absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center z-50 px-4 py-1 gap-1 rounded-2xl bg-background shadow-sm backdrop-blur-md'>
            <ToolButton
                tooltip={cursorMode === 'move' ? t('move') : t('default')}
                onClick={() => setCursorMode(cursorMode != 'move' ? 'move' : 'default')}
            >
                {cursorMode === 'move' ? <Move className='size-3.5' /> : <MousePointer2 className='size-3.5' />}
            </ToolButton>

            <ToolButton tooltip={t('reset') + ' (Ctrl + R)'} onClick={() => resetTransform()}>
                <RefreshCcw className='size-3.5' />
            </ToolButton>

            <ToolButton tooltip={t('ruler')} active={rolueMode} onClick={() => setRolueMode(!rolueMode)}>
                <RulerDimensionLine className='size-3.5' />
            </ToolButton>

            <ToolButton tooltip={meshMode ? t('hidMesh') : t('showMesh')} active={meshMode} onClick={() => setMeshMode(!meshMode)}>
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
                tooltip={isSinglePage ? t('multiPage') : t('singlePage')}
                onClick={() => setLayoutMode(isSinglePage ? 'multi' : 'single')}
            >
                {isSinglePage ? <Columns2 className='size-3.5' /> : <StickyNote className='size-3.5' />}
            </ToolButton>

            <Separator orientation='vertical' className='h-10' />

            <ToolButton tooltip={t('ZoomIn') + ' (Ctrl +)'} onClick={() => zoomIn()}>
                <ZoomIn className='size-3.5' />
            </ToolButton>
            <ToolButton tooltip={t('zoomOut') + ' (Ctrl -)'} onClick={() => zoomOut()}>
                <ZoomOut className='size-3.5' />
            </ToolButton>
        </div>
    )
}
