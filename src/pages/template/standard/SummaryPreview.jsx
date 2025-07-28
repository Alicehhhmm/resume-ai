import React from 'react'

function SummaryPreview({ resumeInfo }) {
    return <p className='my-4 text-sm leading-relaxed text-muted-foreground'>{resumeInfo?.profile}</p>
}

export default SummaryPreview
