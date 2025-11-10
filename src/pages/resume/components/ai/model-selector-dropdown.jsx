import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

/**
 * @param {Object} props
 * @param {Array<{ label: string, value: string }>} props.models - 可选模型列表
 * @param {(value: string) => void} props.onChange - 模型选择回调
 * @param {string} [props.defaultValue] - 默认选中模型
 * @param {string} [props.className] - 自定义样式类
 */
function ModelSelectorDropdown({ models = [], onChange, defaultValue, className }) {
    const [selected, setSelected] = useState(defaultValue ?? models[0]?.value)

    const handleSelect = value => {
        setSelected(value)
        onChange?.(value)
    }

    const selectedLabel = models.find(m => m.value === selected)?.label ?? 'Select Model'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className={cn('min-w-[110px] justify-between', className)}>
                    <span className='font-medium'>{selectedLabel}</span>
                    <ChevronDown className='size-3.5 opacity-50' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='start' side='bottom' className='w-44 space-y-1'>
                {models.map(model => (
                    <DropdownMenuItem
                        key={model.value}
                        onClick={() => handleSelect(model.value)}
                        className={cn(
                            'cursor-pointer flex items-center justify-between',
                            selected === model.value && 'bg-accent/80 font-medium'
                        )}
                    >
                        <span>{model.label}</span>
                        {selected === model.value && <Check className='size-3.5 text-primary' />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ModelSelectorDropdown
