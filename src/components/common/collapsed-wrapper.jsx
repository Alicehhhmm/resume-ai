'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const DEFAULT_COLLAPSED_WIDTH = 64
const DEFAULT_EXPANDED_WIDTH = 320
const MIN_WIDTH = 360
const MAX_WIDTH = 640
const THROTTLE_INTERVAL = 16 // 约60fps

/** -------------------------
 *  CollapsedContext
 * ------------------------- */
const CollapsedContext = React.createContext(null)

export const useCollapsed = () => {
    const ctx = React.useContext(CollapsedContext)
    if (!ctx) throw new Error('useCollapsed must be used within <CollapsedWrapper />')
    return ctx
}

/** -------------------------
 *  CollapsedProvider
 * ------------------------- */

function CollapsedProvider({ value, children }) {
    const [open, setOpen] = useState(value.open)

    // data-state="expanded" or "collapsed".
    const state = value.open ? 'expanded' : 'collapsed'

    const contextValue = React.useMemo(
        () => ({
            state,
            ...value,
        }),
        [state, open, value]
    )

    return <CollapsedContext.Provider value={contextValue}>{children}</CollapsedContext.Provider>
}

/** -------------------------
 *  CollapsedHandle
 * ------------------------- */
export const CollapsedHandle = memo(({ className, ...props }) => {
    const { open, position, resizable, handleDragStart, width } = useCollapsed()
    if (!resizable || open) return null

    return (
        <div
            className={cn(
                'absolute top-0 h-full z-20',
                'hover:bg-primary/10 active:bg-primary/20',
                'transition-colors cursor-col-resize',
                'transition-transform duration-150 ease-in-out transform active:scale-x-125 origin-center',
                position === 'left' ? '-right-0.5 w-1' : '-left-0.5 w-1',
                className
            )}
            onMouseDown={e => {
                e.preventDefault()
                handleDragStart(e.nativeEvent)
            }}
            onTouchStart={e => {
                e.preventDefault()
                handleDragStart(e.nativeEvent)
            }}
            role='slider'
            data-slot='collapsed-handle'
            aria-valuenow={width}
            aria-valuemin={MIN_WIDTH}
            aria-valuemax={MAX_WIDTH}
            {...props}
        >
            <GripVertical className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
        </div>
    )
})
CollapsedHandle.displayName = 'CollapsedHandle'

/** -------------------------
 *  CollapsedTrigger
 * ------------------------- */
export const CollapsedTrigger = memo(({ className, ...props }) => {
    const { open, toggleCollapse, position } = useCollapsed()
    const ChevronIcon = position === 'left' ? ChevronLeft : ChevronRight

    return (
        <Button
            variant='ghost'
            size='icon'
            className={cn(
                'absolute top-6 size-8 rounded-none p-1.5 z-10 shadow-sm',
                'hover:bg-accent hover:text-accent-foreground',
                'transition-transform duration-300 ease-in-out',
                position === 'left' ? '-right-4 translate-x-1/2 rounded-r-lg' : '-left-4 -translate-x-1/2 rounded-l-lg'
            )}
            onClick={toggleCollapse}
            data-slot='collapsed-ttrigger'
            {...props}
        >
            <ChevronIcon
                className={cn(
                    'size-5 transition-transform duration-300',
                    open ? (position === 'left' ? 'rotate-180' : '-rotate-180') : 'rotate-0'
                )}
            />
        </Button>
    )
})
CollapsedTrigger.displayName = 'CollapsedTrigger'

/** -------------------------
 *  CollapsedWrapper
 *  ----------------
 *
 * @param {object} props - 组件属性
 * @param {boolean} props.resizable - 是否可调整宽度
 * @param {string} props.position - 位置，可选值为 'left' 或 'right'
 * @param {boolean} props.collapsed - 控制是否折叠
 * @param {number} props.width - 宽度 （default: 320）
 * @param {function} props.onCollapsedChange - 折叠状态改变回调
 * @param {function} props.onWidthChange - 宽度改变回调
 * @param {number} props.defaultCollapsed - 默认是否折叠
 * @param {number} props.collapsedWidth - 可折叠宽度 （default: 64）
 * @param {number} props.expandedWidth - 可展开宽度 （default: 320）
 * @param {function} props.onCollapsedChange - 折叠状态改变回调
 * @param {function} props.onWidthChange - 宽度改变回调
 * @param {ReactNode} props.children - 子元素
 * @param {string} props.className - 类名
 * @param {object} props.style - 样式
 * ------------------------- */
