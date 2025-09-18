import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import { AspectRatio } from '@/components/ui/aspect-ratio'

const fmtDate = d => {
    const t = new Date(d)
    const Y = t.getFullYear()
    const M = String(t.getMonth() + 1).padStart(2, '0')
    const D = String(t.getDate()).padStart(2, '0')
    const h = String(t.getHours()).padStart(2, '0')
    const m = String(t.getMinutes()).padStart(2, '0')
    return `${Y}.${M}.${D} ${h}:${m}`
}

function ResumeCardItem({ path, resume, onHandle, actions }) {
    return (
        <div className='relative group size-full'>
            <div
                className={`
                    size-full flex flex-col gap-2 border rounded-md bg-secondary
                    transition-all duration-300 ease-out
                    group-hove:bg-secondary/80 
                    group-hover:shadow-lg group-hover:-translate-y-1 group-hover:-translate-x-1
                    group-hover:border-r-3 group-hover:border-b-3 group-hover:border-primary/40
                `}
            >
                <Link to={path} onClick={() => onHandle({ documentId: resume.documentId, path })}>
                    <AspectRatio ratio={1 / 1.4142} className='size-full flex justify-center items-center'>
                        <img
                            src={resume?.templateThumbnailUrl || '/placeholder.svg'}
                            alt='thumbnail'
                            className='size-full object-cover rounded-md dark:brightness-[0.6] dark:grayscale'
                        />
                    </AspectRatio>

                    <div
                        className={`
                            absolute inset-x-0 bottom-0 p-4
                            rounded-b-md bg-background/80 backdrop-blur-sm
                            text-sm text-muted-foreground
                            opacity-60 group-hover:opacity-100
                            pointer-events-none transition-opacity duration-200
                        `}
                    >
                        <span className='text-md text-muted-foreground font-medium truncate line-clamp-1'>
                            {resume.title || 'Untitled'}
                        </span>
                        <span className='text-xs opacity-80'>{fmtDate(resume.updatedAt)}</span>
                    </div>
                </Link>
                <div className='absolute top-2 right-2 flex gap-2 pointer-events-auto'>{actions}</div>
            </div>
        </div>
    )
}

export default memo(ResumeCardItem)
