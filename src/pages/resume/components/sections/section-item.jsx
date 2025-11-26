import {
    CollapsedGroup,
    CollapsedGroupTrigger,
    CollapsedGroupHeader,
    CollapsedGroupActions,
    CollapsedGroupTriggerButton,
    CollapsedGroupContent,
    CollapsedGroupTitle,
} from '@/components/common/collapsed-group'
import { DraggableItem } from '@/components/common/draggable-adapter'

import { Handle } from '@/components/common/Action'

export function SectionItem({ item, index, actions, renderTitle, renderContent }) {
    return (
        <DraggableItem dragId={item.id} index={index}>
            <CollapsedGroup>
                <CollapsedGroupTrigger asChild>
                    <CollapsedGroupHeader className='bg-muted/60 rounded hover:bg-muted'>
                        <CollapsedGroupActions site='left'>
                            <Handle />
                            <CollapsedGroupTitle>{renderTitle ? renderTitle(item, index) : item.title}</CollapsedGroupTitle>
                        </CollapsedGroupActions>

                        <CollapsedGroupActions site='right'>
                            {typeof actions === 'function' && actions(item, index)}
                            <CollapsedGroupTriggerButton />
                        </CollapsedGroupActions>
                    </CollapsedGroupHeader>
                </CollapsedGroupTrigger>

                <CollapsedGroupContent>{renderContent && renderContent(item, index)}</CollapsedGroupContent>
            </CollapsedGroup>
        </DraggableItem>
    )
}
