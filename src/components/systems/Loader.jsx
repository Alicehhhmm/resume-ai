'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Loader({ className, style, size = 24, message = 'Loading...', ...props }) {
    return (
        <div
            className={cn('w-full flex text-muted-foreground text-sm items-center justify-center py-6', className)}
            style={style}
            {...props}
        >
            <div className='flex items-center space-x-2 '>
                <Loader2 className='animate-spin' size={size} strokeWidth={2} />
                {message && <span className='animate-pulse'>{message}</span>}
            </div>
        </div>
    )
}
