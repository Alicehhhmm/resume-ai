import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { useCreateResume } from '@/services/resume'
import { useDialog, useTransformLang } from '@/hooks/client'

const ReusmeCreateDialog = () => {
    // hooks

    const { t } = useTransformLang()
    const navigation = useNavigate()

    const { user } = useUser()
    const { targetDialog, onClose } = useDialog()
    const { createResume, loading } = useCreateResume()

    // states

    const open = targetDialog('create:new:resume')
    const [resumeTitile, setResumeTitile] = useState()

    // methods

    const onSave = async () => {
        const uuid = uuidv4()

        const newResumeObj = {
            title: resumeTitile || `Untitle`,
            resumeId: uuid,
            userEmail: user.primaryEmailAddress.emailAddress,
            userName: user.fullName || user.username,
        }

        await createResume(newResumeObj, {
            onSuccess: (res, variables, context) => {
                navigation(`/edit-resume/${res.data.documentId}/edit`)
                toast.success('New resume created successfully!')
                setOpenDialog(false)
            },
            onError: error => {
                toast.error('Failed to create new resume. Please try again.')
                console.error('Error creating new resume:', error)
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
                <DialogHeader>
                    <DialogTitle>Create New Resume</DialogTitle>
                    <DialogDescription>
                        <p>Add a title for your new resume.</p>
                        <Input placeholder='Enter resume title' className='mt-2' onChange={e => setResumeTitile(e.target.value)} />
                    </DialogDescription>
                </DialogHeader>
                <div className='gap-2 flex justify-end'>
                    <Button variant='ghost' onClick={onClose}>
                        {t('cancel')}
                    </Button>
                    <Button variant='default' disabled={!resumeTitile || loading} onClick={onSave}>
                        {loading ? <Loader2 className='animate-spin' /> : t('save')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReusmeCreateDialog
