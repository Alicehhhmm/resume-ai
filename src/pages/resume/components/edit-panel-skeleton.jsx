import { Skeleton } from '@/components/ui/skeleton'

function EditPanelSkeleton() {
    return (
        <div className='flex flex-col '>
            <div className='flex justify-between items-center h-14 px-4'>
                <div className='flex flex-row gap-x-4'>
                    <Skeleton className='h-6 w-48 rounded-md' />
                </div>
                <Skeleton className='h-10 w-10 rounded-md' />
            </div>

            <div className='flex-1 w-full overflow-hidden border-t p-4 space-y-6'>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className='space-y-3 bg-muted/10 py-3'>
                        <Skeleton className='h-6 w-1/3 rounded-md' />
                        <div className='space-y-2'>
                            <Skeleton className='h-4 w-full rounded-md' />
                            <Skeleton className='h-4 w-5/6 rounded-md' />
                            <Skeleton className='h-4 w-2/3 rounded-md' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditPanelSkeleton
