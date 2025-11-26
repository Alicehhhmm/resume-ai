import { DragDropGroup } from '@/components/common/draggable-adapter'
import { SectionItem } from './section-item'

export function SectionList({ items, renderTitle, renderContent, actions, onCollision, onDragEnd, className = '' }) {
    return (
        <DragDropGroup onCollision={onCollision} onDragEnd={onDragEnd} className={className}>
            {items.map((item, index) => (
                <SectionItem
                    key={item.id}
                    index={index}
                    item={item}
                    actions={actions}
                    renderTitle={renderTitle}
                    renderContent={renderContent}
                />
            ))}
        </DragDropGroup>
    )
}
