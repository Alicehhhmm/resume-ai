'use client'

import React from 'react'

/**
 * PageBreak: visual dashed-line break between pages (editor-only)
 * Props: widthRatio (0..1) - how wide the dashed line is relative to page width
 */
export default function PageBreak({ widthRatio = 0.66, className = '' }) {
    return (
        <div className={`absolute -bottom-5 left-0 w-full flex items-center justify-center pointer-events-none print:hidden ${className}`}>
            <div style={{ width: `${widthRatio * 100}%` }} className='border-t border-dashed border-neutral-400' aria-hidden />
        </div>
    )
}
