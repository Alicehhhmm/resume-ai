import { ResumeInfoContext } from '@/pages/dashboard/resume/context/resume-info-context'

function ResumeEditProvider({ value, children }) {
    const contextValue = {
        ...value,
    }

    return <ResumeInfoContext.Provider value={contextValue}>{children}</ResumeInfoContext.Provider>
}

export default ResumeEditProvider
