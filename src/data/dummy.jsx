export default {
    firstName: 'James',
    lastName: 'Carter',
    jobTitle: 'full stack developer',
    address: '525 N tryon Street, NC 28117',
    phone: '(123)-456-7890',
    email: 'exmaple@gmail.com',
    linkedin: 'linkedin.com/in/johndoe',
    themeColor: '#10B981',
    profile:
        'Results-driven Software Engineer with 5+ years of experience developing robust applications and services. Specialized in full-stack development with expertise in React, Node.js, and cloud technologies. Passionate about creating efficient, scalable solutions that solve real-world problems. Strong collaborator who thrives in cross-functional teams and adapts quickly to new technologies.',
    experience: [
        {
            id: 1,
            title: 'Full Stack Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2021',
            endDate: '',
            currentlyWorking: true,
            workSummery:
                ' Designed, developed, and maintained full-stack applications using React and Node.js.\n' +
                '• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n' +
                'various devices and browsers.\n' +
                '• Maintaining the React Native in-house organization application.' +
                '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end' +
                'and back-end systems.',
        },
        {
            id: 2,
            title: 'Frontend Developer',
            companyName: 'Google',
            city: 'Charlotte',
            state: 'NC',
            startDate: 'May 2019',
            endDate: 'Jan 2021',
            currentlyWorking: false,
            workSummery:
                ' Designed, developed, and maintained full-stack applications using React and Node.js.' +
                '• Implemented responsive user interfaces with React, ensuring seamless user experiences across' +
                'various devices and browsers.' +
                '• Maintaining the React Native in-house organization application.' +
                '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end' +
                'and back-end systems.',
        },
    ],
    education: [
        {
            id: 1,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: 'Dec:2019',
            degree: 'MASTER OF SCIENCE IN COMPUTER SCIENCE',
            major: 'Computer Science',
            description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with honors. GPA: 3.9/4.0',
        },
        {
            id: 2,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: 'Dec:2019',
            degree: 'BACHELOR OF SCIENCE IN SOFTWARE ENGINEERING',
            major: 'Computer Science',
            description: "Dean's List for all semesters. Participated in ACM programming competitions. GPA: 3.8/4.0",
        },
    ],
    skills: [
        { name: 'HTML/CSS', rating: 90 },
        { name: 'JavaScript/TypeScript', rating: 95 },
        { name: 'React/Next.js', rating: 90 },
        { name: 'Node.js', rating: 85 },
        { name: 'Python', rating: 80 },
        { name: 'AWS/Cloud Services', rating: 75 },
        { name: 'Docker/Kubernetes', rating: 70 },
        { name: 'SQL/NoSQL Databases', rating: 85 },
        { name: 'CI/CD', rating: 80 },
    ],
}
