import { useCallback } from 'react'

/**
 * useCenterOnResize
 * ---------------------------
 * - 计算 pageLayoutRef 在 viewportRef 内的缩放比例，居中偏移量。
 *
 * @param options
 *   - viewportRef: React.RefObject<HTMLElement>
 *   - pageLayoutRef: React.RefObject<HTMLElement>
 *
 * @returns {
 *   centerPage: () => { offsetX: number; offsetY: number; targetScale: number }
 * }
 *
 * @example
 * const { centerPage } = useCenterOnResize({
 *   viewportRef,
 *   pageLayoutRef,
 * })
 *
 */
export function useCenterOnResize({ viewportRef, pageLayoutRef, options = {} }) {
    const { margin = 30 } = options

    const centerPage = useCallback(() => {
        if (!viewportRef.current || !pageLayoutRef.current) {
            return { offsetX: 0, offsetY: 0, targetScale: 1 }
        }

        const { clientWidth: vpW, clientHeight: vpH } = viewportRef.current
        const { clientWidth: pageW, clientHeight: pageH } = pageLayoutRef.current

        const availableWidth = vpW - margin
        const availableHeight = vpH - margin

        const targetScale = Math.min(availableWidth / pageW, availableHeight / pageH, 1)
        const offsetX = (vpW - pageW * targetScale) / 2
        const offsetY = (vpH - pageH * targetScale) / 2

        return {
            offsetX: Number(offsetX.toFixed(2)),
            offsetY: Number(offsetY.toFixed(2)),
            targetScale: Number(targetScale.toFixed(2)),
        }
    }, [viewportRef, pageLayoutRef])

    return { centerPage }
}
