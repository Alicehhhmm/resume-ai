import React from 'react'

function ResumeHeader({ name, title }) {
    return (
        <div className='py-10 px-8 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold tracking-widest mb-2 text-primary'>{name}</h1>
            <p className='uppercase text-sm tracking-[0.3em] text-muted-foreground'>{title}</p>
        </div>
    )
}

export default ResumeHeader
