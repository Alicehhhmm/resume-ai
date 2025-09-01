'use client'

import React, { useCallback, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { Added } from '@/components/common/Action'
import { CustomModuleDialog } from '@/pages/resume/components/dialog'
import { ItemRow } from '../module-item/ItemRow'

import { cn } from '@/lib/utils'
import { useTransformLang, useSectionManage, useDialog } from '@/hooks/client'

const CUSTOM_SECTION_ID = 'section-custom'

/**
 * 判断是否为自定义模块
 * @param {Object} module - 模块对象
 * @returns {boolean} 是否为自定义模块
 */
const isCustomModule = module => {
    return module.sectionId === CUSTOM_SECTION_ID && module.isCustom
}

const AvailableModuleList = () => {
    // Hooks
    const { t } = useTransformLang()
    const { onOpen } = useDialog()
    const { getAvailableModules, pushToEnabled } = useSectionManage(state => state)

    // Computed values
    const availableModules = getAvailableModules()

    // Event handlers
    const handleCustomModuleAdd = useCallback(() => {
        onOpen('create:custom_module')
    }, [onOpen])

    const handleModuleAdd = module => {
        const { id } = module

        if (isCustomModule(module)) {
            handleCustomModuleAdd()
        } else {
            pushToEnabled(id)
        }
    }

    return (
        <section id='section-available' className='w-full'>
            <header className='bg-muted/60 rounded-t p-4 hover:bg-muted transition-colors'>
                <h2 className='text-base font-sans font-semibold'>{t('AvailableModules')}</h2>
            </header>

            <div className='bg-muted/50 dark:bg-input/60 p-4 rounded-b'>
                <ul className='w-full grid grid-cols-2 gap-2.5' role='list' aria-label={t('AvailableModules')}>
                    {availableModules.map(module => (
                        <li key={module.id} role='listitem'>
                            <ItemRow
                                actions={<Added onClick={() => handleModuleAdd(module)} />}
                                transitionId={`available-modules-${module.sectionId}`}
                                className={cn('hover:!bg-muted hover:!text-primary', 'transition-colors duration-200')}
                            >
                                {module.name}
                            </ItemRow>
                        </li>
                    ))}
                </ul>
            </div>

            <CustomModuleDialog />
        </section>
    )
}

export default React.memo(AvailableModuleList)
