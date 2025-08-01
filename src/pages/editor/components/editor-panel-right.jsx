'use client'

import { CollapsedWrapper } from '@/components/common'
import { useEditor } from '@/pages/editor/components'

const EditorPanelRight = ({ children, onChange }) => {
    const { panels, setPanels } = useEditor()

    const onToggle = collapsed => {
        setPanels(pre => ({ ...pre, rightHide: collapsed }))
        onChange?.()
    }

    return (
        <CollapsedWrapper collapsedWidth={0} expandedWidth={320} position='right' collapsed={panels.rightHide} onCollapsedChange={onToggle}>
            {children}
        </CollapsedWrapper>
    )
}

export default EditorPanelRight
