import { useCallback, useEffect, useState } from 'react'

/**
 * useAutoPagination
 * @param {Object} options
 *   - measureRef: React ref to the hidden measurement container (DOM)
 *   - pageHeight: number px (A4 default 1123)
 *   - pageWidth: number px (optional, for width-constrained measurement)
 *   - observe: boolean (default true) whether to attach ResizeObserver
 *
 * returns: { pages: string[][], pageCount }
 *   - pages: array of pages; each page is an array of HTML strings for nodes on that page
 */
export function useAutoPagination({ measureRef, pageHeight = 1123, pageWidth, observe = true }) {
    const [pages, setPages] = useState([])

    const paginate = useCallback(() => {
        const root = measureRef?.current
        if (!root) {
            setPages([])
            return
        }

        // children nodes to measure
        const children = Array.from(root.children)
        const pageList = []
        let currentPage = []
        let accHeight = 0

        for (const node of children) {
            const h = node.offsetHeight
            // if single node taller than pageHeight: push it anyway (or handle splitting if required)
            if (accHeight + h > pageHeight && currentPage.length > 0) {
                pageList.push(currentPage)
                currentPage = []
                accHeight = 0
            }
            currentPage.push(node.outerHTML)
            accHeight += h
        }

        if (currentPage.length > 0) {
            pageList.push(currentPage)
        }

        setPages(pageList)
    }, [measureRef, pageHeight])

    useEffect(() => {
        if (!measureRef?.current) return
        // initial paginate
        paginate()

        if (!observe) return

        const ro = new ResizeObserver(() => {
            paginate()
        })
        ro.observe(measureRef.current)

        return () => ro.disconnect()
    }, [measureRef, paginate, observe])

    return {
        pages,
        pageCount: pages.length,
    }
}
