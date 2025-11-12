'use client'

import { useEffect } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'

import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useCreateResume } from '@/services/resume'
import { useDialog, useTransformLang, useSystemAuth } from '@/hooks'

const formSchema = t => {
    return z.object({
        title: z.string().min(1, { message: t('titleCannotEmpty') || 'Title is required' }),
    })
}

const ResumeCopyDialog = () => {
    // hooks

    const { t } = useTransformLang()
    const { user } = useSystemAuth()
    const { options: resume, targetDialog, onClose } = useDialog()
    const { createResume, loading } = useCreateResume()

    // state

    const open = targetDialog(`resume:copy:${resume?.did}`)

    // form
    const schema = formSchema(t)
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
        },
    })
    const isLoading = form.formState.isSubmitting || loading

    useEffect(() => {
        if (resume?.title) {
            form.setValue('title', resume.title)
        }
    }, [resume])

    // methods
    const onSave = async values => {
        if (!user) return
        const uuid = uuidv4()

        const copyPayload = {
            title: values.title || `Untitled`,
            userEmail: user.primaryEmailAddress.emailAddress,
            userId: user.id,
            visibility: 'public',
            slug: '', // TODO: use title gent
        }

        await createResume(copyPayload, {
            onSuccess: () => {
                toast.success(t('resumeCopied') || 'Resume copied successfully!')
                onClose()
            },
            onError: error => {
                toast.error(t('copyFailed') || 'Failed to copy resume.')
                console.error('Copy error:', error)
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
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSave)} className='space-y-4'>
                        <DialogHeader>
                            <DialogTitle>{t('copyResume') || 'Copy Resume'}</DialogTitle>
                            <DialogDescription>{t('copyResumeDesc') || 'Create a copy of your resume.'}</DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
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
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? (
                                    <span className='flex items-center gap-2'>
                                        <Loader2Icon className='animate-spin' />
                                        {t('saving') || 'Saving'}
                                    </span>
                                ) : (
                                    t('save') || 'Save'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ResumeCopyDialog
