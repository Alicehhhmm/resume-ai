'use client'

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
        title: z.string().min(1, { message: t('titleCannotEmpty') || 'Title cannot be empty' }),
    })
}

const ResumeImportDialog = () => {
    // hooks

    const { t } = useTransformLang()
    const { user } = useSystemAuth()
    const { targetDialog, onClose } = useDialog()

    // TODO: useImportResume hooks
    // const { importResume } = useImportResume()
    const { createResume, loading } = useCreateResume()

    const open = targetDialog('create:import:resume')

    // form

    const schema = formSchema(t)
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
        },
    })
    const isLoading = form.formState.isSubmitting || loading

    // methods

    const onSave = async values => {
        if (!user) return

        const uuid = uuidv4()
        const payload = {
            title: values.title || `Untitled`,
            resumeId: uuid,
            userEmail: user.primaryEmailAddress.emailAddress,
            userName: user.fullName || user.username,
        }

        // TODO: importResume
        // await importResume(payload, {
        //     onSuccess: () => {
        //         toast.success(t('resumeImportSuccess') || 'New resume created successfully!')
        //         onClose()
        //     },
        //     onError: error => {
        //         toast.error(t('resumeImportFailed') || 'Failed to create new resume. Please try again.')
        //         console.error('Error creating resume:', error)
        //     },
        // })
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
                    <form onSubmit={form.handleSubmit(onSave)} className='w-full space-y-6'>
                        <DialogHeader>
                            <DialogTitle>{t('importResumeTitle')}</DialogTitle>
                            <DialogDescription>{t('importResumeDesc')}</DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        {/* <Input disabled={isLoading} placeholder={t('enterResumeTitle')} {...field} /> */}
                                        <p>TODO：UploadZone</p>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' variant='ghost' onClick={onClose}>
                                    {t('cancel')}
                                </Button>
                            </DialogClose>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? (
                                    <span className='flex items-center gap-2'>
                                        <Loader2Icon className='animate-spin' />
                                        {t('saving') || t('save')}
                                    </span>
                                ) : (
                                    t('save')
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ResumeImportDialog
