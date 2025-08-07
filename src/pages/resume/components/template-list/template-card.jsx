import { useEffect, useState, useMemo, useRef } from 'react'

import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'

import dummy from '@/data/dummy'
import { RESUME_PAGE } from '@/constants'

function TemplateCard({ resumeId, title, description, category, thumbnail, isActive, onClick, component: Component, ...restProps }) {
    // A4 size constants
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

    const onHandle = () => {
        onClick?.({
            title,
            category,
            id: restProps?.id,
        })
    }

    return (
        <AspectRatio
            ref={aspectRatioRef}
            ratio={1 / 1.4142}
            onClick={onHandle}
            className={cn(
                'group relative rounded-lg border border-border bg-card',
                'overflow-hidden cursor-pointer transition-all duration-200',
                'hover:border-primary/10 hover:shadow-lg focus:outline-none',
                isActive && 'border-primary ring-1 ring-primary/30'
            )}
        >
            {/* Thumbnail box */}
            <div className='absolute top-1/2 left-1/2 origin-center' style={transformStyle}>
                {!thumbnail && <ResumeComponent resumeInfo={dummy} />}
                {thumbnail && <img src={thumbnail || '/placeholder.svg'} alt={title} className='rounded-lg object-cover' />}
            </div>

            <div
                className={cn(
                    'absolute inset-0 bg-gradient-to-t from-accent to-transparent p-4',
                    'flex flex-col justify-end opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200'
                )}
            >
                <h3 className='font-medium text-sm'>{title}</h3>
                <p className='text-xs text-muted-foreground'>{description}</p>
            </div>
        </AspectRatio>
    )
}

export default TemplateCard
