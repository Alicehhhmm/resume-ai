import SectionHeading from './SectionHeading'

const ExperienceItem = ({
    title = '',
    companyName = '',
    city = '',
    state = '',
    currentlyWorking,
    startDate,
    endDate,
    workSummery = '',
}) => {
    return (
        <div>
            <div className='mb-2'>
                <h3 className='font-bold text-primary'>{title}</h3>
                <div className='flex flex-wrap justify-between text-sm text-muted-foreground'>
                    <span>
                        {companyName} | {city}, {state}
                    </span>
                    <span>
                        {startDate} - {currentlyWorking ? 'Present' : endDate}
                    </span>
                </div>
            </div>
            <div className='space-y-1 text-sm leading-relaxed' dangerouslySetInnerHTML={{ __html: workSummery }} />
        </div>
    )
}

function ExperienceSection({ experience = [], sectionTitle = 'Experience' }) {
    const safeExperience = Array.isArray(experience) ? experience : []

    return (
        <section className='mb-8'>
            <SectionHeading>{sectionTitle}</SectionHeading>
            <div className='space-y-6'>
                {safeExperience.length > 0 ? (
                    safeExperience.map((exp, index) => <ExperienceItem key={index} {...exp} />)
                ) : (
                    <div className='text-center text-gray-500'>No experience data available</div>
                )}
            </div>
        </section>
    )
}

export default ExperienceSection
