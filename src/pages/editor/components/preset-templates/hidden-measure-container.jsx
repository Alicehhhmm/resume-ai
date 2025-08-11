'use client'

import React, { forwardRef } from 'react'

/**
 * HiddenMeasureContainer
 * - Renders children into an offscreen measure container.
 * - It keeps natural layout/flow so child heights can be measured.
 *
 * Usage: <HiddenMeasureContainer ref={measureRef} width={794}>{content}</HiddenMeasureContainer>
 */
const HiddenMeasureContainer = forwardRef(({ width = 794, children, className = '' }, ref) => {
    // we place it visually offscreen and keep it in DOM flow for accurate measurement
    return (
        <div
            ref={ref}
            className={`absolute top-0 left-0 opacity-0 pointer-events-none ${className}`}
            style={{
                width: `${width}px`,
                // keep it visually out of normal flow (but still measurable)
                transform: 'translateY(-99999px)',
            }}
            aria-hidden='true'
        >
            {children}
        </div>
    )
})

export default HiddenMeasureContainer
