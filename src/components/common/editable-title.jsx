'use client'

import React, { useRef, useState } from 'react'
import { PenLine } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

/**
 * 可编辑标题组件
 *
 * 支持以下交互行为：
 * - 点击图标按钮或双击文字可切换为编辑状态
 * - 按下 Enter 键保存并退出编辑
 * - 按下 Escape 键取消编辑并恢复原始值
 * - 输入框失焦时自动保存
 *
 * @param name - 表单字段名（可选）
 * @param defaultValue - 默认标题文本
 * @param showIcon - 是否显示编辑图标
 * @param onChange - 标题变更时的回调
 * @param placeholder - 占位符文本
 */
function EditableTitle({ name, defaultValue = 'Untitled', showIcon = true, onChange, placeholder = 'Please input content.' }) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(defaultValue)
    const inputRef = useRef(null)

    const handleEdit = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        }, 0)
    }

    const handleBlur = () => {
        setIsEditing(false)
        onChange?.(value.trim())
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            inputRef.current?.blur()
        }
        if (e.key === 'Escape') {
            setValue(defaultValue)
            setIsEditing(false)
        }
    }

    return (
        <div className='group flex items-center gap-1 px-2 py-1'>
            {!isEditing ? (
                <div className='flex cursor-text items-center max-w-[200px]' onDoubleClick={handleEdit}>
                    <Label
                        className='truncate text-sm font-medium cursor-pointer transition-all group-hover:underline group-hover:decoration-primary'
                        title={value}
                    >
                        {value || placeholder}
                    </Label>
                </div>
            ) : (
                <Input
                    name={name}
                    ref={inputRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className='h-8 max-w-[200px] text-base'
                />
            )}
            {showIcon && (
                <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={handleEdit}
                    className='size-6 opacity-0 group-hover:opacity-100 transition-opacity'
                >
                    <PenLine className='size-4 text-muted-foreground' />
                </Button>
            )}
        </div>
    )
}

export default EditableTitle
