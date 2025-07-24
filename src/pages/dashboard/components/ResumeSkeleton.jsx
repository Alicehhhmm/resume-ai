import { Skeleton } from '@/components/ui/skeleton'

export default function ResumeSkeleton({ num = 1 }) {
    const validNum = Number.isInteger(num) && num > 0 ? num : 1

    return (
        <>
            {Array.from({ length: validNum }).map((_, i) => (
                <div key={i} className='h-[var(--r-card-height)] gap-4 p-2 border flex flex-col bg-muted/10 rounded-md animate-pulse'>
                    <Skeleton className='h-2/3 w-full' />
                    <div className='flex flex-col gap-y-2'>
                        <Skeleton className='h-6 w-3/4' />
                        <Skeleton className='h-5 w-1/2' />
                    </div>
                </div>
            ))}
        </>
    )
}
