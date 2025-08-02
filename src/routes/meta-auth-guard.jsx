import { RolesAuthGuard } from '@/routes/roles-auth-guard'

export const MetaAuthGuard = ({ element, meta }) => {
    const { auth, roles } = meta || {}

    if (auth) {
        return <RolesAuthGuard roles={roles}>{element}</RolesAuthGuard>
    }

    return element
}
