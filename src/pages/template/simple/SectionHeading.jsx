const SectionHeading = ({ children }) => {
    return (
        <div className='mb-4 pb-1 relative'>
            <h2 className='text-sm font-bold tracking-[0.2em] uppercase text-primary'>{children}</h2>
            <div className='absolute bottom-0 left-0 w-16 h-[1px] bg-primary'></div>
        </div>
    )
}

export default SectionHeading
