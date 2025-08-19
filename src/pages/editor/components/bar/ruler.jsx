'use client'

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Ruler from '@scena/react-ruler'
import { debounce } from 'lodash-es'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { useTheme } from '@/components/provider'

const rulerWrapper = cva('absolute pointer-events-auto shadow select-none text-[10px] font-medium', {
    variants: {
        orientation: {
            horizontal: 'border-b h-6 flex items-end',
            vertical: 'border-r w-6 flex flex-col items-center',
        },
        theme: {
            light: 'bg-background border-border text-muted-foreground',
            dark: 'bg-muted border-border text-muted-foreground',
        },
    },
    defaultVariants: {
        theme: 'light',
    },
})

const cornerBox = cva('absolute top-0 left-0 flex items-center justify-center text-[11px] font-medium w-6 h-6 z-10', {
    variants: {
        theme: {
            light: 'bg-muted text-muted-foreground border-b border-r border-border',
            dark: 'bg-muted text-muted-foreground border-b border-r border-border',
        },
    },
    defaultVariants: {
        theme: 'light',
    },
})

export const RulerPresets = {
    document: { unit: 50, theme: 'light', size: 40 },
    image: { unit: 25, theme: 'dark', size: 30 },
    cad: { unit: 10, theme: 'light', size: 35, precision: 0.001 },
    mobile: { unit: 50, size: 30, visible: false },
    performance: { debounce: 33, precision: 0.1, unit: 100 },
}

// 默认主题配置
const THEME_CONFIG = {
    light: {
        ruler: {
            backgroundColor: '#f2f2f2',
            lineColor: '#23242556',
            textColor: '#0f172a',
        },
    },
    dark: {
        ruler: {
            backgroundColor: '#262626',
            lineColor: '#666666',
            textColor: '#a1a1a1',
        },
    },
}

// 默认配置
const DEFAULT_CONFIG = {
    unit: 50,
    size: 30,
    debounce: 16,
    precision: 25,
    segment: 10,
    visible: true,
}

/**
 * EditorRulers - 编辑器画布尺子组件
 *
 * @param {Object} props
 * @param {number} [props.scale=1] - 缩放倍数
 * @param {number} [props.positionX=0] - X方向平移
 * @param {number} [props.positionY=0] - Y方向平移
 * @param {Object} [props.options={}] - 可选配置
 * @param {number} [props.options.unit=50] - 单位长度
 * @param {number} [props.options.size=30] - 尺子大小
 * @param {'light'|'dark'} [props.options.theme] - 主题，默认使用系统主题
 * @param {number} [props.options.debounce=16] - 防抖延迟（毫秒）
 * @param {number} [props.options.precision=25] - 精度阈值
 * @param {number} [props.options.segment=10] - 分段数
 * @param {boolean} [props.options.visible=true] - 是否显示
 */
function EditorRulers({ scale = 1, positionX = 0, positionY = 0, options = {} }) {
    const { theme: systemTheme } = useTheme()

    // 默认配置
    const config = useMemo(
        () => ({
            ...DEFAULT_CONFIG,
            theme: systemTheme ?? 'dark',
            ...options,
        }),
        [systemTheme, options]
    )

    const theme = useMemo(() => THEME_CONFIG[config.theme] || THEME_CONFIG.light, [config.theme])

    // States
    const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 })
    const prevRef = useRef({ scale, positionX, positionY })
    const rulerWrapperRef = useRef(null)

    // 防抖更新
    const updateScrollPos = useCallback(
        debounce((newScale, newX, newY) => {
            const scrollX = Math.round((-newX / newScale) * 100) / 100
            const scrollY = Math.round((-newY / newScale) * 100) / 100

            setScrollPos(prev => {
                const shouldUpdate = Math.abs(prev.x - scrollX) > config.precision || Math.abs(prev.y - scrollY) > config.precision

                return shouldUpdate ? { x: scrollX, y: scrollY } : prev
            })
        }, config.debounce),
        [config.debounce, config.precision]
    )

    // 监听 scale/position 变化
    useEffect(() => {
        const prev = prevRef.current
        const hasScaleChanged = Math.abs(prev.scale - scale) > 0.001
        const hasXChanged = Math.abs(prev.positionX - positionX) > 0.5
        const hasYChanged = Math.abs(prev.positionY - positionY) > 0.5

        if (hasScaleChanged || hasXChanged || hasYChanged) {
            prevRef.current = { scale, positionX, positionY }
            updateScrollPos(scale, positionX, positionY)
        }

        return () => updateScrollPos.cancel?.()
    }, [scale, positionX, positionY, updateScrollPos])

    // 标尺属性
    const rulerProps = useMemo(
        () => ({
            zoom: Math.max(scale, 0.001),
            unit: config.unit,
            segment: config.segment,
            ...theme.ruler,
        }),
        [scale, config.unit, config.segment, theme.ruler]
    )

    const resizeObserver = useMemo(() => {
        const element = rulerWrapperRef.current
        return {
            width: element?.clientWidth || 0,
            height: element?.clientHeight || 0,
        }
    }, [rulerWrapperRef.current?.clientWidth, rulerWrapperRef.current?.clientHeight])

    if (!config.visible) return null

    return (
        <div ref={rulerWrapperRef} className='absolute inset-0 pointer-events-none z-20'>
            {/* 横向标尺 */}
            <div
                className={cn(rulerWrapper({ orientation: 'horizontal', theme: config.theme }), 'size-full')}
                style={{ left: config.size, height: config.size, right: 0, top: 0 }}
            >
                <Ruler type='horizontal' scrollPos={scrollPos.x} width={resizeObserver.width} {...rulerProps} />
            </div>

            {/* 纵向标尺 */}
            <div
                className={cn(rulerWrapper({ orientation: 'vertical', theme: config.theme }))}
                style={{ top: config.size, width: config.size, bottom: 0, left: 0 }}
            >
                <Ruler type='vertical' scrollPos={scrollPos.y} height={resizeObserver.height} {...rulerProps} />
            </div>

            {/* 左上角 */}
            <div className={cn(cornerBox({ theme: config.theme }))} style={{ width: config.size, height: config.size }}>
                0
            </div>
        </div>
    )
}

export default React.memo(EditorRulers)
