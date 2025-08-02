import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Home, SidebarClose, Settings, ViewIcon } from 'lucide-react'

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

function ResumeEditPanel() {
    // hooks
    const { resumeId } = useParams()
    const { resumeInfo } = useResumeEdit()

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-row gap-4'>
                    <Link to='/dashboard'>
                        <Button variant='outline' size='icon'>
                            <Home />
                        </Button>
                    </Link>

                    <Link to='/setting'>
                        <Button variant='outline' size='icon'>
                            <Settings />
                        </Button>
                    </Link>

                    <Link to={'/my-resume/' + resumeId + '/view'}>
                        <Button variant='outline' size='icon'>
                            <ViewIcon />
                        </Button>
                    </Link>
                </div>

                <Button variant='outline' size='icon'>
                    <SidebarClose />
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
