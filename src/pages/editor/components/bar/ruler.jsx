'use client'

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Ruler from '@scena/react-ruler'
import { debounce } from 'lodash-es'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Theme Monitoring
 * @returns {string} light | dark
 */
function useHtmlTheme() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const html = document.documentElement

        const getTheme = () => html.getAttribute('data-theme') || (html.classList.contains('dark') ? 'dark' : 'light')

        setTheme(getTheme())

        const observer = new MutationObserver(() => setTheme(getTheme()))
        observer.observe(html, { attributes: true, attributeFilter: ['class', 'data-theme'] })

        return () => observer.disconnect()
    }, [])

    return theme
}

const rulerWrapper = cva('absolute pointer-events-auto shadowselect-none text-[10px] font-medium', {
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

/**
 * EditorRulers - 编辑器画布尺子
 *
 * @param {number} scale - 缩放倍数
 * @param {number} positionX - X方向平移
 * @param {number} positionY - Y方向平移
 * @param {Object} options - 可选配置（theme, unit, size, debounce, precision, visible）
 */
function EditorRulers({ scale = 1, positionX = 0, positionY = 0, options = {} }) {
    const systemTheme = useHtmlTheme()

    // 默认配置
    const config = {
        unit: 50,
        size: 30,
        theme: systemTheme ?? 'dark',
        debounce: 16,
        precision: 25,
        segment: 10,
        visible: true,
        ...options,
    }

    if (!config.visible) return null

    // 主题色配置
    const themeConfig = {
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

    const theme = themeConfig[config.theme] || themeConfig.light

    // States
    const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 })
    const prevRef = useRef({ scale, positionX, positionY })

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
        const hasChanged =
            Math.abs(prev.scale - scale) > 0.001 || Math.abs(prev.positionX - positionX) > 0.5 || Math.abs(prev.positionY - positionY) > 0.5

        if (hasChanged) {
            prevRef.current = { scale, positionX, positionY }
            updateScrollPos(scale, positionX, positionY)
        }

        return () => updateScrollPos.cancel?.()
    }, [scale, positionX, positionY, updateScrollPos])

    // 标尺属性
    const rulerProps = useMemo(
        () => ({
            zoom: scale,
            unit: config.unit,
            segment: config.segment,
            ...theme.ruler,
        }),
        [config.unit, scale, theme.ruler]
    )

    return (
        <div className='absolute inset-0 pointer-events-none z-20'>
            {/* 横向标尺 */}
            <div
                className={cn(rulerWrapper({ orientation: 'horizontal', theme: config.theme }))}
                style={{ left: config.size, height: config.size, right: 0, top: 0 }}
            >
                <Ruler type='horizontal' scrollPos={scrollPos.x} {...rulerProps} />
            </div>

            {/* 纵向标尺 */}
            <div
                className={cn(rulerWrapper({ orientation: 'vertical', theme: config.theme }))}
                style={{ top: config.size, width: config.size, bottom: 0, left: 0 }}
            >
                <Ruler type='vertical' scrollPos={scrollPos.y} {...rulerProps} />
            </div>

            {/* 左上角 */}
            <div className={cn(cornerBox({ theme: config.theme }))} style={{ width: config.size, height: config.size }}>
                0
            </div>
        </div>
    )
}

export default React.memo(EditorRulers)