const CollapsedWrapper = ({
    resizable = false,
    position = 'left',
    collapsed: controlledCollapsed,
    width: controlledWidth,
    defaultCollapsed = false,
    collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
    expandedWidth = DEFAULT_EXPANDED_WIDTH,
    onCollapsedChange,
    onWidthChange,
    children,
    className,
    style,
}) => {
    const containerRef = useRef(null)
    const animationFrameRef = useRef(null)
    const lastUpdateTimeRef = useRef(0)
    const dragStartXRef = useRef(0)
    const dragStartWidthRef = useRef(0)

    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
    const [internalWidth, setInternalWidth] = useState(expandedWidth)
    const [isResizing, setIsResizing] = useState(false)

    const isControlled = controlledCollapsed !== undefined
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed
    const width = controlledWidth ?? internalWidth
    const currentWidth = collapsed ? collapsedWidth : Math.max(width, MIN_WIDTH)

    /** 更新宽度 */
    const updateWidth = useCallback(
        newWidth => {
            const clamped = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth))
            const sidebarElement = containerRef.current
            if (sidebarElement) {
                sidebarElement.style.width = `${clamped}px`
                sidebarElement.style.minWidth = `${clamped}px`
            }

            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = requestAnimationFrame(() => {
                if (!isControlled) setInternalWidth(clamped)
                onWidthChange?.(clamped)
            })
        },
        [isControlled, onWidthChange]
    )

    /** 拖拽逻辑 */
    const handleDragStart = useCallback(
        e => {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
            dragStartXRef.current = clientX
            dragStartWidthRef.current = width
            const sidebarElement = containerRef.current

            const handleDragging = e => {
                const now = Date.now()
                if (now - lastUpdateTimeRef.current < THROTTLE_INTERVAL) return
                lastUpdateTimeRef.current = now

                const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX
                const delta = position === 'left' ? currentX - dragStartXRef.current : dragStartXRef.current - currentX
                updateWidth(dragStartWidthRef.current + delta)
            }

            const handleDragEnd = () => {
                window.removeEventListener('mousemove', handleDragging)
                window.removeEventListener('mouseup', handleDragEnd)
                window.removeEventListener('touchmove', handleDragging)
                window.removeEventListener('touchend', handleDragEnd)

                document.body.style.removeProperty('cursor')
                document.body.style.removeProperty('user-select')
                setIsResizing(false)

                // desc: Prevent the position of CollapsedHandle from shifting
                if (sidebarElement) {
                    const finalWidth = parseFloat(sidebarElement.style.width)
                    setInternalWidth(finalWidth)
                    onWidthChange?.(finalWidth)
                }
            }

            window.addEventListener('mousemove', handleDragging)
            window.addEventListener('mouseup', handleDragEnd)
            window.addEventListener('touchmove', handleDragging)
            window.addEventListener('touchend', handleDragEnd)

            document.body.style.cursor = 'ew-resize'
            document.body.style.userSelect = 'none'
            setIsResizing(true)
        },
        [width, position, updateWidth]
    )

    /** 折叠切换 */
    const toggleCollapse = useCallback(() => {
        const newState = !collapsed
        if (!isControlled) setInternalCollapsed(newState)
        onCollapsedChange?.(newState)
    }, [collapsed, isControlled, onCollapsedChange])

    useEffect(
        () => () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        },
        []
    )

    return (
        <CollapsedProvider
            value={{
                open: collapsed,
                width,
                position,
                toggleCollapse,
                handleDragStart,
                resizable,
            }}
        >
            <div
                ref={containerRef}
                tabIndex={0}
                data-state={collapsed ? 'closed' : 'open'}
                className={cn(
                    'relative h-full flex flex-col bg-background',
                    'transition-all duration-300 ease-in-out will-change-[width]',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
                    position === 'left' &&
                        'border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0',
                    position === 'right' &&
                        'border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0',
                    isResizing && 'transition-none select-none',
                    collapsed && 'border-0',
                    className
                )}
                style={{
                    width: currentWidth,
                    minWidth: currentWidth,
                    ...style,
                }}
            >
                <CollapsedHandle />
                <CollapsedTrigger />
                {children}
            </div>
        </CollapsedProvider>
    )
}

CollapsedWrapper.displayName = 'CollapsedWrapper'

export default memo(CollapsedWrapper)
