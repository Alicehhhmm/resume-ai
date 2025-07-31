'use client'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// 预设常量
const DEFAULT_COLLAPSED_WIDTH = 64
const DEFAULT_EXPANDED_WIDTH = 320
const MIN_WIDTH = 360
const MAX_WIDTH = 640
const ANIMATION_DURATION = 300
const THROTTLE_INTERVAL = 16 // 约60fps

/**
 * 可折叠且可调整大小的侧边栏组件
 * 支持展开/折叠状态切换和宽度调整功能
 */
const CollapsedWrapper = ({
    /**
     * 侧边栏中显示的内容
     */
    children,
    /**
     * 是否允许拖拽调整宽度
     * @default false
     */
    resizable = false,
    /**
     * 侧边栏位置
     * @default 'left'
     */
    position = 'left',
    /**
     * 受控模式下的折叠状态
     * 若提供此参数，组件将进入受控模式，由外部控制折叠状态
     */
    collapsed: controlledCollapsed,
    /**
     * 受控模式下的宽度
     * 若提供此参数，组件将进入受控模式，由外部控制宽度
     */
    width: controlledWidth,
    /**
     * 非受控模式下的默认折叠状态
     * @default false
     */
    defaultCollapsed = false,
    /**
     * 折叠状态下的宽度
     * @default 64
     */
    collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
    /**
     * 展开状态下的初始宽度
     * @default 320
     */
    expandedWidth = DEFAULT_EXPANDED_WIDTH,
    /**
     * 自定义样式类名
     */
    className,
    /**
     * 自定义内联样式
     */
    style,
    /**
     * 折叠状态变化时的回调函数
     * @param {boolean} collapsed - 新的折叠状态
     */
    onCollapsedChange,
    /**
     * 宽度变化时的回调函数
     * @param {number} width - 新的宽度值
     */
    onWidthChange,
}) => {
    // DOM引用
    const containerRef = useRef(null)
    const contentRef = useRef(null)

    // 动画和拖拽相关引用
    const animationFrameRef = useRef(null)
    const lastUpdateTimeRef = useRef(0)
    const dragStartXRef = useRef(0)
    const dragStartWidthRef = useRef(0)
    const animationTimeoutIdRef = useRef(null)

    // 内部状态管理
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
    const [internalWidth, setInternalWidth] = useState(expandedWidth)
    const [isResizing, setIsResizing] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // 状态计算
    const isControlled = controlledCollapsed !== undefined
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed
    const width = controlledWidth ?? internalWidth
    const currentWidth = collapsed ? collapsedWidth : Math.max(width, MIN_WIDTH)

    /**
     * 更新宽度的函数
     * @param {number} newWidth - 新宽度值
     */
    const updateWidth = useCallback(
        newWidth => {
            // 限制宽度在MIN_WIDTH和MAX_WIDTH之间
            const clampedWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth))

            const sidebarElement = containerRef.current
            if (sidebarElement) {
                sidebarElement.style.width = `${clampedWidth}px`
                sidebarElement.style.minWidth = `${clampedWidth}px`
            }

            // 使用requestAnimationFrame优化性能
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                if (!isControlled) setInternalWidth(clampedWidth)
                onWidthChange?.(clampedWidth)
            })
        },
        [isControlled, onWidthChange]
    )

    /**
     * 处理拖拽开始的逻辑
     * @param {Event} e - 鼠标或触摸事件
     */
    const handleDragStart = useCallback(
        e => {
            // 处理鼠标和触摸事件
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
            dragStartXRef.current = clientX
            dragStartWidthRef.current = width
            const sidebarElement = containerRef.current

            /** 处理拖拽过程 */
            const handleDragging = e => {
                const now = Date.now()

                // 节流处理，限制更新频率
                if (now - lastUpdateTimeRef.current < THROTTLE_INTERVAL) return
                lastUpdateTimeRef.current = now

                const currentClientX = 'touches' in e ? e.touches[0].clientX : e.clientX

                // 根据位置计算宽度变化量
                const delta = position === 'left' ? currentClientX - dragStartXRef.current : dragStartXRef.current - currentClientX
                const newWidth = dragStartWidthRef.current + delta

                updateWidth(newWidth)
            }

            /** 处理拖拽结束 */
            const handleDragEnd = () => {
                // 移除事件监听
                window.removeEventListener('mousemove', handleDragging)
                window.removeEventListener('mouseup', handleDragEnd)
                window.removeEventListener('touchmove', handleDragging)
                window.removeEventListener('touchend', handleDragEnd)

                // 恢复鼠标样式和选择功能
                document.body.style.removeProperty('cursor')
                document.body.style.removeProperty('user-select')
                setIsResizing(false)

                // 同步最终状态
                if (sidebarElement) {
                    const finalWidth = parseFloat(sidebarElement.style.width)
                    setInternalWidth(finalWidth)
                    onWidthChange?.(finalWidth)
                }
            }

            // 添加事件监听
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

    /** 切换折叠/展开状态 */
    const toggleCollapse = useCallback(() => {
        const prev = isControlled ? controlledCollapsed : internalCollapsed
        const newCollapsed = !prev
        setIsAnimating(true)

        if (!isControlled) {
            setInternalCollapsed(newCollapsed)
            // 展开时确保宽度不小于最小值
            if (!newCollapsed && controlledWidth === undefined) {
                setInternalWidth(prev => Math.max(prev, MIN_WIDTH))
            }
        }

        // 触发外部回调
        onCollapsedChange?.(newCollapsed)

        // 清理之前的动画定时器
        if (animationTimeoutIdRef.current) {
            clearTimeout(animationTimeoutIdRef.current)
        }

        // 动画完成后更新状态
        animationTimeoutIdRef.current = setTimeout(() => {
            setIsAnimating(false)
        }, ANIMATION_DURATION)
    }, [isControlled, controlledCollapsed, internalCollapsed, controlledWidth, onCollapsedChange])

    /** 清理动画帧和定时器 */
    useEffect(
        () => () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (animationTimeoutIdRef.current) {
                clearTimeout(animationTimeoutIdRef.current)
            }
        },
        []
    )

    // 动态计算类名
    const borderClass = position === 'left' ? 'border-r' : 'border-l'
    const ChevronIcon = position === 'left' ? ChevronLeft : ChevronRight
    const rotationClass = collapsed ? (position === 'left' ? 'rotate-180' : '-rotate-180') : 'rotate-0'

    return (
        <aside
            ref={containerRef}
            className={cn(
                'relative h-full flex flex-col bg-background',
                'transition-all duration-300 ease-in-out will-change-[width]',
                isResizing && 'transition-none select-none',
                borderClass,
                collapsed && 'border-0',
                className
            )}
            style={{
                width: currentWidth,
                minWidth: currentWidth,
                ...style,
            }}
            aria-expanded={!collapsed}
            tabIndex={0}
        >
            {/* 拖拽手柄 - 仅在可调整大小且未折叠时显示 */}
            {resizable && !collapsed && (
                <div
                    className={cn(
                        'absolute top-0 h-full z-20',
                        'hover:bg-primary/10 active:bg-primary/20',
                        'transition-colors cursor-col-resize',
                        'transition-transform duration-150 ease-in-out transform active:scale-x-125 origin-center',
                        position === 'left' ? '-right-0.5 w-1 ' : '-left-0.5 w-1'
                    )}
                    onMouseDown={e => {
                        e.preventDefault()
                        handleDragStart(e.nativeEvent)
                    }}
                    onTouchStart={e => {
                        e.preventDefault()
                        handleDragStart(e.nativeEvent)
                    }}
                    style={{
                        transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    role='slider'
                    aria-label='拖拽调整侧边栏宽度'
                    aria-valuenow={width}
                    aria-valuemin={MIN_WIDTH}
                    aria-valuemax={MAX_WIDTH}
                >
                    <GripVertical className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                </div>
            )}

            {/* 折叠/展开按钮 */}
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
                aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
                disabled={isAnimating}
            >
                <ChevronIcon className={cn('size-5 transition-transform duration-300 ease-in-out', rotationClass)} />
            </Button>

            {/* 内容容器 */}
            <div className='flex-1 overflow-hidden relative'>
                <div
                    ref={contentRef}
                    className={cn(
                        'absolute inset-0 transition-all duration-300 ease-in-out will-change-[opacity,transform]',
                        collapsed ? 'opacity-0 translate-x-2 pointer-events-none' : 'opacity-100 translate-x-0'
                    )}
                    style={{
                        minWidth: expandedWidth,
                    }}
                >
                    {children}
                </div>
            </div>
        </aside>
    )
}

CollapsedWrapper.displayName = 'CollapsedWrapper'

export default memo(CollapsedWrapper)
