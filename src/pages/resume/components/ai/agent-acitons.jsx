import { useState } from 'react'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { useTransformLang } from '@/hooks/client'
import { GeminiAiChatSession } from '@/services/ai'

function AgentAcitons({ value, onChange, className }) {
    // hooks

    const { t } = useTransformLang()

    // states

    const [loading, setLoading] = useState(false)

    // method

    const onHandle = async activeKey => {
        try {
            setLoading(true)

            const result = value

            if (activeKey === 'polish') result = await GeminiAiChatSession(value)
            if (activeKey === 'extension') result = await GeminiAiChatSession(value)
            if (activeKey === 'simplify') result = await GeminiAiChatSession(value)

            onChange?.(result)
        } catch (error) {
            toast.error('agen error try agent')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn('flex flex-row gap-1', className)}>
            <Button variant='outline' size='sm' onClick={() => onHandle('polish')} disabled={loading}>
                {loading ? <LoaderCircle className='animate-spin' /> : t('polish')}
            </Button>

            <Button variant='outline' size='sm' onClick={() => onHandle('extension')} disabled={loading}>
                {loading ? <LoaderCircle className='animate-spin' /> : t('extension')}
            </Button>

            <Button variant='outline' size='sm' onClick={() => onHandle('simplify')} disabled={loading}>
                {loading ? <LoaderCircle className='animate-spin' /> : t('simplify')}
            </Button>
        </div>
    )
}

export default AgentAcitons
