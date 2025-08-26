'use client'

import { useRef, useState, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { debounce } from 'lodash-es'

import { MeshBackground } from '@/components/common'
import { useEditor, Toolbar, EditorRulers, PageLayout, PageBreak, ResumeSizePage, HiddenMeasureContainer } from '@/pages/editor/components'

import { cn } from '@/lib/utils'
import { useTransformLang } from '@/hooks'
import { useAutoPagination, useCenterOnResize } from '@/pages/editor/hooks'

import { PAGE_MIN_SCALE, PAGE_MAX_SCALE, PAGE_INIT_SCALE } from '@/pages/editor/constants'

function EditorDrawingBoard({ children }) {
    // hooks

    const { t } = useTransformLang()
    const { boardMode, pageMode, setPageMode, meshPanel } = useEditor()

    const { pageSize, pageGap } = pageMode

    // States

    const wrapperRef = useRef(null)
    const viewportRef = useRef(null)
    const measureRef = useRef(null)
    const pageLayoutRef = useRef(null)
    const [tempCursor, setTempCursor] = useState(null)
    const [transform, setTransform] = useState({ ...pageMode.position })

    // layout direction for PageLayout: 'single' is vertical else horizontal
    const direction = pageMode.layout === 'single' ? 'vertical' : 'horizontal'

    // Method

    // Computed

    // Measurement & pagination
    const { pages, pageCount } = useAutoPagination({ measureRef, pageHeight: pageSize.height, pageWidth: pageSize.width })

    useEffect(() => {
        if (pageCount) {
            setPageMode(pre => ({ ...pre, pageCount }))
        }
    }, [pageCount])

    // Center on resize
    const { centerPage } = useCenterOnResize({
        viewportRef,
        pageLayoutRef,
        options: {
            margin: boardMode.viewprotMargin,
        },
    })

    useEffect(() => {
        if (!wrapperRef.current || !viewportRef.current) return

        const handleResize = debounce(() => {
            if (boardMode.isOngoingTransfromed) return
            const { offsetX, offsetY, targetScale } = centerPage()
            wrapperRef.current.setTransform(offsetX, offsetY, targetScale)
        }, 0)
        handleResize()

        const ro = new ResizeObserver(handleResize)
        ro.observe(viewportRef.current)
        return () => ro.disconnect()
    }, [wrapperRef, viewportRef, boardMode.isOngoingTransfromed])

    // Handle

    const onHandleZoom = event => {
        if (!event || typeof event.deltaY !== 'number') return setTempCursor(null)
        if (event.deltaY < 0) setTempCursor('zoom-in')
        if (event.deltaY > 0) setTempCursor('zoom-out')
    }

    const onTransformed = ref => {
        const { scale, positionX, positionY } = ref.state
        setTransform({ scale, positionX, positionY })
    }

    return (
        <TransformWrapper
            ref={wrapperRef}
            minScale={PAGE_MIN_SCALE}
            maxScale={PAGE_MAX_SCALE}
            initialScale={PAGE_INIT_SCALE}
            limitToBounds={false}
            wheel={{ step: 0.05, wheelDisabled: boardMode.isWheelPanning }}
            panning={{ wheelPanning: boardMode.isWheelPanning }}
            onZoomStart={(_, event) => onHandleZoom(event)}
            onZoomStop={() => onHandleZoom()}
            onTransformed={ref => onTransformed(ref)}
        >
            <div
                ref={viewportRef}
                className={cn('w-full h-screen relative overflow-hidden bg-muted z-0')}
                style={{
                    paddingLeft: `${boardMode.viewprotMargin}px`,
                    paddingTop: `${boardMode.viewprotMargin}px`,
                    cursor: `${tempCursor ?? boardMode.cursorMode}`,
                }}
            >
                <div
                    className='absolute inset-0 pointer-events-none z-0'
                    style={{
                        paddingLeft: `${boardMode.viewprotMargin}px`,
                        paddingTop: `${boardMode.viewprotMargin}px`,
                    }}
                >
                    <div className='w-full h-full relative'>
                        {meshPanel.show && (
                            <MeshBackground
                                scale={transform.scale}
                                unit={meshPanel.unit}
                                model={meshPanel.model}
                                size={meshPanel.size}
                                colors={meshPanel.color}
                                opacity={meshPanel.opacity}
                                // className='-m-1'
                            />
                        )}
                    </div>
                </div>

                <EditorRulers
                    scale={transform.scale}
                    positionX={transform.positionX}
                    positionY={transform.positionY}
                    options={{
                        unit: meshPanel.unit * 10,
                        size: boardMode.viewprotMargin,
                        visible: boardMode.rolueMode,
                    }}
                />

                <Toolbar />

                <TransformComponent wrapperClass={cn('!w-full !h-full')} contentClass='pointer-events-none'>
                    <PageLayout direction={direction} gap={pageGap} ref={pageLayoutRef}>
                        {/* Render paginated pages. pages is array of arrays of HTML strings */}
                        {pages.length > 0 &&
                            pages.map((pageItems, i) => (
                                <div key={i} className='relative cursor-ew-resize'>
                                    <ResumeSizePage pageNumber={i + 1} pageSize={pageSize} showPageNumber={pageMode.showPageNumber}>
                                        {/* <div
                                            className='w-full h-full overflow-hidden'
                                            dangerouslySetInnerHTML={{ __html: pageItems.join('') }}
                                        /> */}
                                        {children}
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
