import { memo, useMemo, useCallback } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { CollisionPriority } from '@dnd-kit/abstract'
import { cn } from '@/lib/utils'

import { Actions, Handle } from '@/components/common/Action'
import { SortableItem } from './SortableItem'
import { SortableContainer } from './SortableContainer'

/**
 * SortableColumn
 * ----------------------------------
 * 可排序的列容器
 *
 * @param {Object} props - 组件属性
 * @param {string[]} props.rows - 列表项ID数组
 * @param {string} props.id - 列容器ID
 * @param {number} props.index - 列容器索引
 * @param {boolean} props.disabledDrag - 是否禁用拖拽
 * @param {boolean} props.scrollable - 是否可滚动
 * @param {function} props.onRemove - 移除列表项回调函数
 * @param {React.CSSProperties} props.style - 列容器样式
 * @param {React.CSSProperties} props.className - 样式类名
 */
export const SortableColumn = memo(({ rows, id, index, disabledDrag, scrollable, onRemove, className, style }) => {
    // hooks

    const { handleRef, isDragging, ref } = useSortable({
        id,
        index,
        type: 'column',
        accept: ['column', 'item'],
        collisionPriority: CollisionPriority.Low,
        disabled: disabledDrag,
    })

    // states

    // methods

    // TODO: change t i18n func
    const getModuleName = id => {}

    const actions = useMemo(() => {
        return (
            <Actions>
                <Handle ref={handleRef} />
            </Actions>
        )
    }, [handleRef])

    const handleRemoveItem = useCallback(
        itemId => {
            onRemove?.(itemId, id)
        },
        [id, onRemove]
    )

    return (
        <SortableContainer
            ref={ref}
            label={getModuleName(id) ?? `${id}`}
            actions={!disabledDrag && actions}
            shadow={isDragging}
            scrollable={scrollable}
            transitionId={`sortable-column-${id}`}
            className={cn('w-full bg-secondary rounded-3xl', className)}
            style={style}
        >
            {rows.map((itemId, index) => (
                <SortableItem
                    key={itemId}
                    id={itemId}
                    column={id}
                    index={index}
                    label={getModuleName(itemId) ?? itemId}
                    // onRemove={handleRemoveItem}
                />
            ))}
        </SortableContainer>
    )
})
