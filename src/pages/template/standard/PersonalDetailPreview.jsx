import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
    return (
        <div className='space-y-1'>
            <h2
                className='text-center text-xl font-bold tracking-wide'
                style={{
                    color: resumeInfo?.themeColor,
                }}
            >
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h2 className='text-center text-sm font-medium text-muted-foreground'>{resumeInfo?.jobTitle}</h2>
            <h2
                className='text-center text-xs font-normal'
                style={{
                    color: resumeInfo?.themeColor,
                }}
            >
                {resumeInfo?.address}
            </h2>

            <div className='mt-2 flex justify-between text-xs text-muted-foreground'>
                <span style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.phone}</span>
                <span style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.email}</span>
            </div>

            <hr
                className='border-[2px] my-2'
                style={{
                    borderColor: resumeInfo?.themeColor,
                }}
            />
        </div>
    )
}

export default PersonalDetailPreview
