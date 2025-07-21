'use client'

import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NavItems = ({ items, className }) => {
    return (
        <nav className={cn('hidden lg:flex items-center gap-4 text-sm font-medium', className)}>
            {items.map(item => (
                <NavLink
                    key={item.key ?? item.href}
                    to={item.href}
                    className={({ isActive }) =>
                        cn(
                            'px-2 py-1 rounded-md transition-colors duration-200',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            isActive
                                ? 'text-foreground font-semibold bg-muted/50'
                                : 'text-muted-foreground hover:text-primary hover:bg-muted'
                        )
                    }
                    end
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    )
}

NavItems.displayName = 'NavItems'

export default memo(NavItems)
