import React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useResumeEdit } from '@/hooks'

function PersonalDetail() {
    const { resumeInfo, updateBasics } = useResumeEdit()

    const basics = {
        name: (resumeInfo?.firstName + ' ' + resumeInfo?.lastName).trim(),
        title: resumeInfo?.jobTitle,
        ...resumeInfo,
    }

    const t = message => {
        // TODO: i18n change
        return message
    }

    return (
        <div className='space-y-4'>
            <div className='space-y-2'>
                <Label htmlFor='name'>{t('name')}</Label>
                <Input id='name' value={basics.name} onChange={e => updateBasics({ name: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='title'>{t('title')}</Label>
                <Input id='title' value={basics.title} onChange={e => updateBasics({ title: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='email'>{t('email')}</Label>
                <Input id='email' type='email' value={basics.email} onChange={e => updateBasics({ email: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='phone'>{t('phone')}</Label>
                <Input id='phone' value={basics.phone} onChange={e => updateBasics({ phone: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='address'>{t('address')}</Label>
                <Input id='address' value={basics.address} onChange={e => updateBasics({ address: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='linkedin'>{t('linkedin')}</Label>
                <Input id='linkedin' value={basics.linkedin} onChange={e => updateBasics({ linkedin: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='profile'>{t('profile')}</Label>
                <Textarea id='profile' value={basics.profile} onChange={e => updateBasics({ profile: e.target.value })} rows={5} />
            </div>
        </div>
    )
}

export default PersonalDetail
