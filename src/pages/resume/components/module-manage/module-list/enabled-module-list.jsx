import React, { useState, useCallback } from 'react'
import { SortableColumn } from '../module-item/SortableColumn'
import { useTransformLang } from '@/hooks'

const EnabledModules = ({ items, scrollable = false, onRemove }) => {
    // hooks

    const { t } = useTransformLang()

    // States

    const [columns] = useState(['main', 'sidebar', ...Object.keys(items)]) // ['main', 'sidebar']

    const handleRemoveItem = useCallback(
        (itemId, id) => {
            onRemove?.(itemId, id)
        },
        [onRemove]
    )

    return (
        <div className='w-full flex flex-col gap-2'>
            <h1>{t('enabledModules')}</h1>

            <div className='w-full grid grid-cols-2 gap-2'>
                {columns.map((column, columnIndex) => {
                    const rows = items[column] ?? []

                    return (
                        <SortableColumn
                            key={column}
                            id={column}
                            index={columnIndex}
                            label={t(`${column}`)}
                            rows={rows}
                            scrollable={scrollable}
                            disabledDrag={true}
                            // onRemove={handleRemoveItem}
                            style={{
                                minWidth: '100px',
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default React.memo(EnabledModules)
