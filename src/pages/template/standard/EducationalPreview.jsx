import React from 'react'

function EducationalPreview({ resumeInfo }) {
    return (
        <div className='my-8'>
            <h2 className='mb-2 text-center text-sm font-bold uppercase tracking-wide' style={{ color: resumeInfo?.themeColor }}>
                Education
            </h2>
            <hr className='border mb-4' style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.education?.map((education, index) => (
                <div key={index} className='mb-6 space-y-1'>
                    <h3 className='text-sm font-semibold' style={{ color: resumeInfo?.themeColor }}>
                        {education?.universityName}
                    </h3>
                    <p className='text-xs flex justify-between text-muted-foreground'>
                        <span>
                            {education?.degree} in {education?.major}
                        </span>
                        <span>
                            {education?.startDate} - {education?.endDate}
                        </span>
                    </p>
                    <p className='text-xs text-muted-foreground'>{education?.description}</p>
                </div>
            ))}
        </div>
    )
}

export default EducationalPreview
