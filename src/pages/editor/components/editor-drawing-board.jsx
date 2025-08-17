'use client'

import { useRef, useState, useEffect } from 'react'
import { TransformWrapper, TransformComponent, useTransformEffect } from 'react-zoom-pan-pinch'

import { MeshBackground } from '@/components/common'
import {
    useEditor,
    Toolbar,
    CenterOnResize,
    PageLayout,
    PageBreak,
    ResumeSizePage,
    HiddenMeasureContainer,
} from '@/pages/editor/components'

import { cn } from '@/lib/utils'
import { useTransformLang } from '@/hooks'
import { useAutoPagination } from '@/pages/editor/hooks'

import { PAGE_MIN_SCALE, PAGE_MAX_SCALE, PAGE_INIT_SCALE } from '@/pages/editor/constants'

function EditorDrawingBoard({ children }) {
    // hooks

    const { t } = useTransformLang()
    const { boardMode, setBoardMode, pageMode, setPageMode, meshPanel } = useEditor()

    const { pageSize, pageGap } = pageMode

    // States

    const viewportRef = useRef(null)
    const measureRef = useRef(null)
    const pageLayoutRef = useRef(null)
    const [tempCursor, setTempCursor] = useState(null)

    // layout direction for PageLayout: 'single' is vertical else horizontal
    const direction = pageMode.layout === 'single' ? 'vertical' : 'horizontal'

    // Method
    useEffect(() => {
        if (pageLayoutRef.current) {
            setPageMode(prev => ({ ...prev, pageLayoutRef }))
        }

        if (viewportRef.current) {
            setBoardMode(prev => ({ ...prev, viewportRef }))
        }
    }, [])

    // Measurement & pagination
    const { pages, pageCount } = useAutoPagination({ measureRef, pageHeight: pageSize.height, pageWidth: pageSize.width })

    useEffect(() => {
        if (pageCount) {
            setPageMode(pre => ({ ...pre, pageCount }))
        }
    }, [pageCount])

    // Handle

    const onHandleZoom = event => {
        if (!event || typeof event.deltaY !== 'number') setTempCursor(null)
        if (event.deltaY < 0) setTempCursor('zoom-in')
        if (event.deltaY > 0) setTempCursor('zoom-out')
    }

    return (
        <TransformWrapper
            minScale={PAGE_MIN_SCALE}
            maxScale={PAGE_MAX_SCALE}
            initialScale={PAGE_INIT_SCALE}
            limitToBounds={false}
            wheel={{ step: 0.05, wheelDisabled: boardMode.isWheelPanning }}
            panning={{ wheelPanning: boardMode.isWheelPanning }}
            onZoomStart={(_, event) => onHandleZoom(event)}
            onZoomStop={() => onHandleZoom()}
        >
            <div ref={viewportRef} className='w-full h-screen relative overflow-hidden bg-muted'>
                {meshPanel.show && (
                    <MeshBackground
                        model={meshPanel.model}
                        size={meshPanel.size}
                        colors={meshPanel.color}
                        opacity={meshPanel.opacity}
                        className='-m-1'
                    />
                )}

                <CenterOnResize
                    disabled={boardMode.isOngoingTransfromed}
                    viewportRef={viewportRef}
                    direction={direction}
                    pageCount={pageCount}
                    pageSize={pageSize}
                    pageGap={pageGap}
                />

                <Toolbar />

                <TransformComponent
                    wrapperClass={cn('!w-full !h-full', `cursor-${tempCursor ?? boardMode.cursorMode}`)}
                    contentClass='pointer-events-none'
                >
                    <PageLayout direction={direction} gap={pageGap} ref={pageLayoutRef}>
                        {/* Render paginated pages. pages is array of arrays of HTML strings */}
                        {pages.length > 0 &&
                            pages.map((pageItems, i) => (
                                <div key={i} className='relative cursor-ew-resize'>
                                    <ResumeSizePage pageNumber={i + 1} pageSize={pageSize} showPageNumber={pageMode.showPageNumber}>
                                        <div
                                            className='w-full h-full overflow-hidden'
                                            dangerouslySetInnerHTML={{ __html: pageItems.join('') }}
                                        />
                                    </ResumeSizePage>

                                    {/* page break indicator (editor-only) */}
                                    {i < pages.length - 1 && pageMode.pageBreak.show && <PageBreak />}
                                </div>
                            ))}
                    </PageLayout>
                </TransformComponent>

                {/* Hidden measurement container: render original children here for height measurement */}
                <HiddenMeasureContainer ref={measureRef} width={pageSize.width}>
                    {children}
                </HiddenMeasureContainer>
            </div>
        </TransformWrapper>
    )
}

export default EditorDrawingBoard
