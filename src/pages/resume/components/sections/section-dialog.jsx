import { RemoveConfirmDialog } from '../dialog'
import { useTransformLang, useDialog } from '@/hooks'

export function SectionDialog({ sectionKey, item, onSubmit }) {
    // hooks

    const { t } = useTransformLang()
    const { onClose, targetDialog } = useDialog()

    // states

    const open = targetDialog(`${sectionKey}:delete:${item?.id}`)

    const handleChange = isOpen => {
        if (!isOpen) onClose()
    }

    return (
        <RemoveConfirmDialog
            isOpen={open}
            onOpenChange={handleChange}
            onConfirm={onSubmit}
            title={t('deleteItem')}
            description={t('deleteItemDesc')}
            cancelText={t('cancel')}
            confirmText={t('confirm')}
            className='max-w-md'
        />
    )
}
