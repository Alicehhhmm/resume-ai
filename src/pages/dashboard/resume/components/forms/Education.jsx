'use client'

import React, { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { toast } from 'sonner'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from '../common/collapsible-panel'

import { useResumeEdit, useTransformLang } from '@/hooks'
import { UpdateResumeDetail } from '@/api/apis/resume'

const uuid = uuidv4()

const initialFormField = {
    id: uuid,
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
}

function Education() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { resumeInfo, setResumeInfo } = useResumeEdit()

    // States

    const [loading, setLoading] = useState(false)
    const [educationalList, setEducationalList] = useState([{ ...initialFormField }])

    // Method

    useEffect(() => {
        if (resumeInfo?.education?.length > 0) {
            setEducationalList(resumeInfo?.education)
        }
    }, [])

    const handleInput = (event, index) => {
        const newEntries = educationalList.slice()
        const { name, value } = event.target
        newEntries[index][name] = value
        setEducationalList(newEntries)
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList, initialFormField])
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList,
        })
        console.log('educationalList', educationalList)
    }, [educationalList])

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const upDateResumeId = params?.resumeId
            const updateData = {
                education: educationalList.map(({ id, ...rest }) => rest),
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
            <Accordion
                type='multiple'
                collapsible
                defaultValue={[educationalList[0]?.id ?? `edu_sub_${0}`]}
                className='space-y-4 py-4 pb-10'
            >
                {educationalList.length > 0 ? (
                    educationalList.map((item, index) => (
                        <CollapsiblePanel key={index} value={item?.id ?? `edu_sub_${index}`} title={`Education ${index}`}>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='space-y-2 col-span-2'>
                                    <Label htmlFor={`universityName`}>{t('universityName')}</Label>
                                    <Input
                                        name='universityName'
                                        onChange={e => handleInput(e, index)}
                                        defaultValue={item?.universityName}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor={`degree`}>{t('degree')}</Label>
                                    <Input name='degree' onChange={e => handleInput(e, index)} defaultValue={item?.degree} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor={`major`}>{t('major')}</Label>
                                    <Input name='major' onChange={e => handleInput(e, index)} defaultValue={item?.major} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor={`startDate`}>{t('startDate')}</Label>
                                    <Input
                                        type='date'
                                        name='startDate'
                                        onChange={e => handleInput(e, index)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor={`endDate`}>{t('endDate')}</Label>
                                    <Input type='date' name='endDate' onChange={e => handleInput(e, index)} defaultValue={item?.endDate} />
                                </div>

                                <div className='space-y-2 col-span-2'>
                                    <Label htmlFor={`description`}>{t('description')}</Label>
                                    <Textarea name='description' onChange={e => handleInput(e, index)} defaultValue={item?.description} />
                                </div>
                            </div>
                        </CollapsiblePanel>
                    ))
                ) : (
                    <div className='text-accent-foreground'>Loading...</div>
                )}
            </Accordion>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewEducation} className='text-primary'>
                        + Add More Education
                    </Button>
                    <Button variant='outline' onClick={RemoveEducation} className='text-primary'>
                        - Remove
                    </Button>
                </div>

                <Button disabled={loading} type='submit'>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
    )
}

export default Education
