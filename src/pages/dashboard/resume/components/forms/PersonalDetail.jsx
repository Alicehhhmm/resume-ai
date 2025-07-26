import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useResumeEdit, useTransformLang } from '@/hooks'

import { UpdateResumeDetail } from '@/api/apis/resume'

function PersonalDetail() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { resumeInfo: basics, setResumeInfo } = useResumeEdit()

    if (!basics) {
        return null
    }

    // State

    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

    // Method

    const handleInput = e => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })

        setResumeInfo({
            ...basics,
            [name]: value,
        })
    }

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const upDateResumeId = params?.resumeId
            const updateData = {
                ...formData,
            }

            const res = await UpdateResumeDetail(upDateResumeId, updateData)
            if (res) {
                toast.success('save successfully')
            }
        } catch (error) {
            toast.error('save error:', error)
            console.error('on submit error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='grid  grid-cols-2 gap-3'>
                <div className='space-y-2'>
                    <Label htmlFor='firstName'>{t('firstName')}</Label>
                    <Input name='firstName' required defaultValue={basics.firstName} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='lastName'>{t('lastName')}</Label>
                    <Input name='lastName' required defaultValue={basics.lastName} onChange={handleInput} />
                </div>

                <div className='space-y-2 col-span-2'>
                    <Label htmlFor='jobTitle'>{t('jobTitle')}</Label>
                    <Input name='jobTitle' required defaultValue={basics.jobTitle} onChange={handleInput} />
                </div>

                <div className='space-y-2 col-span-2'>
                    <Label htmlFor='address'>{t('address')}</Label>
                    <Input name='address' required defaultValue={basics.address} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='phone'>{t('phone')}</Label>
                    <Input name='phone' required defaultValue={basics.phone} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='email'>{t('email')}</Label>
                    <Input name='email' required defaultValue={basics.email} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='linkedin'>{t('linkedin')}</Label>
                    <Input name='linkedin' defaultValue={basics.linkedin} onChange={handleInput} />
                </div>
            </div>

            <div className='mt-3 flex justify-end'>
                <Button type='submit' disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
    )
}

export default PersonalDetail
