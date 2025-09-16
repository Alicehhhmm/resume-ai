import { siteNavigation } from '@/config/navigation.json.mjs'

export const useSiteNavigation = () => {
    // Tools Fun1: generate navigation map
    // future: To prepare for the introduction of i18n
    const mapNavigationEntries = entries => {
        if (!entries) return []

        return Object.entries(entries).map(([key, { href, label, icon }]) => {
            return [
                key,
                {
                    href,
                    label,
                    icon,
                },
            ]
        })
    }

    // Tools Fun2:generate flattened navigation map
    // purpose: [[key,{href, label}], ...] => [{ key, href, label }, ...]
    const flattenMapNavigation = source =>
        source.map(([key, items]) => ({
            key,
            ...items,
        }))

    // generate header navigation
    const headerNavgations = mapNavigationEntries(siteNavigation.headerNavigation)

    // generate siderbar navigation
    const sidebarNavigations = mapNavigationEntries(siteNavigation.sidebarNavigation)

    // generate dashboard navigation
    const dashboardNavigations = mapNavigationEntries(siteNavigation.dashboardNavigation)

    return {
        flattenMapNavigation,
        headerNavgations,
        sidebarNavigations,
        dashboardNavigations,
    }
}
