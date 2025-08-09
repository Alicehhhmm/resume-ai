'use client'

import { useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { cn } from '@/lib/utils'

import { useEditor, Toolbar } from '@/pages/editor/components'
import { useTransformLang } from '@/hooks'
import { MeshBackground } from '@/components/common'

function EditorDrawingBoard({ children }) {
    // hooks

    const { t } = useTransformLang()
    const { layoutMode, meshPanel } = useEditor()

    // States

    const wrapperRef = useRef(null)

    // Method

    const isSinglePage = layoutMode === 'single'
    const isMultiPage = layoutMode === 'multi'

    return (
        <TransformWrapper
            ref={wrapperRef}
            centerOnInit
            minScale={0.4}
            maxScale={2}
            initialScale={0.8}
            limitToBounds={false}
            wheel={{ step: 0.05, wheelDisabled: true }}
            panning={{ wheelPanning: true }}
        >
            <div className='!w-full !h-screen !relative'>
                {meshPanel.show && (
                    <MeshBackground
                        model={meshPanel.model}
                        size={meshPanel.size}
                        colors={meshPanel.color}
                        opacity={meshPanel.opacity}
                        className='-m-1'
                    />
                )}

                {/* TODO: Role components */}

                <Toolbar />
                <TransformComponent
                    wrapperClass='!size-full !relative'
                    contentClass={cn(
                        'bg-white pointer-events-none',
                        isSinglePage && 'flex flex-col items-start justify-center space-y-12 ',
                        isMultiPage && 'grid items-start justify-center space-x-12 '
                    )}
                >
                    {/* TODO: Paging component */}
                    {/* <div className='bg-amber-300 w-30 h-10'>page1</div>
                    <div className='bg-green-300 w-30 h-10'>page2</div> */}
                    {children}
                </TransformComponent>
            </div>
        </TransformWrapper>
    )
}

export default EditorDrawingBoard
