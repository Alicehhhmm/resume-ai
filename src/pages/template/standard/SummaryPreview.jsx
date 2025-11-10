import React from 'react'

function SummaryPreview({ resumeInfo }) {
    return (
        <section className='my-4 text-sm leading-relaxed text-muted-foreground'>
            <div className='wysiwyg' dangerouslySetInnerHTML={{ __html: resumeInfo.profile }} />
        </section>
    )
}

export default SummaryPreview
