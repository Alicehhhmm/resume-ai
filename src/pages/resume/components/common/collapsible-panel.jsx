import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function CollapsiblePanel({ value, title, children }) {
    return (
        <AccordionItem value={value} className='border rounded'>
            <AccordionTrigger className='bg-accent rounded p-4 '>
                <span className='text-lg font-semibold'>{title}</span>
            </AccordionTrigger>
            <AccordionContent className='p-4 bg-background'>{children}</AccordionContent>
        </AccordionItem>
    )
}

export default CollapsiblePanel
