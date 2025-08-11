'use client'

import React from 'react'

/**
 * ResumeSizePage
 * A4-like page container
 */
export default function ResumeSizePage({
    pageNumber,
    pageSize = { width: 794, height: 1123 },
    showPageNumber = true,
    children,
    className = '',
}) {
    const { width, height } = pageSize
    return (
        <div
            className={`relative bg-white shadow-md border border-neutral-200 ${className}`}
            style={{ width: `${width}px`, height: `${height}px`, flexShrink: 0 }}
            aria-label={`page-${pageNumber}`}
        >
            {showPageNumber && <div className='absolute -top-7 left-0 font-bold print:hidden'>Page {pageNumber}</div>}
            <div className='w-full h-full overflow-hidden'>{children}</div>
        </div>
    )
}
