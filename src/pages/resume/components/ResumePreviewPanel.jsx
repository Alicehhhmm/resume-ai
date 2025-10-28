import { useResumeEdit, useSectionManage } from '@/hooks/client'
import { ResumeSkeleton, getTemplate } from '@/pages/template'

import { useGlobalResume } from '@/hooks/'

/**
 * 将启用的模块按默认布局分组
 * @param {Array} modules - 模块数组
 * @returns {Object} {main: [], sidebar: []} 按布局分组的模块对象
 */
function generateEnabledLayoutGroups(modules = []) {
    return modules.reduce((layoutGroups, module) => {
        if (module.isEnabled) {
            const { defaultLayout } = module
            layoutGroups[defaultLayout] = [...(layoutGroups[defaultLayout] || []), module.sectionId]
        }
        return layoutGroups
    }, {})
}

function ResumePreviewPanel() {
    const { resumeInfo } = useResumeEdit()
    const { selectTemplate } = useGlobalResume()
    const { getEnabledModules } = useSectionManage(state => state)

    if (!resumeInfo) {
        return <ResumeSkeleton />
    }

    const enabledModules = getEnabledModules()
    const layoutGroups = generateEnabledLayoutGroups(enabledModules)

    const TemplateCompoents = getTemplate(selectTemplate?.category)

    return <TemplateCompoents resumeInfo={resumeInfo} layout={layoutGroups} resumeData={resumeInfo} />
}

export default ResumePreviewPanel
