const NotFound = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4'>
            <div className='flex flex-col items-center justify-center w-full max-w-lg lg:max-w-[50%] p-8 bg-white rounded-xl shadow gap-4'>
                <h1 className='text-[clamp(4rem,10vw,6rem)] font-extrabold text-transparent bg-clip-text bg-brand-gradient'>404</h1>
                <div className='text-center'>
                    <p className='text-lg font-semibold text-gray-800'>Page Not Found</p>
                    <p className='text-gray-600 mt-2'>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                </div>
                <a
                    href='/'
                    className='inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105'
                >
                    Go back to home
                </a>
            </div>
        </div>
    )
}

export default NotFound
