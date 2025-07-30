import dummy from '@/data/dummy'
import { Button } from '@/components/ui/button'

function ViewTemplateCard({ component: Component, name, thumbnailDesc }) {
    const ResumeComponent = typeof Component === 'function' ? Component : () => <Component resumeInfo={dummy} />

    // view size
    const containerWidth = 282
    const containerHeight = 400

    // A4 size
    const resumeWidth = 794
    const resumeHeight = 1123

    const resumeScale = Math.min(containerWidth / resumeWidth, containerHeight / resumeHeight)

    return (
        <div className='group flex flex-col items-stretch'>
            <div
                className={`
                        relative w-full aspect-[282/400] rounded-xl overflow-hidden bg-background shadow-sm
                        transition-all duration-300 ease-out 
                        group-hover:shadow-lg group-hover:-translate-y-1 group-hover:-translate-x-1
                        group-hover:border-r-3 group-hover:border-b-3 group-hover:border-primary/40
                    `}
            >
                {/* Thumbnail box */}
                <div className='absolute inset-0 flex items-center justify-center overflow-hidden'>
                    <div
                        className='absolute top-1/2 left-1/2 origin-center'
                        style={{
                            width: resumeWidth,
                            height: resumeHeight,
                            transform: `translate(-50%, -50%) scale(${resumeScale})`,
                        }}
                    >
                        <ResumeComponent resumeInfo={dummy} />
                    </div>
                </div>

                {/* Mask layer */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300'></div>

                {/* Bottom operation */}
                <div className='absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'>
                    <div className='flex gap-2'>
                        <Button size='sm' variant='secondary' className='flex-1' onClick={() => alert('TODO')}>
                            Preview
                        </Button>
                        <Button size='sm' variant='default' className='flex-1' onClick={() => alert('TODO')}>
                            Use
                        </Button>
                    </div>
                </div>
            </div>

            {/* info */}
            <div className='mt-3 px-2 text-left'>
                <h3 className='text-sm font-semibold text-foreground line-clamp-1'>{name}</h3>
                <p className='text-xs text-muted-foreground line-clamp-2'>{thumbnailDesc}</p>
            </div>
        </div>
    )
}

export default ViewTemplateCard
