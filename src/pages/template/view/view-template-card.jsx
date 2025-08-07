import { useEffect, useState, useMemo, useRef } from 'react'

import dummy from '@/data/dummy'
import { Button } from '@/components/ui/button'
import { RESUME_PAGE } from '@/constants'

import { useSystemAuth } from '@/hooks'

function ViewTemplateCard({ resumeId, title, description, category, onHandleView, onHandleEdit, component: Component }) {
    // hooks

    const { isSignedIn } = useSystemAuth()

    // A4 size
    const RESUME_WIDTH = RESUME_PAGE.width
    const RESUME_HEIGHT = RESUME_PAGE.height

    const ResumeComponent = typeof Component === 'function' ? Component : () => <Component resumeInfo={dummy} />

    // States

    const aspectRatioRef = useRef(null)

    const [containerSize, setContainerSize] = useState({ width: 210, height: 279 })

    // Computed size

    useEffect(() => {
        const el = aspectRatioRef.current
        if (!el) return

        const resizeObserver = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            setContainerSize({
                width: width + 2,
                height: height + 2,
            })
        })

        resizeObserver.observe(el)
        return () => resizeObserver.disconnect()
    }, [])

    // memoize scale calculation
    const resumeScale = useMemo(() => {
        const { width, height } = containerSize
        if (!width || !height) return 1

        return Math.min(width / RESUME_WIDTH, height / RESUME_HEIGHT)
    }, [containerSize])

    // memoize transform style
    const transformStyle = useMemo(
        () => ({
            width: RESUME_WIDTH,
            height: RESUME_HEIGHT,
            transform: `translate(-50%, -50%) scale(${resumeScale})`,
        }),
        [resumeScale, RESUME_WIDTH, RESUME_HEIGHT]
    )

    // Method

    const onClickToView = (e, row) => {
        onHandleView?.(row)
    }

    const onClickToUse = (e, row) => {
        onHandleEdit?.(row)
    }

    return (
        <div className='group flex flex-col items-stretch'>
            <div
                ref={aspectRatioRef}
                className={`
                        relative w-full aspect-[1/1.4142] rounded-xl overflow-hidden bg-background shadow-sm
                        transition-all duration-300 ease-out 
                        group-hover:shadow-lg group-hover:-translate-y-1 group-hover:-translate-x-1
                        group-hover:border-r-3 group-hover:border-b-3 group-hover:border-primary/40
                    `}
            >
                {/* Thumbnail box */}
                <div className='absolute top-1/2 left-1/2 origin-center' style={transformStyle}>
                    <ResumeComponent resumeInfo={dummy} />
                </div>

                {/* Mask layer */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300'></div>

                {/* Bottom operation */}
                <div className='absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'>
                    <div className='flex gap-2'>
                        <Button size='sm' variant='secondary' className='flex-1' onClick={e => onClickToView(e, { category, resumeId })}>
                            Preview
                        </Button>
                        {isSignedIn && (
                            <Button size='sm' variant='default' className='flex-1' onClick={e => onClickToUse(e, { category, resumeId })}>
                                Use
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-3 px-2 text-left'>
                <h3 className='text-sm font-semibold text-foreground line-clamp-1'>{title}</h3>
                <p className='text-xs text-muted-foreground line-clamp-2'>{description}</p>
            </div>
        </div>
    )
}

export default ViewTemplateCard
