import { useMemo } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import TemplateCard from './template-card'

const TemplateGrid = ({ isLoading, category, selectedId, onSelect, templates, className, children }) => {
    // Method

    const items = useMemo(() => {
        if (!templates || Object.keys(templates).length === 0) return []

        if (category === 'all') return Object.values(templates).flat()

        return templates[category] || []
    }, [templates, category])

    // Render

    if (!items || items.length === 0) {
        return <div className='flex h-full items-center justify-center text-muted-foreground'>No template</div>
    }

    if (isLoading) {
        return (
            <div className='h-full px-4 py-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className='rounded-lg aspect-[1/1.4142] ' />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <ScrollArea className={`h-full ${className}`}>
            <div className='grid grid-cols-1 md:grid-cols-2 @lg/right:grid-cols-3 @2xl/right:grid-cols-4 gap-4 p-4'>
                {items.map((template, index) => (
                    <div key={template.id} role='gridcell'>
                        <TemplateCard {...template} isActive={selectedId === template.id} onClick={onSelect} />
                    </div>
                ))}
            </div>
            {children}
        </ScrollArea>
    )
}

export default TemplateGrid
export { TemplateGrid }
