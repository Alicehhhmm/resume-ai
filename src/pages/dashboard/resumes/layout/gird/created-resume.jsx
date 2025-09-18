import { PlusSquare } from 'lucide-react'
import { useTransformLang, useDialog } from '@/hooks/client'

function CeatedResume() {
    const { t } = useTransformLang()
    const { onOpen } = useDialog()

    const handleCreated = () => {
        // Future: To go to the page for creating a new resume,
        // please first select a template and then click the "Use template" button.
        onOpen('create:new:resume')
    }

    return (
        <div className='relative group size-full'>
            <div
                className='aspect-[1/1.4142] gap-2 p-4 border flex flex-col items-center justify-center bg-secondary rounded-md
                hover:bg-secondary/80 transition-all cursor-pointer hover:shadow-md hover:border-dashed hover:border-2'
                onClick={handleCreated}
            >
                <PlusSquare className='opacity-60' size={48} />
                <p className='text-md text-muted-foreground'>{t('createNewResume')}</p>
            </div>
        </div>
    )
}

export default CeatedResume
