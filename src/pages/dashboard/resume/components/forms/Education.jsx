import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useResumeEdit } from '@/hooks'

function Education() {
    const { resumeInfo, updateEducation } = useResumeEdit()

    const edu = {
        name: (resumeInfo?.firstName + ' ' + resumeInfo?.lastName).trim(),
        title: resumeInfo?.jobTitle,
        period: resumeInfo?.startDate + ' ' + resumeInfo?.endDate,
        ...resumeInfo,
    }

    const t = message => {
        // TODO: i18n change
        return message
    }

    return (
        <div className='space-y-4'>
            <div className='space-y-2'>
                <Label htmlFor={`degree`}>{t('degree')}</Label>
                <Input id={`degree`} value={edu.degree} onChange={e => updateEducation(index, { degree: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor={`universityName`}>{t('universityName')}</Label>
                <Input
                    id={`universityName`}
                    value={edu.universityName}
                    onChange={e => updateEducation(index, { universityName: e.target.value })}
                />
            </div>

            <div className='space-y-2'>
                <Label htmlFor={`period`}>{t('period')}</Label>
                <Input id={`period`} value={edu.period} onChange={e => updateEducation(index, { period: e.target.value })} />
            </div>

            <div className='space-y-2'>
                <Label htmlFor={`description`}>{t('description')}</Label>
                <Textarea
                    id={`description`}
                    value={edu.description}
                    onChange={e => updateEducation(index, { description: e.target.value })}
                    rows={3}
                />
            </div>
        </div>
    )
}

export default Education
