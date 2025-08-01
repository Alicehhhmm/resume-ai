'use client'

import { Sidebar } from '@/components/ui/sidebar'
import { SidebarContent } from '@/components/ui/sidebar'

import { SidebarNavFooter, SidebarNavHeader, SidebarNavMain } from '@/pages/editor/components'

export const EditorMenuSidebar = ({ menuList }) => {
    const navMain = menuList?.navMain

    return (
        <Sidebar className='w-64 border-r bg-background' collapsible='icon'>
            <SidebarNavHeader />
            <SidebarContent>
                <SidebarNavMain items={navMain} />
            </SidebarContent>
            <SidebarNavFooter />
        </Sidebar>
    )
}
