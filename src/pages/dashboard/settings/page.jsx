import { LanguagesIcon } from 'lucide-react'

import { ThemeToggle } from '@/components/common'

import { cn } from '@/lib/utils'
import { useTransformLang } from '@/hooks'

const SectionRow = ({ title, description, className, children }) => {
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            <div className='space-y-1'>
                <label className='text-base font-medium'>{title}</label>
                {description && <p className='text-sm text-muted-foreground'>{description}</p>}
            </div>
            <div className='flex-shrink-0'>{children}</div>
        </div>
    )
}

function SettingsPage() {
    const { t } = useTransformLang()
    return (
        <div className='flex-1 flex flex-col gap-4 p-4'>
            <header className='space-y-1'>
                <h1 className='text-xl font-semibold'>{t('systemSettings')}</h1>
                <p className='text-sm text-muted-foreground'>Adjust the default settings of the system</p>
            </header>
            <div className='border-b'></div>
            <SectionRow title={t('themeToggle')}>
                <div className='flex'>
                    <ThemeToggle />
                </div>
            </SectionRow>

            <SectionRow title={t('languages')}>
                {/* DOTO: use i18n <LanguagesToggle /> */}
                <LanguagesIcon />
            </SectionRow>
        </div>
    )
}

export default SettingsPage
