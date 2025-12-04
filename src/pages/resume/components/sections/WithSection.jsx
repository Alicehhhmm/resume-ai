import { useCallback } from 'react'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { move } from '@dnd-kit/helpers'

import { SectionList } from './section-list'
import { FieldRendererGroup } from './section-form-group'
import { MoreMenu, CreateItemButton } from './section-actions'
import { defaultSections } from '@/schemas/sections'
import { useTransformLang, useResumeStore, useDialog } from '@/hooks'

export function WithSection({ sectionKey, form, schema = [], title = item => item.title ?? 'Untitled', renderContent }) {
    // hooks

    const { t } = useTransformLang()
    const { onClose } = useDialog()

    // states

    // - Stable empty array (do NOT mutate).
    // note: Prevent the occurrence of different [] being used by Zustand each time when no parameters are provided.
    const EMPTY = []

    const setValue = useResumeStore(state => state.setValue)
    const sectionItems = useResumeStore(
        state => state.resume.data.sections?.[sectionKey]?.items ?? defaultSections[sectionKey]?.items ?? EMPTY
    )

    // method

    const handleInput = useCallback(
        (e, index) => {
            const { name, value } = e?.tag === 'richtext' ? e : e.target

            setValue(`sections.${sectionKey}.items.${index}.${name}`, value)
        },
        [setValue, sectionKey]
    )

    const handleCreate = useCallback(() => {
        const defaultValues = form.formState.defaultValues

        const createdForms = produce(sectionItems, draft => {
            draft.push({ ...defaultValues, id: uuidv4() })
        })
        setValue(`sections.${sectionKey}.items`, createdForms)
    }, [setValue, form])

    // Actions handle

    const handleToggleLock = useCallback(
        (item, index) => {
            setValue(`sections.${sectionKey}.items.${index}.disabled`, !item.disabled)
        },
        [setValue, sectionKey]
    )

    const handleToggleVisible = useCallback(
        (item, index) => {
            setValue(`sections.${sectionKey}.items.${index}.visible`, !item.visible)
        },
        [setValue, sectionKey]
    )

    const handleDuplicate = useCallback(
        item => {
            const copyForms = produce(sectionItems, draft => {
                draft.push({ ...item, id: uuidv4() })
            })
            setValue(`sections.${sectionKey}.items`, copyForms)
        },
        [setValue, sectionKey]
    )

    const handleDeleteSubmit = useCallback(
        (item, index) => {
            const deleteForms = produce(sectionItems, draft => {
                const index = draft.findIndex(row => row.id === item?.id)
                if (index === -1) return
                draft.splice(index, 1)
            })

            setValue(`sections.${sectionKey}.items`, deleteForms)
            onClose()
        },
        [setValue, sectionKey, onClose]
    )

    // Drag handle

    const handleDragEnd = useCallback(
        event => {
            if (event.canceled) return
            const reordered = move(sectionItems, event)
            setValue(`sections.${sectionKey}.items`, reordered)
        },
        [setValue, sectionKey]
    )

    return (
        <section id={`${sectionKey}-content`} className='flex flex-col gap-2'>
            <SectionList
                items={sectionItems}
                onCollision={() => {}}
                onDragEnd={handleDragEnd}
                actions={(item, index) => (
                    <>
                        <MoreMenu
                            t={t}
                            item={item}
                            sectionKey={sectionKey}
                            onToggleLock={() => handleToggleLock(item, index)}
                            onToggleVisible={() => handleToggleVisible(item, index)}
                            onDuplicate={() => handleDuplicate(item)}
                            onSubmitDelete={() => handleDeleteSubmit(item, index)}
                        />
                    </>
                )}
                renderTitle={(item, index) => title(item, index)}
                renderContent={(item, index) => (
                    <>
                        {renderContent ? (
                            renderContent(item, index)
                        ) : (
                            <FieldRendererGroup
                                t={t}
                                item={item}
                                index={index}
                                schema={schema}
                                onInput={handleInput}
                                itemkey={`${sectionKey}:item${index}`}
                            />
                        )}
                    </>
                )}
            />

            <CreateItemButton onClick={handleCreate} t={t} />
        </section>
    )
}
