import React, { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

import styles from './SortableContainer.module.css'

/**
 * Container
 * -----------
 * 容器组件，用于包裹模块列表
 *
 * @param {React.ReactNode} children - 容器内容
 * @param {React.ReactNode} actions - 容器操作按钮
 * @param {string} label - 容器标题
 * @param {boolean} scrollable - 是否可滚动
 * @param {boolean} shadow - 是否显示阴影
 * @param {React.CSSProperties} style - 容器样式
 * @param {string} transitionId - 过渡动画ID
 *
 */
const SortableContainer = forwardRef(({ actions, children, label, scrollable, shadow, transitionId, className, style, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(styles.Container, scrollable && styles.scrollable, shadow && styles.shadow, className)}
            style={{
                ...style,
                viewTransitionName: transitionId,
            }}
            {...props}
        >
            {label ? (
                <div className={styles.Header}>
                    {label}
                    {actions}
                </div>
            ) : null}
            <ul id={label}>{children}</ul>
        </div>
    )
})

SortableContainer.displayName = 'SortableContainer'

export { SortableContainer }
