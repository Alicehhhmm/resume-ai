import { useEffect, useState } from 'react'
import { LoaderCircle, Brain } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RichTextInput, RichFooterBar } from '@/components/common/rich-input'

import { useResumeEdit, useTransformLang } from '@/hooks'

import { UpdateResumeDetail } from '@/services/resume'
import { GeminiAiChatSession } from '@/services/ai'
import { prompt } from '@/config/ai-generater-prompt'

function Summary() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { resumeInfo: basics, setResumeInfo } = useResumeEdit()

    if (!basics) {
        return null
    }

    // State

    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState()
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState()

    // Method

    useEffect(() => {
        if (summary) {
            setResumeInfo({
                ...basics,
                profile: summary,
            })
        }
    }, [summary])

    const GenerateSummaryFromAI = async e => {
        setLoading(true)

        // TODO: 完善 prompt
        // const PROMPT = prompt.replace('{jobTitle}', basics?.jobTitle)
        // console.log(PROMPT)

        // const result = await GeminiAiChatSession(PROMPT)
        // console.log(result)

        // setAiGenerateSummaryList(JSON.parse(result.response.text()))
        setLoading(false)
    }

    const handleInput = e => {
        const { name, value } = e.target

        setSummary(value)

        setResumeInfo({
            ...basics,
            [name]: value,
        })
    }

    const handleRichTextInput = e => {
        const name = 'profile'
        const value = e
        setSummary(value)

        setResumeInfo({
            ...basics,
            [name]: value,
        })
        console.log('handleRichTextInput', e)
    }

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const upDateResumeId = params?.resumeId
            const updateData = {
                profile: summary,
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
                    onClick={() => GenerateSummaryFromAI()}
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
                value={summary}
                defaultValue={summary ? summary : basics?.profile}
                onChange={handleInput}
                className='mt-5'
            />
            <RichTextInput
                onChange={handleRichTextInput}
                footerbar={editor => (
                    <RichFooterBar>
                        <Button variant='panel' onClick={() => {}} className='flex truncate'>
                            <Brain className='size-3.5' />
                            <span className='flex-1 truncate'>Generate from AI</span>
                        </Button>
                        {/* TODO: <model-selector-dropdown */}
                    </RichFooterBar>
                )}
            />
            <div className='mt-2 flex justify-end'>
                <Button type='submit' disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
    )
}

export default Summary
