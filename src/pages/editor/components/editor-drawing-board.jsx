import React from 'react'

import { useEditor } from '@/pages/editor/components'

function EditorDrawingBoard({ children }) {
    const {} = useEditor()

    return <main className='flex-1 overflow-auto p-6 bg-accent/60'>{children}</main>
}

export default EditorDrawingBoard
