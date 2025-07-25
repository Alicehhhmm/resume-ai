import SectionHeading from './SectionHeading'

function ProfileSection({ profile, sectionTitle }) {
    return (
        <section className='mb-8'>
            <SectionHeading>{sectionTitle}</SectionHeading>
            <p className='text-foreground leading-relaxed'>{profile}</p>
        </section>
    )
}

export default ProfileSection
