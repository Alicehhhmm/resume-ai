'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { EditorProvider, EditorMenuSidebar, EditorMainContent } from '@/pages/editor/components'

import { Edit, HomeIcon, SettingsIcon, TerminalIcon } from 'lucide-react'
import { useSiteNavigation } from '@/hooks'

/**
 * Menu icon mapped
 * The keyName must be the same as the icon value configured in `@/config/navigation.json`.
 */
const menuIconMap = {
    home: HomeIcon,
    edit: Edit,
    template: TerminalIcon,
    settings: SettingsIcon,
}

const mapNavigationWithIcons = (items, iconMap) => {
    if (!Array.isArray(items)) return items

    return items.map(item => ({
        ...item,
        icon: iconMap[item.icon] ?? null,
    }))
}

export default function EditorLayout({ children }) {
    const { sidebarNavigations, flattenMapNavigation } = useSiteNavigation()

    const mappedSidebarNavigates = flattenMapNavigation(sidebarNavigations)

    const navMain = mapNavigationWithIcons(mappedSidebarNavigates, menuIconMap)

    return (
        <EditorProvider>
            <SidebarProvider defaultOpen={false}>
                <EditorMenuSidebar menuList={{ navMain }} />
                <SidebarInset>
                    <EditorMainContent>{children}</EditorMainContent>
                </SidebarInset>
            </SidebarProvider>
        </EditorProvider>
    )
}
