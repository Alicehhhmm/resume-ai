'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
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
            <ScrollArea className='h-dvh'>{children}</ScrollArea>
        </CollapsedWrapper>
    )
}

export default EditorPanelRight
