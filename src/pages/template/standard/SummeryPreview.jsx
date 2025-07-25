import React from 'react'

function SummeryPreview({ resumeInfo }) {
    return <p className='my-4 text-sm leading-relaxed text-muted-foreground'>{resumeInfo?.profile}</p>
}

export default SummeryPreview
