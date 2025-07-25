import React from 'react'
import { Link } from 'react-router-dom'
import { Home, SidebarClose } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion } from '@/components/ui/accordion'

import CollapsiblePanel from './common/collapsible-panel'

import PersonalDetail from './forms/PersonalDetail'
import Education from './forms/Education'
import Experience from './forms/Experience'
import Skills from './forms/Skills'
import Summery from './forms/Summery'

import { useResumeEdit } from '@/hooks'

function ResumeEditPanel() {
    const { resumeInfo } = useResumeEdit()

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <Link to='/dashboard'>
                    <Button variant='default' size='icon'>
                        <Home />
                    </Button>
                </Link>

                <Button variant='outline' size='icon'>
                    <SidebarClose />
                </Button>
            </div>

            <ScrollArea className='max-h-dvh w-full overflow-hidden border-t pr-2'>
                <Accordion type='single' collapsible defaultValue='personal' className='space-y-4 py-4 pb-10'>
                    <CollapsiblePanel value='personal' title='Personal Detail'>
                        <PersonalDetail />
                    </CollapsiblePanel>

                    <CollapsiblePanel value='summary' title='Summary'>
                        <Summery />
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
