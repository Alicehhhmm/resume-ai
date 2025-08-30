import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

function CollapsiblePanel({ value, title, children, className, ...props }) {
    return (
        <AccordionItem value={value} className={cn('rounded', className)} {...props}>
            <AccordionTrigger className='bg-muted/60 rounded p-4 hover:bg-muted active:bg-primary/10'>
                <span className='text-base font-sans font-semibold'>{title}</span>
            </AccordionTrigger>
            <AccordionContent className='text-pretty p-4 bg-background'>{children}</AccordionContent>
        </AccordionItem>
    )
}

export default React.memo(CollapsiblePanel)
