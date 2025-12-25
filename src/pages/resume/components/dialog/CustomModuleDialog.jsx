import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useDialog, useTransformLang, useSectionManage, useResumeStore } from '@/hooks/client'

import { defaultCustomSection } from '@/schemas'

const DIALOG_NAME = 'create:custom_module'

const formSchema = t => {
    return z.object({
        name: z.string().min(1, { message: t('moduleNamePlaceholder') }),
    })
}

function CustomModuleDialog() {
    // hooks

    const { t } = useTransformLang()
    const createCustomModule = useSectionManage(state => state.create)
    const { options, onClose, targetDialog } = useDialog()

    const open = targetDialog(DIALOG_NAME)
    const schema = formSchema(t)

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        },
    })
    const isLoading = form.formState.isSubmitting

    // states

    const setValue = useResumeStore(state => state.setValue)

    // Method
    const mockServerApi = () => new Promise(res => setTimeout(res, 1000))

    const handleSuccess = () => {
        form.reset()
        toast.success(t('saveSuccess'))
        onClose()
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const onSubmit = async values => {
        try {
            const newForm = {
                ...defaultCustomSection,
                name: values.name,
            }
            setValue(`sections.${newForm.sectionId}`, newForm)

            // TODO: fetch api
            await mockServerApi()

            createCustomModule(newForm)
            handleSuccess()
        } catch (error) {
            console.log('[CUSTOM_MODULE_DIALOG]', error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
                        <DialogHeader>
                            <DialogTitle>{t('moduleName')}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder={t('moduleNamePlaceholder')} disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline'>{t('cancel')}</Button>
                            </DialogClose>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? (
                                    <span className='flex items-center gap-2'>
                                        <Loader2Icon className='animate-spin' />
                                        {t('save')}
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

export default CustomModuleDialog
