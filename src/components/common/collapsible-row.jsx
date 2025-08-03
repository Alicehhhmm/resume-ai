'use client'

import * as React from 'react'
import { ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const CollapsibleRow = ({ title, open = false, className, contentClassName, children }) => {
    const [isOpen, setIsOpen] = React.useState(open)

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn('flex flex-col border-b', className)}>
            <div className='h-10 flex items-center justify-start gap-1 px-2 pb-2'>
                <CollapsibleTrigger asChild>
                    <Button variant='ghost' size='panel'>
                        <ChevronsUpDown className='panel-icon' />
                    </Button>
                </CollapsibleTrigger>
                <Label className='text-sm font-medium'>{title}</Label>
            </div>
            <CollapsibleContent className={cn('flex flex-col px-4 pb-4 text-sm font-normal text-muted-foreground', contentClassName)}>
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapsibleRow
