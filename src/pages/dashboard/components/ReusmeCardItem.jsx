import { Notebook } from 'lucide-react'
import { Link } from 'react-router-dom'

function ResumeCardItem({ path, resume }) {
    return (
        <Link to={path} className='relative group'>
            <div
                className='h-[var(--r-card-height)] p-10 border rounded-md bg-secondary flex flex-col items-center justify-center gap-2 
                hover:bg-secondary/80 hover:shadow-md hover:border-2 hover:border-dashed transition-all'
            >
                <h3 className='text-md text-muted-foreground font-medium truncate text-center line-clamp-1'>
                    {resume.title || 'Untitled'}
                </h3>
                <Notebook className='opacity-60' />
            </div>

            <div
                className='absolute inset-x-0 bottom-0 px-6 py-4 bg-background/80 backdrop-blur-sm
                text-sm text-muted-foreground opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200'
            >
                <p className='truncate'>{resume.userName || 'No name'}</p>
                <p className='text-xs opacity-80'>{new Date(resume.updatedAt).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}

export default ResumeCardItem
