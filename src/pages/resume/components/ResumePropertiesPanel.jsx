import { Link, useParams } from 'react-router-dom'
import { ViewIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { CollapsibleRow } from '@/components/common'

function ResumePropertiesPanel() {
    // hooks
    const { resumeId } = useParams()

    return (
        <div data-label='properties_panel' className='pb-12'>
            <div className='header flex items-center justify-start gap-1 px-2 pb-2'>
                <Link to={'/my-resume/' + resumeId + '/view'}>
                    <Button variant='ghost' size='panel'>
                        <ViewIcon className='panel-icon' />
                    </Button>
                </Link>
            </div>
            <CollapsibleRow open title='properties_panel'>
                properties_panel-row
            </CollapsibleRow>
            <CollapsibleRow open title='properties_panel2'>
                properties_panel-row
            </CollapsibleRow>
            <CollapsibleRow open={false} title='properties_panel3'>
                properties_panel-row
            </CollapsibleRow>
        </div>
    )
}

export default ResumePropertiesPanel
