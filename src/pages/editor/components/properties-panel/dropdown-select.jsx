import React, { useState, useCallback, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

/**
 * DropdownSelect - 通用属性面板下拉选择组件
 *
 * @param {string|ReactNode} icon - 左侧图标
 * @param {string} label - 默认显示文本
 * @param {Array} options - 选项数组 [{label, value, icon?, shortcut?, disabled?}]
 * @param {function} onSelect - 选择回调
 * @param {boolean} disabled - 是否禁用
 * @param {string} placeholder - 占位文字
 * @param {string} groupLabel - 选项组标题
 * @param {string} className - 自定义样式
 */
export function DropdownSelect({
    icon: Icon,
    label = 'select',
    groupLabel,
    options = [],
    onSelect,
    disabled = false,
    placeholder = 'Select an option...',
    className,
}) {
    // States

    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)

    // Method

    const handleSelect = useCallback(
        item => {
            setSelectedValue(item)
            onSelect?.(item)
            setOpen(false)
        },
        [onSelect]
    )

    // Runderer

    const displayText = useMemo(() => {
        return selectedValue?.label || label || placeholder
    }, [selectedValue, label, placeholder])

    const renderIcon = useCallback(IconElement => {
        if (!IconElement) return null

        // icon: emoji
        if (typeof IconElement === 'string') {
            return <span className='size-3 text-muted-foreground'>{IconElement}</span>
        }

        // icon: IconName (lucide-icon)
        if (typeof IconElement === 'function') {
            return <IconElement className='size-3 text-muted-foreground' />
        }

        // icon: <Icons />
        return React.cloneElement(IconElement, {
            className: cn('size-3 text-muted-foreground', IconElement.props?.className),
        })
    }, [])

    const optionItems = useMemo(() => {
        if (options.length === 0) return <div className='px-3 py-2 text-sm text-accent font-semibold text-center'>No options available</div>

        return options.map((option, idx) => (
            <DropdownMenuItem
                key={option.label ?? idx}
                onSelect={() => handleSelect(option)}
                disabled={option.disabled}
                className='flex items-center justify-between px-2 py-1.5 text-sm rounded-sm hover:bg-accent focus:bg-accent transition-colors'
            >
                <span className='flex items-center gap-2 text-accent-foreground/60'>
                    {option.icon && (
                        <span className='size-3 flex items-center justify-center text-muted-foreground'>{renderIcon(option.icon)}</span>
                    )}
                    <span className='truncate'>{option.label}</span>
                </span>

                {option.shortcut && (
                    <DropdownMenuShortcut className='text-xs text-muted-foreground'>{option.shortcut}</DropdownMenuShortcut>
                )}
            </DropdownMenuItem>
        ))
    }, [options, handleSelect])

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    disabled={disabled}
                    size='panel'
                    variant='panel'
                    className={cn('flex-1 flex items-center justify-between space-x-1 transition-transform duration-200', className)}
                >
                    {Icon && <div className='size-3 flex items-center justify-center'>{renderIcon(Icon)}</div>}

                    <span className='truncate text-[11px] text-foreground/80'>{displayText}</span>

                    <ChevronDown className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56 shadow-md rounded-md p-1 animate-in fade-in-0 zoom-in-95' align='start' sideOffset={4}>
                {groupLabel && (
                    <>
                        <DropdownMenuLabel className='px-3 py-2 text-xs font-medium uppercase tracking-wider'>
                            {groupLabel}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuGroup>{optionItems}</DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
