import React from 'react'

function ExperiencePreview({ resumeInfo }) {
    return (
        <div className='my-8'>
            <h2 className='mb-2 text-center text-sm font-bold uppercase tracking-wide' style={{ color: resumeInfo?.themeColor }}>
                Professional Experience
            </h2>
            <hr className='border mb-4' style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='mb-6 space-y-1'>
                    <h3 className='text-sm font-semibold' style={{ color: resumeInfo?.themeColor }}>
                        {experience?.title}
                    </h3>
                    <p className='text-xs flex justify-between text-muted-foreground'>
                        <span>
                            {experience?.companyName}, {experience?.city}, {experience?.state}
                        </span>
                        <span>
                            {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}
                        </span>
                    </p>
                    <div
                        className='text-xs leading-snug text-muted-foreground'
                        dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                    />
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview
