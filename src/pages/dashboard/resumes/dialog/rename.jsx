'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useUpdateResume } from '@/services/resume'
import { useDialog, useTransformLang } from '@/hooks'

// schema
const formSchema = t =>
    z.object({
        title: z.string().min(1, { message: t('moduleNamePlaceholder') || 'Title is required' }),
    })

const ResumeRenameDialog = () => {
    // hooks
    const { t } = useTransformLang()
    const { options: resume, targetDialog, onClose } = useDialog()
    const { updateResume, loading } = useUpdateResume()

    // state

    const open = targetDialog(`resume:rename:${resume?.id}`)

    // form
    const schema = formSchema(t)
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: resume?.title || '',
        },
    })
    const isSubmitting = form.formState.isSubmitting || loading

    // methods
    const onSave = async value => {
        if (!resume) return
        const updatedResume = { ...resume, title: value.title }

        await updateResume(updatedResume, {
            onSuccess: () => {
                toast.success(t('resumeRenamed') || 'Resume renamed successfully!')
                onClose()
            },
            onError: error => {
                toast.error(t('renameFailed') || 'Failed to rename resume.')
                console.error('Rename error:', error)
            },
        })
    }

    const handleChange = isOpen => {
        if (!isOpen) {
            onClose()
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleChange}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('renameResume') || 'Rename Resume'}</DialogTitle>
                            <DialogDescription>{t('renameResumeDesc') || 'Update the title of your resume.'}</DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder={t('enterResumeTitle') || 'Enter new resume title'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='ghost' onClick={onClose}>
                                    {t('cancel') || 'Cancel'}
                                </Button>
                            </DialogClose>
                            <Button type='submit' disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className='flex items-center gap-2'>
                                        <Loader2Icon className='animate-spin' />
                                        {t('saving') || 'Saving'}
                                    </span>
                                ) : (
                                    t('save') || 'Save'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default ResumeRenameDialog
