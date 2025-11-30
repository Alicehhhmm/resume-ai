import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function More({ cursor, className, ...props }) {
    return (
        <Button
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
            <MoreVerticalIcon size={14} />
        </Button>
    )
}
