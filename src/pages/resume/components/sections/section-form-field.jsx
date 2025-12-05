import { useId, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import LinkDialog from '@/components/common/link-dialog'
import { RichTextInput, RichFooterBar } from '@/components/common/rich-input'

/**
 * TODO: use https://ui.shadcn.com/docs/forms
 * @param {*} param
 * @returns <FormFiedComponents />
 */
export function FieldRenderer({ field, value, onChange, t, fieldKey }) {
    const reactId = useId()

    const formId = useMemo(() => {
        return `${fieldKey ?? 'sectionKey'}-${field.name}-${reactId}`
    }, [fieldKey, field.name, reactId])

    return (
        <div className={`space-y-2 col-span-${field.colSpan ?? 1}`}>
            <Label htmlFor={formId}>{t(field.label)}</Label>

            {['input'].includes(field.component) && <Input id={formId} name={field.name} value={value} onChange={onChange} />}

            {['textarea'].includes(field.component) && <Textarea id={formId} name={field.name} value={value} onChange={onChange} />}

            {['date'].includes(field.component) && <Input id={formId} type='date' name={field.name} value={value} onChange={onChange} />}

            {['richtext'].includes(field.component) && (
                <RichTextInput
                    name={field.name}
                    content={value}
                    onChange={responseValue => onChange({ name: field.name, value: responseValue, tag: 'richtext' })}
                />
            )}

            {['dialog'].includes(field.component) && (
                <LinkDialog
                    t={t}
                    link={value}
                    onSubmit={responseValue => {
                        onChange({ name: field.name, value: responseValue, tag: 'dialog' })
                    }}
                />
            )}
        </div>
    )
}
