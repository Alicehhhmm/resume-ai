import { Grid3x3Icon, Dice4Icon, Eye, EyeOff } from 'lucide-react'

import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { cn } from '@/lib/utils'
import {
    ToolButton,
    CollapsibleRow,
    CollapsibleRowContentGroup,
    CollapsibleRowContentLabel,
    CollapsibleRowContentUnit,
} from '@/components/common'
import { useEditor } from '@/pages/editor/components'

import { useTransformLang } from '@/hooks'

const MeshSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
}

const MeshType = {
    LINES: 'lines',
    DOTS: 'dots',
}

const MeshColors = {
    GRAY: 'gray',
    BLUE: 'blue',
    GREEN: 'green',
}

const sizeToPixels = {
    [MeshSize.SM]: 8,
    [MeshSize.MD]: 16,
    [MeshSize.LG]: 24,
    [MeshSize.XL]: 32,
}

export const MeshSection = () => {
    // hooks

    const { t } = useTransformLang()
    const { meshPanel, setMeshPanel } = useEditor()

    // States

    const isDisabled = !meshPanel.show

    // Method

    const handleShowToggle = () => {
        setMeshPanel(prev => ({ ...prev, show: !prev.show }))
    }

    const handleSizeChange = val => {
        if (val) setMeshPanel(prev => ({ ...prev, size: val }))
    }

    const handleOpacityChange = val => {
        setMeshPanel(prev => ({ ...prev, opacity: val / 100 }))
    }

    const handleTypeChange = type => {
        if (type) setMeshPanel(prev => ({ ...prev, model: type }))
    }

    const handleColorChange = color => {
        setMeshPanel(prev => ({ ...prev, color }))
    }

    // common styles

    const toggleGroupItemStyles =
        'h-7 text-[11px] font-medium tracking-wide border transition-all duration-100 ' +
        'data-[state=on]:bg-primary/10 data-[state=on]:text-primary ' +
        'hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed'

    return (
        <CollapsibleRow
            open
            title='Background Mesh'
            rightAsChild={
                <ToolButton tooltip={meshPanel.show ? t('visible') : t('hidden')} onClick={handleShowToggle}>
                    {meshPanel.show ? <Eye /> : <EyeOff />}
                </ToolButton>
            }
        >
            <CollapsibleRowContentGroup>
                <CollapsibleRowContentLabel label={t('type')} />
                <ToggleGroup
                    type='single'
                    variant='outline'
                    value={meshPanel.model}
                    onValueChange={handleTypeChange}
                    className='grid grid-cols-2 gap-1'
                    disabled={isDisabled}
                >
                    <ToggleGroupItem value={MeshType.LINES} className={cn(toggleGroupItemStyles)}>
                        <Grid3x3Icon className='size-3.5' />
                        <span>{t('lines')}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value={MeshType.DOTS} className={cn(toggleGroupItemStyles)}>
                        <Dice4Icon className='size-3.5' />
                        <span>{t('dots')}</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </CollapsibleRowContentGroup>

            <CollapsibleRowContentGroup>
                <CollapsibleRowContentLabel
                    label={t('size')}
                    rightAsChild={<CollapsibleRowContentUnit value={sizeToPixels[meshPanel.size]} unit='px' />}
                />
                <ToggleGroup
                    type='single'
                    variant='outline'
                    value={meshPanel.size}
                    onValueChange={handleSizeChange}
                    className='grid grid-cols-4 gap-0.5'
                    disabled={isDisabled}
                >
                    {Object.values(MeshSize).map(size => (
                        <ToggleGroupItem key={size} value={size} className={cn(toggleGroupItemStyles)}>
                            {size}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </CollapsibleRowContentGroup>

            <CollapsibleRowContentGroup>
                <CollapsibleRowContentLabel label={t('color')} />
                <div className='grid grid-cols-5 gap-1'>
                    {Object.values(MeshColors).map(color => (
                        <Button
                            variant='outline'
                            onClick={() => handleColorChange(color)}
                            disabled={isDisabled}
                            className={cn(
                                'w-full h-7 rounded hover:scale-102',
                                meshPanel.color === color ? 'border-primary/30' : 'border-muted hover:border-primary/20',
                                isDisabled && 'opacity-50 cursor-not-allowed',
                                {
                                    'bg-slate-300 dark:bg-slate-600': color === MeshColors.GRAY,
                                    'bg-blue-200 dark:bg-blue-600': color === MeshColors.BLUE,
                                    'bg-emerald-200 dark:bg-emerald-600': color === MeshColors.GREEN,
                                }
                            )}
                        />
                    ))}
                </div>
            </CollapsibleRowContentGroup>

            <CollapsibleRowContentGroup>
                <CollapsibleRowContentLabel
                    label={t('opacity')}
                    rightAsChild={<CollapsibleRowContentUnit value={Math.round(meshPanel.opacity * 100)} unit='%' />}
                />
                <Slider
                    min={0}
                    max={100}
                    step={10}
                    value={[meshPanel.opacity * 100]}
                    onValueChange={val => handleOpacityChange(val[0])}
                    disabled={isDisabled}
                    className={cn('h-1.5 disabled:opacity-40 disabled:cursor-not-allowed')}
                />
            </CollapsibleRowContentGroup>
        </CollapsibleRow>
    )
}
