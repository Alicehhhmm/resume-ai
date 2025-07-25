import SectionHeading from './SectionHeading'

function EducationSection({ education, sectionTitle }) {
    if (!education || education.length === 0) {
        return null
    }

    return (
        <section className='mb-8'>
            <SectionHeading>{sectionTitle}</SectionHeading>
            {education.map((edu, index) => (
                <div key={index} className={index > 0 ? 'mt-4' : ''}>
                    <h3 className='font-bold text-primary'>{edu.universityName}</h3>
                    <div className='flex flex-wrap justify-between text-sm text-muted-foreground'>
                        <span className='flex flex-col gap-1'>
                            {edu?.degree}
                            <span>in {edu?.major}</span>
                        </span>
                        <span>
                            {edu?.startDate} - {edu?.endDate}
                        </span>
                    </div>
                    <p className='text-sm mt-1'>{edu.description}</p>
                </div>
            ))}
        </section>
    )
}

export default EducationSection
