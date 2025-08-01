'use client'

const EditorMainContent = ({ children }) => {
    return (
        <div data-slot='editor_main_content_wrapper' className='flex-1 h-screen flex flex-col bg-background'>
            <div className='flex-1 flex overflow-hidden'>{children}</div>
        </div>
    )
}

export default EditorMainContent
