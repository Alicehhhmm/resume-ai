import { toast } from 'sonner'

import React, { useState } from 'react'
import { Brain, LoaderCircle } from 'lucide-react'

import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar,
    EditorProvider,
    Editor,
} from 'react-simple-wysiwyg'

import { Button } from '@/components/ui/button'
import { useResumeEdit } from '@/hooks/client'
import { GeminiAiChatSession } from '@/api/apis/ai'
import { positionTitle_prompt as PROMPT } from '@/config/ai-generater-prompt'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    // hooks

    const { resumeInfo, setResumeInfo } = useResumeEdit()

    // States

    const [value, setValue] = useState(defaultValue)
    const [loading, setLoading] = useState(false)

    // Method

    const GenerateSummaryFromAI = async () => {
        if (!resumeInfo?.Experience[index]?.title) {
            toast('Please Add Position Title')
            return
        }
        setLoading(true)
        // TODO:完善 ai 提示词与返回数据的格式化
        // const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title)

        // const result = await GeminiAiChatSession.sendMessage(prompt)
        // console.log(result.response.text())
        // const resp = result.response.text()
        // setValue(resp.replace('[', '').replace(']', ''))
        setLoading(false)
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={GenerateSummaryFromAI}
                    disabled={loading}
                    className='flex gap-2 border-primary text-primary'
                >
                    {loading ? (
                        <LoaderCircle className='animate-spin' />
                    ) : (
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    )}
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)
                        onRichTextEditorChange(e)
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor
