'use client'

import { useMemo } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { EditorProvider, EditorMenuSidebar, EditorMainContent } from '@/pages/editor/components'

import { Edit, HomeIcon, SettingsIcon, TerminalIcon } from 'lucide-react'
import { useSiteNavigation, useGlobalResume } from '@/hooks'

/* ----------------------------------------
 * utils: buildHref + mapNavigationWithIcons
 * -------------------------------------- */

/**
 * 替换 href 中的参数占位符
 * @param {string} href
 * @param {Object} params
 * @returns {string}
 */
const buildHref = (href, params) => href.replace(/:([a-zA-Z]+)/g, (_, key) => params[key] || `:${key}`)

/**
 * 映射导航项附加图标与 href 参数
 * @param {Array} items
 * @param {Object} iconMap
 * @param {Object} params
 * @returns {Array}
 */
const mapNavigationWithIcons = (items, iconMap, params) => {
    if (!Array.isArray(items)) return []

    return items.map(item => ({
        ...item,
        icon: iconMap[item.icon] ?? null,
        href: buildHref(item.href, params),
    }))
}

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

export default function EditorLayout({ children }) {
    const { sidebarNavigations, flattenMapNavigation } = useSiteNavigation()
    const { selectTemplate } = useGlobalResume()

    const mappedSidebarNavigates = flattenMapNavigation(sidebarNavigations)

    const hrefParams = selectTemplate?.documentId ? { resumeId: selectTemplate.documentId } : {}

    const navMain = useMemo(
        () => mapNavigationWithIcons(mappedSidebarNavigates, menuIconMap, hrefParams),
        [mappedSidebarNavigates, hrefParams.resumeId]
    )

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
