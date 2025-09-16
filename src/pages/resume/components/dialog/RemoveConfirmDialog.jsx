import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'

/**
 * 删除确认对话框组件
 * 用于在用户执行删除操作前显示确认提示，防止误操作
 *
 * @param {Object} props - 组件属性
 * @param {boolean} props.isOpen - 控制对话框的显示状态
 * @param {function} props.onOpenChange - 对话框状态变化时的回调函数，接收新的状态值(boolean)
 * @param {function} props.onConfirm - 用户点击确认按钮时的回调函数
 * @param {string} props.title - 对话框标题文本
 * @param {string} props.description - 对话框描述文本，通常用于说明删除操作的后果
 * @param {string} props.cancelText - 取消按钮的文本内容
 * @param {string} props.confirmText - 确认按钮的文本内容
 * @param {boolean} props.isLoading - 确认按钮是否加载中状态
 * @param {string} [props.className] - 可选的CSS类名，用于自定义对话框样式
 * @param {Object} props.props - 其他传递给AlertDialog组件的属性

 *
 * @returns {JSX.Element} 返回一个确认删除的对话框组件
 *
 * @example
 * ```jsx
 * <RemoveConfirmDialog
 *   isOpen={showDialog}
 *   onOpenChange={setShowDialog}
 *   onConfirm={handleDelete}
 *   title="删除确认"
 *   description="您确定要删除这个项目吗？此操作无法撤销。"
 *   cancelText="取消"
 *   confirmText="删除"
 *   className="max-w-md"
 * />
 * ```
 */
function RemoveConfirmDialog({
    isOpen,
    onOpenChange,
    onConfirm,
    title,
    description,
    cancelText,
    confirmText,
    isLoading,
    className,
    ...props
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange} {...props}>
            <AlertDialogContent className={className}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title ?? 'Deletion operation prompt:'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description ?? 'Are you sure you want to delete this item? This operation cannot be undone.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText ?? 'Cancel'}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
                        {isLoading && <Loader2 className='animate-spin' />}
                        {confirmText ?? 'Confirm'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveConfirmDialog
