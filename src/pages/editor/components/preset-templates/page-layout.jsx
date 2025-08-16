'use client'

import { forwardRef, memo, useCallback } from 'react'
import { debounce } from 'lodash-es'
import { useTransformEffect } from 'react-zoom-pan-pinch'
import { useEditor } from '@/pages/editor/components/editor-provider'
import { cn } from '@/lib/utils'

/**
 * PageLayout - arranges pages
 * direction: 'vertical' (single-column, pages stacked) | 'horizontal' (pages side-by-side)
 * gap: spacing between pages （用于控制无间距预览模式）
 */
const PageLayout = forwardRef(({ direction = 'vertical', gap = 40, children }, ref) => {
    const { setPageMode, setBoardMode } = useEditor()

    const updatePosition = useCallback(
        debounce(newPos => {
            setBoardMode(prev => ({
                ...prev,
                isOngoingTransfromed: true,
            }))

            setPageMode(prev => ({
                ...prev,
                position: newPos,
            }))
        }, 100),
        [setBoardMode, setPageMode]
    )

    useTransformEffect(
        ({ state, instance }) => {
            const { scale, positionX, positionY } = state

            const newPos = {
                x: Number(positionX.toFixed(2)),
                y: Number(positionY.toFixed(2)),
                scale: Number(scale.toFixed(2)),
            }

            updatePosition(newPos)
        },
        {
            events: ['onMove', 'onZoom', 'onPanning', 'onPinching', 'onWheel'],
        }
    )

    return (
        <div
            ref={ref}
            className={cn('flex items-start justify-center fixed pointer-events-none', direction === 'vertical' ? 'flex-col' : 'flex-row')}
            style={{ gap: `${gap}px` }}
        >
            {children}
        </div>
    )
})

export default memo(PageLayout)
