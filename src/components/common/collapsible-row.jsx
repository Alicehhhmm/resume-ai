'use client'

import React, { Fragment } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export const CollapsibleRowContentGroup = ({ className, children, ...props }) => {
    return (
        <div className={cn('space-y-2', className)} {...props}>
            {children}
        </div>
    )
}

export const CollapsibleRowContentLabel = ({ label, rightAsChild, className, labelClassName, ...props }) => {
    return (
        <div className={cn('flex justify-between items-center', className)} {...props}>
            <Label className={cn('text-[11px] font-medium text-foreground/80 tracking-wide', labelClassName)}>{label}</Label>
            {rightAsChild && <Fragment>{rightAsChild}</Fragment>}
        </div>
    )
}

export const CollapsibleRowContentUnit = ({ value = 0, unit = '' }) => {
    return (
        <span className='font-medium text-[11px] text-foreground/70 tabular-nums'>
            {value}
            {unit}
        </span>
    )
}

const CollapsibleRow = ({ title, open = false, className, contentClassName, rightAsChild, children }) => {
    const [isOpen, setIsOpen] = React.useState(open)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={cn('w-full flex flex-col border-b border-border/90 data-[state=open]:pb-3', className)}
        >
            <div
                className={cn(
                    'flex items-center justify-between h-9 pl-1 pr-2 select-none relative',
                    'hover:bg-accent/50 transition-colors'
                )}
            >
                <CollapsibleTrigger asChild>
                    <div className='flex-1 pl-3 cursor-pointer group relative'>
                        <ChevronDown
                            className={cn(
                                'absolute left-0 top-1/2 -translate-y-1/2 size-3 text-muted-foreground transition-transform duration-200',
                                isOpen ? 'rotate-0' : '-rotate-90',
                                'opacity-0 group-hover:opacity-100'
                            )}
                        />
                        <Label className={cn('text-xs font-medium text-foreground/60', isOpen && 'text-foreground ')}>{title}</Label>
                    </div>
                </CollapsibleTrigger>

                {rightAsChild && <Fragment>{rightAsChild}</Fragment>}
            </div>

            <CollapsibleContent
                className={cn(
                    'flex flex-col gap-2 px-4 py-2 text-[11px] font-normal text-muted-foreground',
                    'transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp',
                    contentClassName
                )}
            >
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapsibleRow
