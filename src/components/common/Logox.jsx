'use client'

import React from 'react'

const Logox = () => {
    return (
        <div className='inline-block transform skew-x-[-12deg]'>
            <div className='flex items-center gap-1 text-xl sm:text-2xl font-extrabold tracking-tight font-sans leading-none'>
                <span className='transform  bg-gradient-to-r bg-clip-text bg-brand-gradient text-transparent not-italic'>
                    <em>R</em>esume
                </span>
                <span className='transform  bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent font-semibold'>
                    AI
                </span>
                <span className='transform  text-emerald-400 motion-safe:animate-pulse font-bold'>+</span>
            </div>
        </div>
    )
}

Logox.displayName = 'Logox'

export default Logox
