'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'

export const FilterCarousel = ({ value, isLoading, onSelect, data }) => {
    const [api, setApi] = useState()
    const [count, setCount] = useState(0)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className='relative w-full'>
            {/* Left fade */}
            <div
                className={cn(
                    'absolute left-4 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none',
                    current === 1 && 'hidden'
                )}
            />
            <Carousel
                setApi={setApi}
                opts={{
                    align: 'start',
                    dragFree: true,
                }}
                className='w-full px-4'
            >
                <CarouselContent className='-ml-3'>
                    {!isLoading &&
                        data?.map(item => (
                            <CarouselItem key={item.value} onClick={() => onSelect(item.value)} className='pl-3 basis-auto'>
                                <Badge
                                    variant={value === item.value ? 'default' : 'secondary'}
                                    className='rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm'
                                >
                                    {item.label}
                                </Badge>
                            </CarouselItem>
                        ))}
                    {isLoading &&
                        Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className='pl-3 basis-auto'>
                                <Skeleton className='rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold'>&nbsp;</Skeleton>
                            </CarouselItem>
                        ))}
                </CarouselContent>
                {current !== 1 && <CarouselPrevious className='left-0 z-20' />}
                {current !== count && <CarouselNext className='right-0 z-20' />}
            </Carousel>
            {/* Right fade */}
            <div
                className={cn(
                    'absolute right-4 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none',
                    current === count && 'hidden'
                )}
            />
        </div>
    )
}
