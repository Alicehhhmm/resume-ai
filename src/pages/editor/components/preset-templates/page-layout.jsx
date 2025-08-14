'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * PageLayout - arranges pages
 * direction: 'vertical' (single-column, pages stacked) | 'horizontal' (pages side-by-side)
 * gap: spacing between pages （用于控制无间距预览模式）
 */
const PageLayout = forwardRef(({ direction = 'vertical', gap = 40, children }, ref) => {
    const isVertical = direction === 'vertical'
    const layoutClass = cn('flex items-start justify-center fixed pointer-events-none', isVertical ? 'flex-col' : 'flex-row')

    return (
        <div ref={ref} className={layoutClass} style={{ gap: `${gap}px` }}>
            {children}
        </div>
    )
})

export default PageLayout
