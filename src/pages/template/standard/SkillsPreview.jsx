import React from 'react'

function SkillsPreview({ resumeInfo }) {
    return (
        <div className='my-8'>
            <h2 className='mb-2 text-center text-sm font-bold uppercase tracking-wide' style={{ color: resumeInfo?.themeColor }}>
                Skills
            </h2>
            <hr className='border mb-4' style={{ borderColor: resumeInfo?.themeColor }} />

            <div className='grid grid-cols-2 gap-y-3 gap-x-6'>
                {resumeInfo?.skills?.map((skill, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <span className='text-xs text-muted-foreground'>{skill.name}</span>
                        <div className='relative h-2 w-[120px] rounded bg-muted'>
                            <div
                                className='absolute left-0 top-0 h-full rounded'
                                style={{
                                    width: `${skill.rating}%`,
                                    backgroundColor: resumeInfo?.themeColor,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillsPreview
