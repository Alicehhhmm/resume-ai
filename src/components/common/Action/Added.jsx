import { forwardRef } from 'react'

import { SquarePlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Added = forwardRef(({ cursor = 'pointer', children, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            variant='ghost'
            size='icon'
            className={cn(
                'size-8 active:scale-90 text-muted-foreground/60 active:text-primary',
                cursor && `cursor-${cursor}`,
                'hover:bg-muted hover:text-primary',
                'transition-colors duration-200'
            )}
            {...props}
        >
            {!children && <SquarePlusIcon size='16' />}
            {children}
        </Button>
    )
})
