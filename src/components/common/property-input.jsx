import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { cva } from 'class-variance-authority'

const containerVariants = cva(
    `flex items-center rounded bg-background text-[11px]
     hover:ring-1 hover:ring-primary/10
     transition-colors focus-within:ring-1 focus-within:ring-ring/50 focus-within:ring-offset-1`,
    {
        variants: {
            variant: {
                default: 'bg-accent',
            },
            size: {
                sm: 'h-5',
                default: 'h-6',
                lg: 'h-7',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const labelVariants = cva(`inline-flex items-center justify-center rounded-l bg-muted px-2 text-[11px] font-medium text-muted-foreground`, {
    variants: {
        size: {
            sm: 'h-5',
            default: 'h-6',
            lg: 'h-7',
        },
        interactive: {
            true: 'cursor-ew-resize hover:bg-muted/80',
            false: '',
        },
    },
    defaultVariants: {
        size: 'default',
        interactive: false,
    },
})

const inputVariants = cva(
    `flex size-full min-w-0 bg-transparent px-2 py-1 text-sm text-foreground/80
     dark:bg-input/30 transition-[color,box-shadow] outline-hidden
     file:border-0 file:bg-transparent file:text-sm file:font-medium 
     placeholder:text-muted-foreground focus-visible:outline-hidden
     disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
    {
        variants: {
            align: {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
            },
        },
        defaultVariants: {
            align: 'left',
        },
    }
)

const unitVariants = cva(`inline-flex items-center justify-center rounded-r bg-muted px-1 text-[11px] text-muted-foreground`, {
    variants: {
        size: {
            sm: 'h-5',
            default: 'h-6',
            lg: 'h-7',
        },
    },
    defaultVariants: {
        size: 'default',
    },
})

/**
 * PropertyInput - 属性面板输入组件
 *
 * @param {string|ReactNode} label - 左侧标签
 * @param {string|number} value - 输入值
 * @param {function} onChange - 值变化回调
 * @param {string} unit - 右侧单位
 * @param {string} type - 输入类型
 * @param {string} placeholder - 占位文本
 * @param {string} size - 尺寸: sm | default | lg
 * @param {string} variant - 变体: default | destructive
 * @param {string} align - 文本对齐: left | center | right
 * @param {boolean} disabled - 是否禁用
 * @param {function} onLabelClick - 标签点击回调
 */
export const PropertyInput = React.forwardRef(
    (
        {
            label,
            value,
            onChange,
            unit,
            type = 'text',
            placeholder,
            size = 'default',
            variant = 'default',
            align = 'left',
            disabled = false,
            onLabelClick,
            className,
            inputClassName,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn(containerVariants({ variant, size }), className)}>
                {label && (
                    <div
                        className={cn(
                            labelVariants({
                                size,
                                interactive: !!onLabelClick,
                            })
                        )}
                        onClick={onLabelClick}
                    >
                        {label}
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={e => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(inputVariants({}), inputClassName)}
                    ref={ref}
                    {...props}
                />

                {unit && <div className={cn(unitVariants({ size }))}>{unit}</div>}
            </div>
        )
    }
)

PropertyInput.displayName = 'PropertyInput'
