import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from './common/collapsible-panel'

import PersonalDetail from './forms/PersonalDetail'
import Education from './forms/Education'
import Experience from './forms/Experience'
import Skills from './forms/Skills'
import Summary from './forms/Summary'

import { useResumeEdit } from '@/hooks'

import { EditableTitle } from '@/components/common'
import { LanguagesIcon } from 'lucide-react'

function ResumeEditPanel() {
    // hooks
    const { resumeId } = useParams()
    const { resumeInfo } = useResumeEdit()

    // States

    const [title, setTitle] = useState('My Resume Title')

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center h-14 px-4'>
                <div className='flex flex-row gap-x-4 '>
                    <EditableTitle
                        name='resumeTitle'
                        defaultValue={title}
                        onChange={newTitle => setTitle(newTitle)}
                        placeholder='请输入简历标题'
                    />
                </div>

                <Button variant='outline' size='icon'>
                    <LanguagesIcon />
                </Button>
            </div>

            <ScrollArea className='h-dvh w-full overflow-hidden border-t p-4'>
                <Accordion type='single' collapsible defaultValue='personal' className='space-y-4 py-4 pb-10'>
                    <CollapsiblePanel value='personal' title='Personal Detail'>
                        <PersonalDetail />
                    </CollapsiblePanel>

                    <CollapsiblePanel value='summary' title='Summary'>
                        <Summary />
                    </CollapsiblePanel>

                    <CollapsiblePanel value='education' title='Education'>
                        <Education />
                    </CollapsiblePanel>

                    <CollapsiblePanel value='experience' title='Professional Experience'>
                        <Experience />
                    </CollapsiblePanel>

                    <CollapsiblePanel value='skills' title='Skills'>
                        <Skills />
                    </CollapsiblePanel>
                </Accordion>
            </ScrollArea>
        </div>
    )
}

export default ResumeEditPanel
