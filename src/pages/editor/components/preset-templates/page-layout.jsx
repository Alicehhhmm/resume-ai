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

    const memoizedCallback = useCallback(
        debounce(newPos => {
            // 在缩放或平移时，禁用居中计算
            setBoardMode(prev => ({
                ...prev,
                isOngoingTransfromed: true,
            }))

            // 跟新位置
            setPageMode(prev => ({
                ...prev,
                position: newPos,
            }))
        }, 100),
        []
    )

    useTransformEffect(
        ({ state, instance }) => {
            const { scale, positionX, positionY } = state

            const newPos = {
                x: Number(positionX.toFixed(2)),
                y: Number(positionY.toFixed(2)),
                scale: Number(scale.toFixed(2)),
            }

            memoizedCallback(newPos)

            return () => {
                // unmount
            }
        },
        {
            events: ['onMove', 'onZoom'], // 只关注移动和缩放事件
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
