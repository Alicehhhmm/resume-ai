import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { PlusSquare, Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { useCreateResume } from '@/services/resume'

function AddResume() {
    const { user } = useUser()
    const navigation = useNavigate()

    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitile, setResumeTitile] = useState()

    const { createResume, loading } = useCreateResume({
        onSuccess: res => {
            navigation(`/edit-resume/${res.data.documentId}/edit`)
            toast.success('New resume created successfully!')
            setOpenDialog(false)
        },
        onError: error => {
            toast.error('Failed to create new resume. Please try again.')
            console.error('Error creating new resume:', error)
        },
    })

    const onCreate = async () => {
        const uuid = uuidv4()

        const newResumeObj = {
            title: resumeTitile || `Untitle`,
            resumeId: uuid,
            userEmail: user.primaryEmailAddress.emailAddress,
            userName: user.fullName || user.username,
        }

        await createResume(newResumeObj)
    }

    return (
        <div className='gap-4'>
            <div
                className='h-[var(--r-card-height)] gap-2 p-10 border flex flex-col items-center justify-center bg-secondary rounded-md
                hover:bg-secondary/80 transition-all cursor-pointer hover:shadow-md hover:border-dashed hover:border-2'
                onClick={() => setOpenDialog(true)}
            >
                <p className='text-md text-muted-foreground'>Create New Resume</p>
                <PlusSquare className='opacity-60' />
            </div>

            <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume.</p>
                            <Input placeholder='Enter resume title' className='mt-2' onChange={e => setResumeTitile(e.target.value)} />
                        </DialogDescription>
                    </DialogHeader>
                    <div className='gap-2 flex justify-end'>
                        <Button variant='ghost' onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant='default' disabled={!resumeTitile || loading} onClick={() => onCreate()}>
                            {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume
