import { PlusSquare } from 'lucide-react'
import { useTransformLang, useDialog } from '@/hooks/client'

function CeatedResume() {
    const { t } = useTransformLang()
    const { onOpen } = useDialog()

    const handleCreated = () => {
        onOpen('create:new:resume')
    }

    return (
        <div className='gap-4'>
            <div
                className='h-[var(--r-card-height)] gap-2 p-10 border flex flex-col items-center justify-center bg-secondary rounded-md
                hover:bg-secondary/80 transition-all cursor-pointer hover:shadow-md hover:border-dashed hover:border-2'
                onClick={handleCreated}
            >
                <p className='text-md text-muted-foreground'>{t('createNewResume')}</p>
                <PlusSquare className='opacity-60' />
            </div>
        </div>
    )
}

export default CeatedResume
