import { useEffect, useState } from 'react'
import { LoaderCircle, Brain } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useResumeEdit, useTransformLang } from '@/hooks'

import { UpdateResumeDetail } from '@/api/apis/resume'
import { GeminiAiChatSession } from '@/api/apis/ai'
import { prompt } from '@/config/ai-generater-prompt'

function Summery() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { resumeInfo: basics, setResumeInfo } = useResumeEdit()

    if (!basics) {
        return null
    }

    // State

    const [loading, setLoading] = useState(false)
    const [summery, setSummery] = useState()
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState()

    // Method

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...basics,
                profile: summery,
            })
        }
    }, [summery])

    const GenerateSummeryFromAI = async e => {
        setLoading(true)

        // TODO: 完善 prompt
        // const PROMPT = prompt.replace('{jobTitle}', basics?.jobTitle)
        // console.log(PROMPT)

        // const result = await GeminiAiChatSession(PROMPT)
        // console.log(result)

        // setAiGenerateSummeryList(JSON.parse(result.response.text()))
        setLoading(false)
    }

    const handleInput = e => {
        const { name, value } = e.target

        setSummery(value)

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
                profile: summery,
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
            <div className='flex justify-between items-end'>
                <Label htmlFor='profile'>{t('profile')}</Label>
                <Button
                    variant='outline'
                    onClick={() => GenerateSummeryFromAI()}
                    type='button'
                    size='sm'
                    className='border-primary text-primary flex gap-2'
                >
                    <Brain className='h-4 w-4' /> Generate from AI
                </Button>
            </div>
            <Textarea
                name='profile'
                required
                value={summery}
                defaultValue={summery ? summery : basics?.profile}
                onChange={handleInput}
                className='mt-5'
            />
            <div className='mt-2 flex justify-end'>
                <Button type='submit' disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
    )
}

export default Summery
