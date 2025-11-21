import { createContext, useContext, useCallback, useState, useEffect, useMemo } from 'react'
import { Plus, Trash2, GripVertical, Sparkles, ChevronDown } from 'lucide-react'
import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'
import { useTransformLang } from '@/hooks'

// ============================================
// Context for State Management
// ============================================

const CustomFieldsContext = createContext(null)

function useCustomFields() {
    const ctx = useContext(CustomFieldsContext)
    if (!ctx) throw new Error('useCustomFields must be used within CustomFieldsProvider')
    return ctx
}

function CustomFieldsProvider({ children, value, onChange }) {
    const [fields, setFields] = useState([])

    useEffect(() => {
        const normalized = normalizeValue(value)
        setFields(normalized)
    }, [value])

    const updateFields = useCallback(
        newFields => {
            setFields(newFields)
            onChange?.(newFields)
        },
        [onChange]
    )

    // Methods to manipulate fields
    const addField = useCallback(() => {
        updateFields([...fields, { id: uuidv4(), label: '', value: '' }])
    }, [fields, updateFields])

    const removeField = useCallback(
        id => {
            updateFields(fields.filter(f => f.id !== id))
        },
        [fields, updateFields]
    )

    const updateField = useCallback(
        (id, key, newValue) => {
            updateFields(fields.map(f => (f.id === id ? { ...f, [key]: newValue } : f)))
        },
        [fields, updateFields]
    )

    const reorderFields = useCallback(
        newFields => {
            updateFields(newFields), [updateFields]
        },
        [updateFields]
    )

    const contextValue = useMemo(
        () => ({
            fields,
            addField,
            removeField,
            updateField,
            reorderFields,
        }),
        [fields, addField, removeField, updateField, reorderFields]
    )

    return <CustomFieldsContext.Provider value={contextValue}>{children}</CustomFieldsContext.Provider>
}

// ============================================
// Utility Functions
// ============================================

function normalizeValue(value) {
    if (!value) return []

    if (Array.isArray(value)) {
        return value.map(item => ({
            id: item.id || uuidv4(),
            label: item.label || '',
            value: item.value || '',
        }))
    }

    if (typeof value === 'object') {
        return Object.entries(value).map(([key, val]) => ({
            id: uuidv4(),
            label: key,
            value: val,
        }))
    }

    return []
}

// ============================================
// Primitive Components
// ============================================

function FieldInput({ id, label, value, onChange, placeholder, error }) {
    return (
        <div className='space-y-1.5'>
            <Label htmlFor={id} className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                {label}
            </Label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    'h-9 text-sm shadow-sm transition-all duration-200',
                    'focus-visible:ring-1',
                    error && 'border-destructive focus-visible:ring-destructive'
                )}
            />
            {error && <p className='text-xs text-destructive'>{error}</p>}
        </div>
    )
}

function DragHandle({ ...props }) {
    return (
        <div
            role='button'
            tabIndex={0}
            className={cn(
                'inline-flex items-center justify-center rounded-md',
                'h-7 w-7 text-muted-foreground',
                'hover:bg-accent hover:text-accent-foreground',
                'cursor-grab active:cursor-grabbing',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
            )}
            aria-label='Drag to reorder'
            {...props}
        >
            <GripVertical className='size-3.5' />
        </div>
    )
}

