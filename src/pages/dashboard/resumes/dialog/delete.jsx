import { useMemo } from 'react'
import { toast } from 'sonner'

import { useDialog, useTransformLang } from '@/hooks/client'
import RemoveConfirmDialog from '@/pages/resume/components/dialog/RemoveConfirmDialog'
import { useDeleteResume } from '@/services/resume'

const ResumeDeleteDialog = () => {
    // hooks

    const { t } = useTransformLang()
    const { options, onClose, targetDialog } = useDialog()

    const { deleteResume, loading } = useDeleteResume()

    // states

    const open = targetDialog(`resume:delete:${options?.did}`)

    // methods

    const handleConfirmRemove = async () => {
        await deleteResume(
            { documentId: options?.did },
            {
                onSuccess: () => {
                    toast.success('Resume deleted successfully!')
                    onClose()
                },
                onError: error => {
                    toast.error('Failed to delete resume. Please try again.')
                    console.error('Error deleting resume:', error)
                },
            }
        )
    }

    const handleChange = isOpen => {
        if (!isOpen) {
            onClose()
        }
    }

    const dialogProps = useMemo(
        () => ({
            title: `${t('removeResumeItem')}`, // 您确定要删除您的简历吗？ Are you sure you want to delete this resume?
            description: `${options.title}`,
            cancelText: t('cancel'),
            confirmText: t('confirm'),
        }),
        [options.title, handleConfirmRemove, t]
    )

    return (
        <RemoveConfirmDialog
            isOpen={open}
            isLoading={loading}
            onOpenChange={handleChange}
            onConfirm={handleConfirmRemove}
            {...dialogProps}
        />
    )
}

export default ResumeDeleteDialog
