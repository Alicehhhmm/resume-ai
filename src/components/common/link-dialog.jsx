import { useState, useEffect, useMemo, useCallback } from 'react'
import { LinkIcon } from 'lucide-react'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function LinkDialog({ link, onChange, onSubmit, t }) {
    const [open, setOpen] = useState(false)

    const [state, setState] = useState({
        label: '',
        href: '',
        target: '_blank',
    })

    useEffect(() => {
        if (open) {
            setState({
                label: link?.label ?? '',
                href: link?.href ?? '',
                target: link?.target ?? '_blank',
            })
        }
    }, [open, link?.href, link?.label])

    const handleFieldChange = useCallback(
        (key, value) => {
            setState(prev => {
                const next = { ...prev, [key]: value }
                onChange?.(next)
                return next
            })
        },
        [onChange]
    )

    const handleConfirm = useCallback(() => {
        if (!state.label.trim() || !state.href.trim()) return
        onSubmit?.(state)
        setOpen(false)
    }, [onSubmit, state])

    const disabled = useMemo(() => {
        return !state.label.trim() || !state.href.trim()
    }, [state.label, state.href])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className={cn(
                        'group inline-flex items-center cursor-pointer',
                        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ',
                        'dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] '
                    )}
                >
                    <div className='flex items-center gap-1.5 w-full'>
                        <LinkIcon size={14} className={'flex-shrink-0 opacity-60'} />
                        <span className={'truncate min-w-0 text-base'}>{link?.label || link?.href || t('addLink') || 'Add a link'}</span>
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent align='start' className='w-72 rounded-lg p-4 border'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='link-href'>{t('link')}</Label>
                        <Input
                            id='link-href'
                            placeholder='https://example.com'
                            value={state.href}
                            onChange={e => handleFieldChange('href', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='link-label'>{t('text')}</Label>
                        <Input
                            id='link-label'
                            placeholder={t('linkPlaceholder') ?? 'example'}
                            value={state.label}
                            onChange={e => handleFieldChange('label', e.target.value)}
                        />
                    </div>

                    {onSubmit && (
                        <Button size='sm' disabled={disabled} onClick={handleConfirm} className='w-full rounded-md'>
                            {t('confirm') ?? 'confirm'}
                        </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default LinkDialog
