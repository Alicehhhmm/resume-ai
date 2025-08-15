import { useEffect } from 'react'
import { useControls } from 'react-zoom-pan-pinch'

/**
 * CenterOnResize
 * -------------------------
 * 用于在 TransformWrapper 内部保持画布居中和初始化缩放（可控：fitOnInit）。
 *
 * 主要用途：
 *  1. 如果 fitOnInit=true，则初始自动缩放以适配画布到可视区域（考虑边距和保留空间）。
 *  2. 在视口尺寸变化时自动重新居中（保持当前缩放比例），
 *     避免由于左右/上下面板宽度变化导致画布偏移。
 *
 * ⚠️ 注意：必须放置在 TransformWrapper 内部，否则 useControls 无法工作。
 *
 * @param {Object} props
 * @param {React.RefObject} props.viewportRef - TransformWrapper 外层视口元素的 ref
 * @param {boolean} props.disabled 是否禁用，居中计算（默认false：允许居中计算）
 * @param {'vertical'|'horizontal'} [props.direction='vertical'] - 页面排列方向
 * @param {number} [props.pageCount=1] - 页面数量，用于计算整体画布大小
 * @param {{width:number,height:number}} [props.pageSize] - 单页宽高（单位：px）
 * @param {number} [props.pageGap=40] - 页面之间的间距（单位：px）
 * @param {boolean} [props.fitOnInit=true] - 是否在初始化时自动计算最佳缩放比例以适配画布
 * @param {number} [props.margin=20] - 画布周围的额外可视边距（单位：px）
 * @param {{top:number,right:number,bottom:number,left:number}} [props.reservedSpace] - 保留空间（如尺子、工具栏、面板）
 */
export function CenterOnResize({
    viewportRef,
    disabled = false,
    direction = 'vertical',
    pageCount = 1,
    pageSize = { width: 794, height: 1123 },
    pageGap = 40,
    fitOnInit = true,
    margin = 20,
    reservedSpace = { top: 0, right: 0, bottom: 0, left: 0 },
}) {
    const { setTransform, state = {} } = useControls()
    const scale = typeof state.scale === 'number' ? state.scale : undefined

    /**
     * 计算模板在画布中的整体尺寸:
     * - 横向模式：宽度 = 所有页宽度之和 + 间距总和，高度 = 单页高度
     * - 纵向模式：宽度 = 单页宽度，高度 = 所有页高度之和 + 间距总和
     */
    const computeCanvasSize = () => {
        const { width: pw, height: ph } = pageSize

        if (direction === 'horizontal') {
            const width = pw * pageCount + pageGap * (pageCount - 1)
            const height = ph
            return { width, height }
        }

        const width = pw
        const height = ph * pageCount + pageGap * (pageCount - 1)
        return { width, height }
    }

    useEffect(() => {
        if (disabled || !viewportRef?.current) return

        /**
         * 核心居中逻辑：
         * 1. 获取视口尺寸（减去保留空间）
         * 2. 根据画布大小计算最佳初始缩放比例（fitOnInit 时）
         * 3. 计算水平/垂直居中偏移量
         * 4. 调用 setTransform 进行平移和缩放
         */
        const doCenter = () => {
            const vp = viewportRef.current
            const { clientWidth, clientHeight } = vp

            // 视口可用空间（减去保留空间）
            const availableWidth = clientWidth - reservedSpace.left - reservedSpace.right
            const availableHeight = clientHeight - reservedSpace.top - reservedSpace.bottom

            const { width: canvasWidth, height: canvasHeight } = computeCanvasSize()

            let targetScale = scale

            // 初始化时计算最佳缩放比例（不超过 1:1 原始大小）
            if (typeof targetScale !== 'number' && fitOnInit) {
                targetScale = Math.min((availableWidth - margin * 2) / canvasWidth, (availableHeight - margin * 2) / canvasHeight, 1)
            }

            // 如果有有效缩放比例，则计算居中偏移
            if (typeof targetScale === 'number') {
                const offsetX = reservedSpace.left + (availableWidth - canvasWidth * targetScale) / 2
                const offsetY = reservedSpace.top + (availableHeight - canvasHeight * targetScale) / 2
                setTransform(offsetX, offsetY, targetScale)
            }
        }

        doCenter()
        const ro = new ResizeObserver(doCenter)
        ro.observe(viewportRef.current)

        return () => ro.disconnect()
    }, [
        viewportRef,
        direction,
        pageCount,
        pageSize.width,
        pageSize.height,
        pageGap,
        fitOnInit,
        setTransform,
        scale,
        margin,
        reservedSpace.top,
        reservedSpace.right,
        reservedSpace.bottom,
        reservedSpace.left,
    ])

    return null
}
