import { useParams } from 'react-router-dom'

import AgentAcitons from '../ai/agent-acitons'
import ModelSelectorDropdown from '../ai/model-selector-dropdown'
import { RichTextInput, RichFooterBar } from '@/components/common/rich-input'

import { MODELS } from '@/constants/llm'
import { useOpenAiStore, useTransformLang, useResumeStore } from '@/hooks'

function Summary() {
    // hooks

    const params = useParams()

    const { t } = useTransformLang()

    const { model, setModel } = useOpenAiStore(state => state)
    const setValue = useResumeStore(state => state.setValue)
    const section = useResumeStore(state => state.resume.data?.sections.summary ?? `<p>summary section content</p>`)

    // State

    // Method

    const handleRichTextInput = value => {
        setValue('sections.summary.contentx', value)
        console.log('handleRichTextInput', value)
    }

    const handleAgent = (editor, value) => {
        editor.commands.setContent(value, true)
        setValue('sections.summary.contentx', value)
    }

    return (
        <section id='summary' className=''>
            {/* TODO: change section to CollapsiblePanel comp */}
            <RichTextInput
                content={section.contentx}
                onChange={handleRichTextInput}
                footerbar={editor => (
                    <RichFooterBar className=' justify-between '>
                        <AgentAcitons value={editor.getText()} onChange={value => handleAgent(editor, value)} />
                        <ModelSelectorDropdown models={MODELS} defaultValue={model} onChange={val => setModel(val)} />
                    </RichFooterBar>
                )}
            />
        </section>
    )
}

export default Summary
