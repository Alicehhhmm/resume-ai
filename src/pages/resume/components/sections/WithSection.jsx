import { useCallback } from 'react'
import { SectionList } from './section-list'
import { FieldRendererGroup } from './section-form-group'
import { MoreMenu, CreateItemButton } from './section-actions'
import { useTransformLang, useResumeStore } from '@/hooks/'

export function WithSection({ sectionKey, schema = [], title = item => item.title ?? 'Untitled', renderContent }) {
    // hooks

    const { t } = useTransformLang()

    // states

    const setValue = useResumeStore(s => s.setValue)
    const sectionItems = useResumeStore(s => s.resume.data.sections?.[sectionKey]?.items ?? [])

    // method

    const handleInput = useCallback(
        (e, index) => {
            const { name, value } = e.target
            // setValue(`sections.${sectionKey}.items.${index}.${name}`, value)
            console.log(`sections.${sectionKey}.items.${index}.${name}`, value)
        },
        [setValue]
    )

    const handleCreade = useCallback(() => {
        console.log('handleCreade ')
    }, [setValue])

    // Actions handle

    const handleToggleLock = useCallback(
        item => {
            console.log('handleToggleLock')
        },
        [setValue]
    )

    const handleToggleVisible = useCallback(
        item => {
            console.log('handleToggleVisible')
        },
        [setValue]
    )

    const handleDuplicate = useCallback(
        item => {
            console.log('handleDuplicate')
        },
        [setValue]
    )

    const handleDelete = useCallback(
        item => {
            console.log('handleDelete')
        },
        [setValue]
    )

    // Drag handle

    const handleCollision = useCallback(() => {
        console.log('handleCollision')
    }, [])

    const handleDragEnd = useCallback(() => {
        console.log('handleDragEnd')
    }, [])

    return (
        <section id={`${sectionKey}-content`} className='flex flex-col gap-2'>
            <SectionList
                items={sectionItems}
                onCollision={handleCollision}
                onDragEnd={handleDragEnd}
                actions={(item, index) => (
                    <>
                        <MoreMenu
                            t={t}
                            item={item}
                            onToggleLock={() => handleToggleLock(item)}
                            onToggleVisible={() => handleToggleVisible(item)}
                            onDuplicate={() => handleDuplicate(item)}
                            onDelete={() => handleDelete(item)}
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

            <CreateItemButton onClick={handleCreade} t={t} />
        </section>
    )
}
