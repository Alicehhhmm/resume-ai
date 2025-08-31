import React, { memo, useMemo } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'

import { cn } from '@/lib/utils'
import { Actions, Handle, Remove, Nav } from '@/components/common/Action'
import { ItemRow } from './ItemRow'

/**
 * SortableItem
 * ----------------------------------
 * 可排序的列表项
 *
 * @param {Object} props - 组件属性
 * @param {string} props.id - 列表项ID
 * @param {string} props.column - 列表项所属列ID
 * @param {number} props.index - 列表项索引
 * @param {string} props.label - 列表项标签
 * @param {React.CSSProperties} props.style - 列表项样式
 * @param {function} props.onRemove - 移除列表项回调函数
 */
const SortableItemComponent = ({ id, column, index, label, onRemove, onNavigate, className, style }) => {
    const group = column

    // hooks

    const { handleRef, ref, isDragging } = useSortable({
        id,
        group,
        accept: 'item',
        type: 'item',
        feedback: 'clone',
        index,
        data: { group },
    })

    // methods

    const actions = useMemo(() => {
        return (
            <Actions>
                {onRemove && !isDragging ? <Remove onClick={() => onRemove(id, column)} /> : null}
                {onNavigate && <Nav onClick={() => onNavigate(id, column)} />}
            </Actions>
        )
    }, [])

    return (
        <ItemRow
            ref={ref}
            actions={actions}
            shadow={isDragging}
            transitionId={`sortable-${column}-${id}`}
            className={cn(className)}
            style={style}
        >
            <div className='flex flex-row items-center gap-1'>
                <Handle />
                <span className='truncate flex-1'>{label ?? id}</span>
            </div>
        </ItemRow>
    )
}

SortableItemComponent.displayName = 'EnabledSortableItem'

export const EnabledSortableItem = memo(SortableItemComponent)
