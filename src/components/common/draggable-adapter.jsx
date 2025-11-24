import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'

import { cn } from '@/lib/utils'

function Wrapper({ children, className, ...props }) {
    return (
        <div data-slot='draggable-wrapper' className={cn('flex flex-col', className)} {...props}>
            {children}
        </div>
    )
}

function DragDropGroup({ children, className, style, ...props }) {
    return (
        <DragDropProvider {...props}>
            <Wrapper className={className} style={style}>
                {children}
            </Wrapper>
        </DragDropProvider>
    )
}

function DraggableItem({ dragId, index, children, className, ...props }) {
    const { ref, isDragging } = useSortable({ id: dragId, index })

    return (
        <div
            ref={ref}
            data-slot='draggable-item'
            className={cn('rounded transition-all duration-200', isDragging && 'opacity-50 scale-[1.02] shadow-lg  z-50', className)}
            {...props}
        >
            {children}
        </div>
    )
}

export { DragDropGroup, DraggableItem }
