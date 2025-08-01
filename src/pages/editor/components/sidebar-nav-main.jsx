import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

function SidebarNavMain({ items = [] }) {
    let location = useLocation()
    const { pathname } = location

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton tooltip={item.label} asChild>
                                <Link
                                    to={item.href}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 transition-colors hover:bg-accent/50',
                                        item.href === pathname ? 'bg-accent font-medium text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    <item.icon className='size-5 flex-shrink-0' />
                                    <span className='text-sm'>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default SidebarNavMain
