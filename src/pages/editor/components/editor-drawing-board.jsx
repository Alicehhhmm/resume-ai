'use client'

import { useRef, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

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

import { useTransformLang } from '@/hooks'
import { useAutoPagination } from '@/pages/editor/hooks'

import { PAGE_MIN_SCALE, PAGE_MAX_SCALE, PAGE_INIT_SCALE } from '@/pages/editor/constants'

function EditorDrawingBoard({ children }) {
    // hooks

    const { t } = useTransformLang()
    const { pageMode, setPageMode, meshPanel } = useEditor()

    const { pageSize, pageGap } = pageMode

    // States

    const viewportRef = useRef(null)
    const measureRef = useRef(null)
    const pageLayoutRef = useRef(null)

    // Method

    // Measurement & pagination
    const { pages, pageCount } = useAutoPagination({ measureRef, pageHeight: pageSize.height, pageWidth: pageSize.width })

    useEffect(() => {
        if (pageCount) {
            setPageMode(pre => ({ ...pre, pageCount }))
        }
    }, [pageCount])

    // layout direction for PageLayout: 'single' is vertical else horizontal
    const direction = pageMode.layout === 'single' ? 'vertical' : 'horizontal'

    return (
        <TransformWrapper
            centerOnInit
            minScale={PAGE_MIN_SCALE}
            maxScale={PAGE_MAX_SCALE}
            initialScale={PAGE_INIT_SCALE}
            limitToBounds={false}
            wheel={{ step: 0.05, wheelDisabled: true }}
            panning={{ wheelPanning: true }}
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

                {/* DOTO: 仅在：第一次渲染，和 pageSize 发生改变时 触发 */}
                <CenterOnResize
                    viewportRef={viewportRef}
                    direction={direction}
                    pageCount={pageCount}
                    pageSize={pageSize}
                    pageGap={pageGap}
                />

                <Toolbar />

                <TransformComponent wrapperClass='!w-full !h-full' contentClass='pointer-events-none'>
                    <PageLayout direction={direction} gap={pageGap} ref={pageLayoutRef}>
                        {/* Render paginated pages. pages is array of arrays of HTML strings */}
                        {pages.length > 0 &&
                            pages.map((pageItems, i) => (
                                <div key={i} className='relative'>
                                    <ResumeSizePage pageNumber={i + 1} pageSize={pageSize} showPageNumber={showPageNumber}>
                                        <div
                                            className='w-full h-full overflow-hidden'
                                            dangerouslySetInnerHTML={{ __html: pageItems.join('') }}
                                        />
                                    </ResumeSizePage>

                                    {/* page break indicator (editor-only) */}
                                    {i < pages.length - 1 && pageBreak.show && <PageBreak />}
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
