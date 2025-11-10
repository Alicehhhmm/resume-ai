import { useParams } from 'react-router-dom'

import AgentAcitons from '../ai/agent-acitons'
import ModelSelectorDropdown from '../ai/model-selector-dropdown'
import { RichTextInput, RichFooterBar } from '@/components/common/rich-input'

import { MODELS } from '@/constants/llm'
import { useOpenAiStore, useResumeEdit, useTransformLang } from '@/hooks'

function Summary() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { resumeInfo: basics, setResumeInfo } = useResumeEdit()
    const { model, setModel } = useOpenAiStore(state => state)

    const section = {
        summay: `<p>summary section content</p>`,
    }

    if (!basics) {
        return null
    }

    // State

    // Method

    const handleRichTextInput = e => {
        const name = 'profile'
        const value = e

        // setResumeInfo({
        //     ...basics,
        //     [name]: value,
        // })
        console.log('handleRichTextInput', e)
    }

    return (
        <section id='summary' className=''>
            <RichTextInput
                content={section}
                onChange={handleRichTextInput}
                footerbar={editor => (
                    <RichFooterBar className=' justify-between '>
                        <AgentAcitons value={section} onChange={() => {}} className='' />
                        <ModelSelectorDropdown models={MODELS} defaultValue={model} onChange={val => setModel(val)} />
                    </RichFooterBar>
                )}
            />
        </section>
    )
}

export default Summary
