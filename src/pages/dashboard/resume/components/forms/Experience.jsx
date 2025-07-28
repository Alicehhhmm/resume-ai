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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from '../common/collapsible-panel'
import RichTextEditor from '../common/RichTextEditor'

import { useResumeEdit, useTransformLang } from '@/hooks'

import { UpdateResumeDetail } from '@/api/apis/resume'

const uuid = uuidv4()

const initialFormField = {
    id: uuid,
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
}

function Experience() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { resumeInfo, setResumeInfo } = useResumeEdit()

    // States

    const [loading, setLoading] = useState(false)
    const [experinceList, setExperinceList] = useState([initialFormField])

    // Method

    useEffect(() => {
        if (resumeInfo?.experience?.length > 0) {
            setExperinceList(resumeInfo?.experience)
        }
    }, [])

    const handleInput = (index, event) => {
        const { name, value } = event.target

        const newEntries = experinceList.slice()
        newEntries[index][name] = value

        setExperinceList(newEntries)
    }

    const AddNewExperience = () => {
        setExperinceList([...experinceList, initialFormField])
    }

    const RemoveExperience = () => {
        setExperinceList(experinceList => experinceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experinceList.slice()
        newEntries[index][name] = e.target.value

        setExperinceList(newEntries)
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experinceList,
        })
    }, [experinceList])

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const upDateResumeId = params?.resumeId
            const updateData = {
                experience: experinceList.map(({ id, ...rest }) => rest),
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
            <Accordion type='multiple' collapsible defaultValue={[experinceList[0]?.id ?? `exp_sub_${0}`]} className='space-y-4 py-4 pb-10'>
                {experinceList.length > 0 ? (
                    experinceList.map((item, index) => (
                        <CollapsiblePanel key={index} value={item?.id ?? `exp_sub_${index}`} title={`Experince ${index}`}>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='space-y-2'>
                                    <Label className='text-xs'>{t('positionTitle')}</Label>
                                    <Input name='title' onChange={event => handleInput(index, event)} defaultValue={item?.title} />
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-xs'>{t('companyName')}</Label>
                                    <Input
                                        name='companyName'
                                        onChange={event => handleInput(index, event)}
                                        defaultValue={item?.companyName}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-xs'>{t('city')}</Label>
                                    <Input name='city' onChange={event => handleInput(index, event)} defaultValue={item?.city} />
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-xs'>{t('state')}</Label>
                                    <Input name='state' onChange={event => handleInput(index, event)} defaultValue={item?.state} />
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-xs'>{t('startDate')}</Label>
                                    <Input
                                        type='date'
                                        name='startDate'
                                        onChange={event => handleInput(index, event)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-xs'>{t('endDate')}</Label>
                                    <Input
                                        type='date'
                                        name='endDate'
                                        onChange={event => handleInput(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummary}
                                        onRichTextEditorChange={event => handleRichTextEditor(event, 'workSummary', index)}
                                    />
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
                    <Button variant='outline' onClick={AddNewExperience} className='text-primary'>
                        + Add More Experience
                    </Button>
                    <Button variant='outline' onClick={RemoveExperience} className='text-primary'>
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

export default Experience
