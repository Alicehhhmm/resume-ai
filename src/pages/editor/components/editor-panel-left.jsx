'use client'

import { CollapsedWrapper } from '@/components/common'
import { useEditor } from '@/pages/editor/components'

const EditorPanelLeft = ({ children, onChange }) => {
    const { panels, setPanels } = useEditor()

    const onToggle = collapsed => {
        setPanels(pre => ({ ...pre, leftHide: collapsed }))
        onChange?.()
    }

    return (
        <CollapsedWrapper
            collapsedWidth={0}
            expandedWidth={520}
            resizable
            position='left'
            collapsed={panels.leftHide}
            onCollapsedChange={onToggle}
        >
            {children}
        </CollapsedWrapper>
    )
}

export default EditorPanelLeft
