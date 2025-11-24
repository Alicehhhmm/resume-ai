import { ArchiveIcon, CalendarPlusIcon, ClockIcon, ListFilterPlusIcon, MailCheckIcon, TagIcon, Trash2Icon } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    CollapsedGroup,
    CollapsedGroupTrigger,
    CollapsedGroupContent,
    CollapsedGroupTriggerButton,
    CollapsedGroupHeader,
    CollapsedGroupTitle,
    CollapsedGroupActions,
    CollapsedGroupItem,
} from '@/components/common/collapsed-group'
import { DragDropGroup, DraggableItem } from '@/components/common/draggable-adapter'
import { Added, Handle, Nav, More } from '@/components/common/Action'
import { cn } from '@/lib/utils'

// ===============================
// More menu（更多操作）
// ===============================
function MoreMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <More />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-52'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <MailCheckIcon />
                        Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ArchiveIcon />
                        Archive
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <ClockIcon />
                        Snooze
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CalendarPlusIcon />
                        Add to Calendar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ListFilterPlusIcon />
                        Add to List
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <TagIcon />
                            Label As...
                        </DropdownMenuSubTrigger>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant='destructive'>
                        <Trash2Icon />
                        Trash
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function DemoEditorPanel() {
    const mockItems = [
        { id: 1, label: '教育经历 1' },
        { id: 2, label: '教育经历 2' },
        { id: 3, label: '教育经历 3' },
    ]

    return (
        <div className='w-[100%] border rounded bg-background'>
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <CollapsedGroupHeader className={cn('bg-muted/60 rounded hover:bg-muted active:bg-primary/10')}>
                        <CollapsedGroupActions site='left'>
                            <CollapsedGroupTitle>教育经历</CollapsedGroupTitle>
                        </CollapsedGroupActions>
                        <CollapsedGroupActions site='right'>
                            <More onClick={() => alert('更多操作')} />

                            <CollapsedGroupTriggerButton />
                        </CollapsedGroupActions>
                    </CollapsedGroupHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className='flex flex-col gap-2 px-4 py-2 '>
                    <DragDropGroup>
                        {mockItems.map((item, index) => (
                            <DraggableItem key={item.id} dragId={item.id} index={index}>
                                <CollapsedGroupItem>
                                    <CollapsedGroup>
                                        <CollapsedGroupTrigger asChild>
                                            <CollapsedGroupHeader className={cn('bg-muted/60 rounded hover:bg-muted active:bg-primary/10')}>
                                                <CollapsedGroupActions site='left'>
                                                    {/* 外部自定义的拓展组件 */}
                                                    <Handle />

                                                    {/* 内部组件 */}
                                                    <CollapsedGroupTitle>外部自定义的拓展组件</CollapsedGroupTitle>
                                                </CollapsedGroupActions>

                                                <CollapsedGroupActions site='right'>
                                                    {/* 外部自定义的拓展组件 */}
                                                    <Added onClick={() => alert('新增一项')} />
                                                    <Nav onClick={() => alert('新增一项')} />
                                                    {/* <More onClick={onHandleMore} /> */}
                                                    <MoreMenu />

                                                    {/* 内部组件 */}
                                                    <CollapsedGroupTriggerButton />
                                                </CollapsedGroupActions>
                                            </CollapsedGroupHeader>
                                        </CollapsedGroupTrigger>
                                        <CollapsedGroupContent>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm'>{item.label}</span>
                                                <span className='text-xs text-muted-foreground'>详细内容区域</span>
                                            </div>
                                        </CollapsedGroupContent>
                                    </CollapsedGroup>
                                </CollapsedGroupItem>
                            </DraggableItem>
                        ))}
                    </DragDropGroup>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
