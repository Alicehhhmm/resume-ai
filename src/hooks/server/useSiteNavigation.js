import { siteNavigation } from '@/config/navigation.json.mjs'

export const useSiteNavigation = () => {
    // Tools Fun1: generate navigation map
    // future: To prepare for the introduction of i18n
    const mapNavigationEntries = entries => {
        if (!entries) return []

        return Object.entries(entries).map(([key, { href, label }]) => {
            return [
                key,
                {
                    href,
                    label,
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

    return {
        flattenMapNavigation,
        headerNavgations,
    }
}
