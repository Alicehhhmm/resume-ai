import ResumeHeader from './resume-header'
import ContactBar from './contact-bar'
import ProfileSection from './profile-section'
import EducationSection from './education-section'
import ExperienceSection from './experience-section'
import SkillsSection from './skills-section'

function SimpleResume({ resumeInfo: content }) {
    if (content === undefined || content === null) {
        return <div className='text-center text-gray-500'>Loading...</div>
    }

    const contactInfo = {
        phone: content?.phone,
        email: content?.email,
        address: content?.address,
        linkedin: content?.linkedin,
    }

    return (
        <div className='h-full max-w-[850px] z-10 bg-background'>
            <div id='resume-content' className='bg-resume dark:bg-gray-800 shadow-lg rounded-sm overflow-hidden print:shadow-none'>
                <ResumeHeader
                    name={(content?.firstName + ' ' + content?.lastName).trim()}
                    title={content?.jobTitle}
                    themeColor={content.themeColor}
                />

                <ContactBar contact={contactInfo} themeColor={content.themeColor} />

                <div className='p-8 md:p-10 space-y-8'>
                    <ProfileSection sectionTitle={'profile'} profile={content?.profile} themeColor={content.themeColor} />
                    <EducationSection sectionTitle={'education'} education={content?.education} themeColor={content.themeColor} />
                    <ExperienceSection sectionTitle={'experience'} experience={content?.experience ?? []} themeColor={content.themeColor} />
                    <SkillsSection sectionTitle={'skills'} skills={content?.skills} themeColor={content.themeColor} />
                </div>
            </div>
        </div>
    )
}

export default SimpleResume
