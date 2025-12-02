import React from 'react'

/**
 * Resume Template – Structure Only
 * Mandatory conventions:
 * 1. Root wrapper: <div id='resume-container-wrapper'>
 * 2. Each section: <section id={sectionId}> – never split across pages
 * 3. Every logical row/block inside a section: <div id='section-item'>
 * 4. Keep order: Required → Optional → Custom
 */
function ResumeTemplateDemo() {
    return (
        <div id='resume-container-wrapper' className='resume-wrapper'>
            {/* =============== REQUIRED SECTIONS =============== */}

            {/* 1. Personal / contact information */}
            <section id='profile-section'></section>

            {/* 2. Professional summary */}
            <section id='summary-section'>
                <div id='section-item'>{/* 2–4 line elevator pitch */}</div>
            </section>

            {/* 3. Education */}
            <section id='education-section'>
                <div id='section-item'>{/* school, degree, dates, honors */}</div>
            </section>

            {/* 4. Work experience */}
            <section id='experience-section'>
                <div id='section-item'>{/* employer, role, dates, achievements */}</div>
            </section>

            {/* 5. Projects */}
            <section id='projects-section'>
                <div id='section-item'>{/* project, stack, role, outcome */}</div>
            </section>

            {/* 6. Certifications */}
            <section id='certifications-section'></section>

            {/* 7. Awards */}
            <section id='awards-section'></section>

            {/* =============== OPTIONAL SECTIONS =============== */}

            {/* 8. Skills */}
            <section id='skills-section'>
                <div id='section-item'>{/* skill, level, years */}</div>
            </section>

            {/* 11. Interests */}
            <section id='interests-section'></section>

            {/* 12. Volunteer work */}
            <section id='volunteer-section'>
                <div id='section-item'>{/* org, role, dates, contribution */}</div>
            </section>

            {/* 13. Internships */}
            <section id='internship-section'></section>

            {/* 14. Portfolio */}
            <section id='portfolio-section'>
                <div id='section-item'>{/* title, link, tech stack */}</div>
            </section>

            {/* =============== CUSTOM SECTION =============== */}
            {/* 16. User-defined content */}
            <section id='custom-section'></section>
        </div>
    )
}

export default ResumeTemplateDemo
