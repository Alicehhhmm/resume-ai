'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'

import { useTheme } from '@/components/provider'
import { cn } from '@/lib/utils'

const THEMES = ['light', 'dark', 'system']

const themeIcons = {
    light: <Sun className='size-5' />,
    dark: <Moon className='size-5' />,
    system: <Monitor className='size-5' />,
}

export const ThemeToggle = ({ className }) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const baseStyle = cn(
        'rounded-lg p-2 transition-all duration-300 ease-out',
        'hover:bg-gray-100 dark:hover:bg-fluo-background',
        'transform hover:scale-105 active:scale-95',
        className
    )
    const activeStyle = 'text-lime-500 scale-110'
    const inactiveStyle = 'text-gray-600/90 dark:text-gray-400/90'

    return (
        <div className='flex items-center gap-2 bg-background/80 backdrop-blur-lg rounded-xl p-1 border border-border/20 shadow-sm'>
            {THEMES.map(t => (
                <button
                    key={t}
                    onClick={() => setTheme(t)}
                    aria-label={`${t} theme`}
                    className={cn(baseStyle, theme === t ? activeStyle : inactiveStyle)}
                >
                    {themeIcons[t]}
                </button>
            ))}
        </div>
    )
}

export const ThemeToggleBtn = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const cycleTheme = () => {
        const currentIndex = THEMES.indexOf(theme || 'light')
        const next = THEMES[(currentIndex + 1) % THEMES.length]
        setTheme(next)
    }

    return (
        <button
            onClick={cycleTheme}
            className={cn(
                'rounded-lg p-2 transition-all duration-300 ease-out',
                'hover:bg-gray-100 dark:hover:bg-gray-800/30',
                'transform hover:scale-105 active:scale-95',
                'text-gray-600/90 dark:text-gray-400/90',
                'hover:text-lime-500 dark:hover:text-lime-400'
            )}
            aria-label='Toggle theme'
        >
            <div className='relative h-5 w-5'>
                <div className='absolute inset-0 transition-all duration-300 ease-out'>{themeIcons[theme] ?? themeIcons.light}</div>
            </div>
        </button>
    )
}
