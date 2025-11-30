import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function CollapsedGroup({ className, ...props }) {
    return (
        <CollapsiblePrimitive.Root
            data-slot='collapsible-group'
            className={cn('border-b border-border/90 data-[state=open]:pb-3', className)}
            {...props}
        />
    )
}

function CollapsedGroupTrigger({ className, ...props }) {
    return <CollapsiblePrimitive.CollapsibleTrigger data-slot='collapsible-group-trigger' {...props} />
}

function CollapsedGroupTriggerButton({ className, ...props }) {
    return (
        <CollapsiblePrimitive.Trigger
            data-slot='collapsible-group-trigger-button'
            className={cn(
                'py-2.5 active:text-primary',
                'inline-flex items-center justify-center transition-all outline-none',
                'hover:underline disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
                className
            )}
            {...props}
        >
            <ChevronDownIcon className='text-muted-foreground pointer-events-none size-3.5 shrink-0 transition-transform duration-200' />
        </CollapsiblePrimitive.Trigger>
    )
}

function CollapsedGroupContent({ className, ...props }) {
    return (
        <CollapsiblePrimitive.Content
            data-slot='collapsible-group-content'
            className={`px-3 py-2 data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down ${className}`}
            {...props}
        />
    )
}

function CollapsedGroupHeader({ children, className }) {
    return (
        <div
            className={cn(
                `flex items-center justify-between px-3 py-2 select-none cursor-pointer group relative`,
                'hover:bg-accent/50 transition-colors text-sm font-medium',
                className
            )}
            data-slot='collapsible-group-header'
        >
            {children}
        </div>
    )
}

function CollapsedGroupActions({ site = 'left', children, className, ...props }) {
    return (
        <div className={`flex items-center gap-1 ${className}`} {...props}>
            {site === 'left' && children}
            {site === 'right' && children}
        </div>
    )
}

function CollapsedGroupTitle({ children, className }) {
    return <div className={`text-sm font-medium leading-none ${className}`}>{children}</div>
}

function CollapsedGroupItem({ children, className }) {
    return <div className={`border-b last:border-none ${className}`}>{children}</div>
}

export {
    CollapsedGroup,
    CollapsedGroupTrigger,
    CollapsedGroupContent,
    CollapsedGroupTriggerButton,
    CollapsedGroupHeader,
    CollapsedGroupTitle,
    CollapsedGroupActions,
    CollapsedGroupItem,
}
