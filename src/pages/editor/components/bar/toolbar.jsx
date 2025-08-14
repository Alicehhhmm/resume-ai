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

import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

import { ToolButton } from '@/components/common'
import { useEditor } from '@/pages/editor/components'

import { useTransformLang } from '@/hooks'
import { PAGE_MIN_SCALE, PAGE_MAX_SCALE } from '@/pages/editor/constants'

export function Toolbar() {
    // hooks

    const { t } = useTransformLang()
    const { zoomIn, zoomOut, resetTransform } = useControls()
    const { panels, setPanels, pageMode, setPageMode, cursorMode, setCursorMode, rolueMode, setRolueMode, meshPanel, setMeshPanel } =
        useEditor()

    // States

    const isAllHidden = panels.leftHide && panels.rightHide
    const isSinglePage = pageMode.layout === 'single'

    // Method

    const onHandleZoom = (key, scale) => {
        if (key === 'in') {
            zoomIn()
            if (scale >= PAGE_MAX_SCALE) toast.info(t('已放大到最大比例'))
        }
        if (key === 'out') {
            zoomOut()
            if (scale <= PAGE_MIN_SCALE) toast.info(t('已缩小到最小比例'))
        }
    }

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
                tooltip={isSinglePage ? t('multiPage') : t('singlePage')}
                onClick={() => setPageMode(pre => ({ ...pre, layout: isSinglePage ? 'multi' : 'single' }))}
            >
                {isSinglePage ? <Columns2 className='size-3.5' /> : <StickyNote className='size-3.5' />}
            </ToolButton>

            <Separator orientation='vertical' className='h-10' />

            <ToolButton tooltip={t('ZoomIn') + ' (Ctrl +)'} onClick={() => onHandleZoom('in', pageMode.position.scale)}>
                <ZoomIn className='size-3.5' />
            </ToolButton>
            <ToolButton tooltip={t('zoomOut') + ' (Ctrl -)'} onClick={() => onHandleZoom('out', pageMode.position.scale)}>
                <ZoomOut className='size-3.5' />
            </ToolButton>
        </div>
    )
}
