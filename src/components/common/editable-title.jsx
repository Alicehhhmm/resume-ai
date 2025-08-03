'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PenLine } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

/**
 * 可编辑标题组件
 *
 * 支持以下行为：
 * - 点击图标按钮或双击标题切换编辑状态
 * - 按 Enter 保存（调用 onSave），按 Escape 取消
 * - 失焦时自动调用 onSave
 *
 * Props:
 * @param {string} name - 表单字段名
 * @param {string} value - 当前标题值（受控）
 * @param {boolean} showIcon - 是否显示编辑按钮
 * @param {boolean} disabled - 是否禁用编辑
 * @param {function} onChange - 输入变化时触发
 * @param {function} onSave - 保存时触发（Enter、blur）
 * @param {string} placeholder - 占位符
 */
function EditableTitle({ name, value = '', showIcon = true, disabled = false, onChange, onSave, placeholder = 'Please input content.' }) {
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(value)
    const inputRef = useRef(null)

    // 外部值更新时同步
    useEffect(() => {
        setDraft(value)
    }, [value])

    const handleEdit = () => {
        if (disabled) return
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        }, 0)
    }

    const handleBlur = () => {
        setIsEditing(false)
        const trimmed = draft.trim()

        if (trimmed && trimmed !== value) {
            onChange?.(trimmed)
            onSave?.(trimmed)
        } else {
            setDraft(value)
        }
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            inputRef.current?.blur()
        }
        if (e.key === 'Escape') {
            setDraft(value)
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
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className='h-8 max-w-[200px] text-base'
                    disabled={disabled}
                />
            )}
            {showIcon && !isEditing && (
                <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={handleEdit}
                    disabled={disabled}
                    className='size-6 opacity-0 group-hover:opacity-100 transition-opacity'
                >
                    <PenLine className='size-4 text-muted-foreground' />
                </Button>
            )}
        </div>
    )
}

export default EditableTitle
