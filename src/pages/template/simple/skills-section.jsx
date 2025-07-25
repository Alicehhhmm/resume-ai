'use client'

import SectionHeading from './SectionHeading'

const SkillBar = ({ name, rating, color }) => {
    return (
        <div className='mb-2'>
            <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium'>{name}</span>
                <span className='text-sm text-muted-foreground'>{rating}%</span>
            </div>
            <div className='relative h-2 w-auto rounded bg-muted'>
                <div
                    className='absolute left-0 top-0 h-full rounded'
                    style={{
                        width: `${rating}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
        </div>
    )
}

function SkillsSection({ skills = [], sectionTitle, themeColor = '#242526' }) {
    return (
        <section>
            <SectionHeading>{sectionTitle}</SectionHeading>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {skills.length > 0 &&
                    skills.map((skill, index) => <SkillBar key={index} name={skill.name} rating={skill.rating} color={themeColor} />)}
            </div>
        </section>
    )
}

export default SkillsSection
