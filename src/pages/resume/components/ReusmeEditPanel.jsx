import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion } from '@/components/ui/accordion'

import EditPanelSkeleton from './edit-panel-skeleton'
import CollapsiblePanel from './common/collapsible-panel'

import HeaderSetion from './forms/HeaderSetion'
import PersonalDetail from './forms/PersonalDetail'
import Education from './forms/Education'
import Experience from './forms/Experience'
import Skills from './forms/Skills'
import Summary from './forms/Summary'

import { useResumeEdit } from '@/hooks'

function ResumeEditPanel() {
    // hooks
    const { resumeInfo } = useResumeEdit()

    // States

    if (!resumeInfo) {
        return <EditPanelSkeleton />
    }

    return (
        <div className='flex flex-col'>
            <HeaderSetion />

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

                    <div className='h-20'></div>
                </Accordion>
            </ScrollArea>
        </div>
    )
}

export default ResumeEditPanel
