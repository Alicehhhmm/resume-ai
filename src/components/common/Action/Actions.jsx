import React from 'react'

import { cn } from '@/lib/utils'
import styles from './Actions.module.css'

export function Actions(props) {
    return (
        <div className={cn(styles.Actions, props.className)} style={props.style}>
            {props.children}
        </div>
    )
}
