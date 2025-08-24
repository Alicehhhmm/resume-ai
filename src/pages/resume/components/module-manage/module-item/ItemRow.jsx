import React, { forwardRef, memo } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

import styles from './ItemRow.module.css'

/**
 * ItemRow
 * ----------
 *
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 列表项内容
 * @param {React.ReactNode} props.actions - 列表项操作按钮
 * @param {boolean} props.shadow - 是否显示阴影
 * @param {React.CSSProperties} props.style - 列表项样式
 * @param {string} props.transitionId - 过渡动画ID
 */
const ItemRowComponent = forwardRef(({ actions, children, shadow, transitionId, className, style, ...props }, ref) => {
    const Element = actions ? 'div' : 'button'

    return (
        <Element
            {...props}
            ref={ref}
            data-shadow={shadow}
            className={cn(styles.Item, '!shadow', className)}
            style={{
                ...style,
                viewTransitionName: transitionId,
            }}
        >
            {children}
            {actions}
        </Element>
    )
})

ItemRowComponent.displayName = 'ItemRow'

export const ItemRow = memo(ItemRowComponent)
