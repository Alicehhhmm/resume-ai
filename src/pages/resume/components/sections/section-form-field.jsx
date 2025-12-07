import { useId, useMemo, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import LinkDialog from '@/components/common/link-dialog'
import { RichTextInput, RichFooterBar } from '@/components/common/rich-input'
import { DropdownSelect } from '@/components/common/dropdown-select'

import { levelCategory, learnLevels, technicalLevels } from '@/schemas/share'

/**
 * TODO: use https://ui.shadcn.com/docs/forms
 * @param {*} param
 * @returns <FormFiedComponents />
 */
export function FieldRenderer({ field, value, onChange, t, fieldKey, disabled }) {
    const reactId = useId()

    const formId = useMemo(() => {
        return `${fieldKey ?? 'sectionKey'}-${field.name}-${reactId}`
    }, [fieldKey, field.name, reactId])

    const getLevelOptions = useCallback(
        levelType => {
            let options = []

            if (levelCategory.includes(levelType)) {
                if (levelType === 'learn') {
                    options = Object.entries(learnLevels).map(([num, levelValue]) => ({
                        value: parseInt(num),
                        label: t ? t(`${levelValue}`) : levelValue,
                    }))
                }

                if (levelType === 'technical') {
                    options = Object.entries(technicalLevels).map(([num, levelValue]) => ({
                        value: parseInt(num),
                        label: t ? t(`${levelValue}`) : levelValue,
                    }))
                }
            }

            return options
        },
        [technicalLevels, learnLevels, t]
    )

    return (
        <div className={`space-y-2 col-span-${field.colSpan ?? 1}`}>
            <Label htmlFor={formId}>{t(field.label)}</Label>

            {['input'].includes(field.component) && (
                <Input id={formId} name={field.name} value={value ?? ''} onChange={onChange} disabled={disabled} />
            )}

            {['textarea'].includes(field.component) && (
                <Textarea id={formId} name={field.name} value={value ?? ''} onChange={onChange} disabled={disabled} />
            )}

            {['date'].includes(field.component) && (
                <Input id={formId} type='date' name={field.name} value={value ?? ''} onChange={onChange} disabled={disabled} />
            )}

            {['richtext'].includes(field.component) && (
                <RichTextInput
                    name={field.name}
                    content={value}
                    onChange={responseValue => onChange({ name: field.name, value: responseValue, tag: 'richtext' })}
                    disabled={disabled}
                />
            )}

            {['dialog'].includes(field.component) && (
                <LinkDialog
                    t={t}
                    link={value}
                    onSubmit={responseValue => {
                        onChange({ name: field.name, value: responseValue, tag: 'dialog' })
                    }}
                    disabled={disabled}
                />
            )}

            {['slider'].includes(field.component) && (
                <Slider
                    value={[value ?? 0]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={values => {
                        // Note: onValueChange is triggered during dragging, but we want to use it for immediate updates
                        onChange({ name: field.name, value: parseInt(values[0]), tag: 'slider' })
                    }}
                    onValueCommit={values => {
                        // onValueCommit is triggered when dragging stops
                        onChange({ name: field.name, value: parseInt(values[0]), tag: 'slider' })
                    }}
                    disabled={disabled}
                />
            )}

            {['dropdown-menu'].includes(field.component) && (
                <DropdownSelect
                    value={value ?? 0}
                    disabled={disabled}
                    groupLabel={t ? t(`${field.levelType}Levels`) : 'Levels'}
                    options={getLevelOptions(field.levelType ?? 'technical')}
                    onSelect={selectedValue => {
                        onChange({ name: field.name, value: selectedValue, tag: 'dropdown-menu' })
                    }}
                    placeholder={t ? t('selectLevel') : 'Select level...'}
                    className='dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] '
                />
            )}
        </div>
    )
}
