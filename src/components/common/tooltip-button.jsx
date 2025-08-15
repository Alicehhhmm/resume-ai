import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export { TooltipProvider } from '@/components/ui/tooltip'

export const ToolButton = ({ children, tooltip, onClick, disabled = false, active = false }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        'size-8 rounded-md hover:bg-accent',
                        active && 'bg-accent text-primary',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom' className='py-2 px-3 text-white/60  dark:text-zinc-600'>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}
