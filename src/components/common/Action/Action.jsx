import React, { forwardRef } from 'react'

import styles from './Actions.module.css'
import { cn } from '@/lib/utils'

export const Action = forwardRef(({ className, cursor, style, variant = 'light', ...props }, ref) => {
    return (
        <button
            ref={ref}
            {...props}
            className={cn(styles.Action, styles[variant], className)}
            style={{
                ...style,
                cursor,
            }}
        />
    )
})
