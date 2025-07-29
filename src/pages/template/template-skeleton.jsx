import { Skeleton } from '@/components/ui/skeleton'

export function ResumeSkeleton({ experienceItems = 2, educationItems = 2, skillTags = 5, projectItems = 0 }) {
    return (
        <div className='h-full w-[850px] z-10 rounded-md border-t-[20px] p-12 shadow-xl bg-background text-foreground'>
            {/* Personal Detail  */}
            <div className='flex flex-col items-center space-y-3 mb-8'>
                <Skeleton className='w-1/2 md:w-1/3 h-8 rounded-lg' />
                <Skeleton className='w-1/3 md:w-1/4 h-6 rounded-lg' />
            </div>

            <div className='flex flex-wrap justify-center gap-4 mb-6'>
                <Skeleton className='w-1/3 md:w-1/4 h-5 rounded-lg' />
                <Skeleton className='w-1/3 md:w-1/4 h-5 rounded-lg' />
                <Skeleton className='w-1/3 md:w-1/4 h-5 rounded-lg' />
            </div>

            {/* Summary */}

            <div className='mb-8'>
                <Skeleton className='w-1/4 h-6 rounded-lg mb-3' />
                <div className='space-y-2'>
                    <Skeleton className='w-full h-5 rounded-lg' />
                    <Skeleton className='w-4/5 h-5 rounded-lg' />
                    <Skeleton className='w-3/4 h-5 rounded-lg' />
                </div>
            </div>

            {/* Educational */}
            <div className='mb-8'>
                <Skeleton className='w-1/4 h-6 rounded-lg mb-4' />
                {Array.from({ length: educationItems }).map((_, index) => (
                    <div key={index} className='space-y-2 mb-6'>
                        <Skeleton className='w-1/2 h-6 rounded-lg' />
                        <Skeleton className='w-3/4 h-5 rounded-lg' />
                        <div className='flex justify-between mb-2'>
                            <Skeleton className='w-1/4 h-4 rounded-lg' />
                            <Skeleton className='w-1/4 h-4 rounded-lg' />
                        </div>
                        <Skeleton className='w-full h-5 rounded-lg' />
                    </div>
                ))}
            </div>

            {/* Experience */}
            <div className='mb-8'>
                <Skeleton className='w-1/4 h-6 rounded-lg mb-4' />
                {Array.from({ length: experienceItems }).map((_, index) => (
                    <div key={index} className='space-y-2 mb-6'>
                        <Skeleton className='w-1/2 h-6 rounded-lg' />
                        <Skeleton className='w-3/4 h-5 rounded-lg' />
                        <div className='flex justify-between mb-2'>
                            <Skeleton className='w-1/4 h-4 rounded-lg' />
                            <Skeleton className='w-1/4 h-4 rounded-lg' />
                        </div>
                        <Skeleton className='w-full h-5 rounded-lg' />
                        <Skeleton className='w-4/5 h-5 rounded-lg' />
                        <Skeleton className='w-3/4 h-5 rounded-lg' />
                    </div>
                ))}
            </div>

            {/* Skilss */}
            <div className='mb-8'>
                <Skeleton className='w-1/4 h-6 rounded-lg mb-4' />
                <div className='flex flex-wrap gap-2'>
                    {Array.from({ length: skillTags }).map((_, index) => (
                        <Skeleton key={index} className='w-1/6 md:w-1/8 h-6 rounded-full' />
                    ))}
                </div>
            </div>

            {/* Project Experience */}
            {projectItems > 0 && (
                <div className='mb-8'>
                    <Skeleton className='w-1/4 h-6 rounded-lg mb-4' />
                    {Array.from({ length: projectItems }).map((_, index) => (
                        <div key={index} className='space-y-2 mb-6'>
                            <Skeleton className='w-1/2 h-6 rounded-lg' />
                            <Skeleton className='w-3/4 h-5 rounded-lg' />
                            <div className='flex justify-between mb-2'>
                                <Skeleton className='w-1/4 h-4 rounded-lg' />
                                <Skeleton className='w-1/4 h-4 rounded-lg' />
                            </div>
                            <Skeleton className='w-full h-5 rounded-lg' />
                            <Skeleton className='w-4/5 h-5 rounded-lg' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
