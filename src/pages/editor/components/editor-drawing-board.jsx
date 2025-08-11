'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react'
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch'

import { cn } from '@/lib/utils'

import { MeshBackground } from '@/components/common'
import { useEditor, Toolbar, PageLayout, PageBreak, ResumeSizePage, HiddenMeasureContainer } from '@/pages/editor/components'

import { useTransformLang } from '@/hooks'
import { useAutoPagination } from '@/pages/editor/hooks'

const pageSize = { width: 794, height: 1123 }
const pageGap = 40

/**
 * CenterOnResize must be placed INSIDE TransformWrapper (so useControls works)
 * It will:
 *  - If `fitOnInit` true: compute an optimal initial scale to fit the whole canvas to viewport
 *  - Always recenter canvas (keeping scale) when viewport size changes (so panels don't "push" zoom)
 */
function CenterOnResize({
    viewportRef,
    layoutMode = 'vertical',
    pageCount = 1,
    pageSize = { width: 794, height: 1123 },
    pageGap = 40,
    fitOnInit = true,
}) {
    const { setTransform, state = {} } = useControls()
    const scale = typeof state.scale === 'number' ? state.scale : undefined

    const computeCanvasSize = () => {
        const { width: pw, height: ph } = pageSize
        if (layoutMode === 'horizontal') {
            const width = pw * pageCount + pageGap * (pageCount - 1)
            const height = ph
            return { width, height }
        }

        // vertical
        const width = pw
        const height = ph * pageCount + pageGap * (pageCount - 1)
        return { width, height }
    }

    React.useEffect(() => {
        if (!viewportRef?.current) return
        const doCenter = () => {
            const vp = viewportRef.current
            const { clientWidth, clientHeight } = vp
            const { width: canvasWidth, height: canvasHeight } = computeCanvasSize()
            // if scale undefined (not initialized), compute an initial scale that fits
            let targetScale = scale
            if (typeof targetScale !== 'number' && fitOnInit) {
                targetScale = Math.min(clientWidth / canvasWidth, clientHeight / canvasHeight, 1)
            }
            if (typeof targetScale === 'number') {
                const offsetX = (clientWidth - canvasWidth * targetScale) / 2
                const offsetY = (clientHeight - canvasHeight * targetScale) / 2
                setTransform(offsetX, offsetY, targetScale)
            }
        }

        // initial
        doCenter()

        const ro = new ResizeObserver(() => {
            // when viewport changes (panels toggle) keep same scale but recenter (if scale defined)
            doCenter()
        })
        ro.observe(viewportRef.current)
        return () => ro.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewportRef, layoutMode, pageCount, pageSize.width, pageSize.height, pageGap, fitOnInit, setTransform, scale])

    return null
}

function EditorDrawingBoard({ children }) {
    // hooks

    const { t } = useTransformLang()
    const { layoutMode, meshPanel } = useEditor()

    // States

    const viewportRef = useRef(null)
    const measureRef = useRef(null)

    // Method

    const isSinglePage = layoutMode === 'single'
    const isMultiPage = layoutMode === 'multi'

    // Measurement & pagination
    const { pages, pageCount } = useAutoPagination({ measureRef, pageHeight: pageSize.height, pageWidth: pageSize.width })

    // layout direction for PageLayout: vertical if layoutMode === 'vertical' else horizontal
    const direction = layoutMode === 'single' ? 'vertical' : 'horizontal'

    return (
        <TransformWrapper
            centerOnInit
            minScale={0.4}
            maxScale={2}
            initialScale={0.8}
            limitToBounds={false}
            wheel={{ step: 0.05, wheelDisabled: true }}
            panning={{ wheelPanning: true }}
        >
            <CenterOnResize
                viewportRef={viewportRef}
                layoutMode={direction}
                pageCount={pageCount || 1}
                pageSize={pageSize}
                pageGap={pageGap}
                fitOnInit={true}
            />

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

                <Toolbar />

                <TransformComponent wrapperClass='!w-full !h-full' contentClass='pointer-events-none'>
                    <PageLayout direction={direction} gap={pageGap}>
                        {/* Render paginated pages. pages is array of arrays of HTML strings */}
                        {pages.length > 0 &&
                            pages.map((pageItems, i) => (
                                <div key={i} className='relative'>
                                    <ResumeSizePage pageNumber={i + 1} pageSize={pageSize}>
                                        <div
                                            className='w-full h-full overflow-hidden'
                                            dangerouslySetInnerHTML={{ __html: pageItems.join('') }}
                                        />
                                    </ResumeSizePage>

                                    {/* page break indicator (editor-only) */}
                                    {i < pages.length - 1 && <PageBreak />}
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
