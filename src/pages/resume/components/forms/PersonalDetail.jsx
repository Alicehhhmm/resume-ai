import { useCallback } from 'react'
import { debounce } from 'lodash-es'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomFieldsGroup } from '../custom/custom-fields'

import { useResumeStore, useTransformLang } from '@/hooks'

function PersonalDetail() {
    // hooks

    const { t } = useTransformLang()

    // State

    const setValue = useResumeStore(state => state.setValue)
    const basics = useResumeStore(state => state.resume.data?.basics ?? ``)

    // Method

    const handleInput = useCallback(
        e => {
            const { name, value } = e.target
            setValue(`basics.${name}`, value)
        },
        [setValue]
    )

    const handleChange = value => {
        if (value && Array.isArray(value)) {
            debouncedUpdate(value)
        }
    }

    const debouncedUpdate = useCallback(
        debounce(value => {
            const processedValue = value.map(({ id, ...rest }) => rest)
            setValue('basics.customFields', processedValue)
        }, 500),
        [setValue]
    )

    if (!basics) {
        return null
    }

    return (
        <section id='basics' className=''>
            {/* TODO: change section to CollapsiblePanel components */}
            <div className='grid  grid-cols-2 gap-3'>
                <div className='space-y-2'>
                    <Label htmlFor='name'>{t('name')}</Label>
                    <Input name='name' value={basics.name} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='dob'>{t('dob')}</Label>
                    <Input name='dob' value={basics.dob} onChange={handleInput} />
                </div>

                <div className='space-y-2 '>
                    <Label htmlFor='jobTitle'>{t('jobTitle')}</Label>
                    <Input name='jobTitle' value={basics.jobTitle} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='address'>{t('address')}</Label>
                    <Input name='address' value={basics.address} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='phone'>{t('phone')}</Label>
                    <Input name='phone' value={basics.phone} onChange={handleInput} />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='email'>{t('email')}</Label>
                    <Input name='email' value={basics.email} onChange={handleInput} />
                </div>

                <div className='space-y-2 col-span-2'>
                    <Label htmlFor='website'>{t('website')}</Label>
                    <Input name='website' value={basics.website} onChange={handleInput} />
                </div>

                <div className='space-y-2 col-span-2'>
                    <CustomFieldsGroup value={basics.customFields} onChange={handleChange} />
                </div>
            </div>
        </section>
    )
}

export default PersonalDetail