function RemoveFieldActions({ onDelete }) {
    const { t } = useTransformLang()

    const onConfirm = () => {
        onDelete()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 className='mr-2 size-3.5' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('deleteTip') ?? 'Are you absolutely sure?'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('deleteFieldDescription') ?? 'This operation is irreversible. Are you sure you want to delete it?'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{t('continue')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// ============================================
// Composite Components
// ============================================

function CustomFieldItem({ field, index }) {
    const { updateField, removeField } = useCustomFields()
    const { ref, isDragging } = useSortable({ id: field.id, index })

    return (
        <div ref={ref} className={cn('transition-all duration-200', isDragging && 'opacity-50 scale-[0.98] shadow-lg z-50')}>
            <Accordion type='single' collapsible className='w-full' defaultValue={field.id}>
                <AccordionItem
                    value={field.id}
                    className={cn(
                        'group relative rounded-md overflow-hidden transition-all duration-200',
                        '!border !border-solid !border-border',
                        'hover:shadow-sm hover:border-primary/50'
                    )}
                >
                    <AccordionTrigger
                        className={cn(
                            'px-4 hover:no-underline [&[data-state=open]]:border-b',
                            'hover:bg-accent/50 transition-colors duration-200'
                        )}
                    >
                        <div className='flex items-center gap-3 flex-1 mr-2'>
                            {/* Drag Handle */}
                            <div className='opacity-60 group-hover:opacity-100 transition-opacity duration-200'>
                                <DragHandle />
                            </div>

                            {/* Field Preview */}
                            <div className='flex items-center gap-2 flex-1 min-w-0'>
                                <span className='text-sm font-medium truncate'>
                                    {field.label || <span className='text-muted-foreground italic'>Untitled</span>}
                                </span>
                                {field.value && (
                                    <>
                                        <ChevronDown className='h-3 w-3 text-muted-foreground rotate-[-90deg]' />
                                        <span className='text-xs text-muted-foreground truncate max-w-[200px]'>{field.value}</span>
                                    </>
                                )}
                            </div>

                            {/* Actions */}
                            <div
                                className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                                onClick={e => e.stopPropagation()}
                            >
                                <RemoveFieldActions onDelete={() => removeField(field.id)} />
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className='px-4 pb-4 pt-4'>
                        <div className='grid gap-4 sm:grid-cols-2'>
                            <FieldInput
                                id={`label-${field.id}`}
                                label='Label'
                                value={field.label}
                                onChange={e => updateField(field.id, 'label', e.target.value)}
                                placeholder='Phone'
                            />
                            <FieldInput
                                id={`value-${field.id}`}
                                label='Value'
                                value={field.value}
                                onChange={e => updateField(field.id, 'value', e.target.value)}
                                placeholder='+1234567890'
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

function CustomFieldsList() {
    const { t } = useTransformLang()
    const { fields, reorderFields } = useCustomFields()

    if (fields.length === 0) {
        return (
            <div className='border border-dashed rounded-md'>
                <div className='flex flex-col items-center justify-center py-12 px-6'>
                    <div className='rounded-full bg-muted p-3 mb-3'>
                        <Sparkles className='h-6 w-6 text-muted-foreground' />
                    </div>
                    <h3 className='font-semibold text-base mb-1'>{t('noCustomFields')}</h3>
                    <p className='text-sm text-muted-foreground text-center max-w-sm'>
                        {t('addCustomFieldsDescription') ?? 'Get started by adding your first custom field below.'}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <DragDropProvider
            onDragEnd={event => {
                const { source, target } = event.operation
                if (!target) return

                const oldIndex = fields.findIndex(f => f.id === source.id)
                const newIndex = fields.findIndex(f => f.id === target.id)

                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    const newFields = [...fields]
                    const [moved] = newFields.splice(oldIndex, 1)
                    newFields.splice(newIndex, 0, moved)
                    reorderFields(newFields)
                }
            }}
        >
            <div className='grid gap-2.5'>
                {fields.map((field, index) => (
                    <CustomFieldItem key={field.id} field={field} index={index} />
                ))}
            </div>
        </DragDropProvider>
    )
}

function AddFieldButton() {
    const { t } = useTransformLang()
    const { addField } = useCustomFields()

    return (
        <Button
            type='button'
            variant='outline'
            size='default'
            onClick={addField}
            className={cn('w-full gap-2 border-dashed h-10', 'hover:bg-accent hover:border-primary/50', 'transition-all duration-200')}
        >
            <Plus className='size-3.5' />
            <span className='font-medium'>{t('addCustomField')}</span>
        </Button>
    )
}

function FieldsHeader({ title }) {
    const { fields } = useCustomFields()

    return (
        <div className='flex items-center justify-between space-x-1.5'>
            <h3 className='text-sm font-semibold leading-none tracking-tight'>{title}</h3>
            <Badge variant='secondary' className='rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums'>
                {fields.length}
            </Badge>
        </div>
    )
}

// ============================================
// Main Component with Outer Accordion
// ============================================

function CustomFieldsGroup({ value = [], onChange, title = 'Custom Fields', className, defaultOpen = true }) {
    return (
        <CustomFieldsProvider value={value} onChange={onChange}>
            <Accordion type='single' collapsible defaultValue={defaultOpen ? 'fields' : undefined} className={cn('w-full', className)}>
                <AccordionItem value='fields' className='border rounded overflow-hidden'>
                    <AccordionTrigger className='px-4 py-3 hover:no-underline hover:bg-accent/50 transition-colors duration-200'>
                        <FieldsHeader title={title} />
                    </AccordionTrigger>

                    <AccordionContent className='px-6 pb-6 gap-2'>
                        <div className='space-y-4 pt-2'>
                            <CustomFieldsList />
                            <AddFieldButton />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <div className='p-4' />
            </Accordion>
        </CustomFieldsProvider>
    )
}

export {
    CustomFieldsGroup,
    CustomFieldItem,
    CustomFieldsList,
    FieldInput,
    DragHandle,
    RemoveFieldActions,
    AddFieldButton,
    FieldsHeader,
    useCustomFields,
}
