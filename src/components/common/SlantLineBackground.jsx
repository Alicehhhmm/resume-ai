'use client'

import React from 'react'
import { cn } from '@/lib/utils'

const SlantLineBackground = ({ className }) => {
    return (
        <div
            aria-hidden
            className={cn(
                'absolute',
                'col-start-2 row-span-5 row-start-1',
                'border-x border-x-[--pattern-fg]',
                'bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)]',
                'bg-[size:10px_10px]',
                'inset-0',
                '[--pattern-fg:var(--color-gray-950)]/5',
                'dark:[--pattern-fg:var(--color-white)]/10',
                'max-lg:hidden',
                className
            )}
        />
    )
}

SlantLineBackground.displayName = 'SlantLineBackground'

export default SlantLineBackground
