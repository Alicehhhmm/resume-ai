'use client'

import { useEffect, useCallback } from 'react'
import { useControls, useTransformContext } from 'react-zoom-pan-pinch'

import { useEditor } from '@/pages/editor/components/editor-provider'
import { PAGE_SIZE, PAGE_INIT_SCALE } from '@/pages/editor/constants'

/**
 * Future change to hooks
 */

/**
 * 获取 PageLayout 的尺寸和缩放比例
 */
export const usePageLayoutSize = () => {
    const { pageMode } = useEditor()
    const { transformState } = useTransformContext()

    if (!pageMode?.pageLayoutRef?.current) {
        return {
            ...PAGE_SIZE,
            scale: transformState?.scale || PAGE_INIT_SCALE,
        }
    }

    const { clientWidth, clientHeight } = pageMode.pageLayoutRef.current

    return {
        pageWidth: clientWidth,
        pageHeight: clientHeight,
        pageScale: transformState?.scale || PAGE_INIT_SCALE,
    }
}

/**
 * 计算 PageLayout 在视口中的偏移量 Offset
 *
 */
export const usePageLayoutTransform = () => {
    const { boardMode } = useEditor()
    const { viewportRef, reservedSpace = {}, viewportMargin = 20 } = boardMode || {}
    const { pageWidth, pageHeight, pageScale } = usePageLayoutSize()

    return useCallback(() => {
        if (!viewportRef?.current) {
            return {
                offsetX: 0,
                offsetY: 0,
                targetScale: 1,
            }
        }

        const { clientWidth, clientHeight } = viewportRef.current

        let targetScale = pageScale
        let offsetX = 0
        let offsetY = 0

        const space = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...reservedSpace,
        }

        const availableWidth = clientWidth - space.left - space.right
        const availableHeight = clientHeight - space.top - space.bottom

        if (typeof targetScale === 'number' && pageWidth > 0 && pageHeight > 0) {
            offsetX = space.left + (availableWidth - pageWidth * targetScale) / 2
            offsetY = space.top + (availableHeight - pageHeight * targetScale) / 2
        }

        // TODO: pageCount > 1 && center to page1

        return {
            offsetX,
            offsetY,
            targetScale,
        }
    }, [viewportRef, pageScale, pageWidth, pageHeight, reservedSpace, viewportMargin])
}

/**
 * 居中页面的 Hook
 * - 返回一个可以直接调用的函数
 */
export const useCenterOnViewport = () => {
    const { setTransform } = useControls()
    const getTransform = usePageLayoutTransform()

    return useCallback(() => {
        const { offsetX, offsetY, targetScale } = getTransform()
        setTransform(offsetX, offsetY, targetScale)
    }, [getTransform, setTransform])
}

/**
 * 在视口尺寸变化时自动居中
 * - 必须放在 TransformWrapper 内部
 */
export function CenterOnResize({ viewportRef, disabled = false }) {
    const centerOnViewport = useCenterOnViewport()

    useEffect(() => {
        if (disabled || !viewportRef?.current) return

        const ro = new ResizeObserver(centerOnViewport)
        ro.observe(viewportRef.current)

        return () => ro.disconnect()
    }, [viewportRef, disabled, centerOnViewport])

    return null
}
