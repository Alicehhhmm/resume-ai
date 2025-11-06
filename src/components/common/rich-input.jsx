import { useCallback } from 'react'
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    ListIcon,
    ListOrderedIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    AlignJustifyIcon,
    TextQuoteIcon,
    LinkIcon,
    UndoIcon,
    RedoIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    PilcrowIcon,
} from 'lucide-react'

// --- Tiptap Core Extensions ---
import { useEditor, EditorContent } from '@tiptap/react'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { TextAlign } from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'

// --- Shadcn UI ---
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToolButton as ToolbarButton } from '@/components/common'

import { useTransformLang } from '@/hooks/client'
import '@/styles/tiptap.scss'

function ToolbarDivider() {
    return <div className='my-auto h-5 w-px bg-border' />
}

function RichToolbar({ editor }) {
    if (!editor) return null

    const { t } = useTransformLang()

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) return

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    return (
        <div className='flex flex-wrap items-center gap-0.5 p-1 border-b rounded-t bg-muted/10 dark:bg-accent'>
            {/* Text Formatting */}
            <ToolbarButton tooltip={t('Bold')} onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
                <BoldIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('Italic')}
                pressed={editor.isActive('italic')}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <ItalicIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('Underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive('underline')}
            >
                <UnderlineIcon className='size-3.5' />
            </ToolbarButton>

            {/* Headings */}
            <ToolbarButton
                tooltip={t('Paragraph')}
                onClick={() => editor.chain().focus().setParagraph().run()}
                onPressedChange={() => editor.chain().focus().setParagraph().run()}
                active={editor.isActive('paragraph')}
            >
                <PilcrowIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('Heading1')}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('heading', { level: 1 })}
            >
                <Heading1Icon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('Heading2')}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
            >
                <Heading2Icon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('Heading3')}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor.isActive('heading', { level: 3 })}
            >
                <Heading3Icon className='size-3.5' />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarButton
                tooltip={t('BulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
            >
                <ListIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('NumberedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
            >
                <ListOrderedIcon className='size-3.5' />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Alignment */}
            <ToolbarButton
                tooltip={t('AlignLeft')}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                active={editor.isActive({ textAlign: 'left' })}
            >
                <AlignLeftIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('AlignCenter')}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                active={editor.isActive({ textAlign: 'center' })}
            >
                <AlignCenterIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('AlignRight')}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                active={editor.isActive({ textAlign: 'right' })}
            >
                <AlignRightIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton
                tooltip={t('AlignJustify')}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                active={editor.isActive({ textAlign: 'justify' })}
            >
                <AlignJustifyIcon className='size-3.5' />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Blocks */}
            <ToolbarButton
                tooltip={t('Blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive('blockquote')}
            >
                <TextQuoteIcon className='size-3.5' />
            </ToolbarButton>

            <ToolbarButton tooltip={t('Hyperlink')} onClick={setLink} active={editor.isActive('link')}>
                <LinkIcon className='size-3.5' />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Undo/Redo */}
            <ToolbarButton tooltip={t('Undo')} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <UndoIcon className='size-3.5' />
            </ToolbarButton>
            <ToolbarButton tooltip={t('Redo')} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                <RedoIcon className='size-3.5' />
            </ToolbarButton>
        </div>
    )
}

function RichFooterBar({ children, className, ...props }) {
    return (
        <div
            className={cn(
                'max-h-[52px] flex flex-row gap-1 items-center justify-center rounded-b border-t px-3 py-2 bg-muted/10 dark:bg-muted/50',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function RichInput({ onChange, content = '', footerbar, className = '', editorClassName = '', ...props }) {
    const editor = useEditor({
        extensions: [
            TextStyleKit,
            StarterKit,
            Underline,
            Highlight,
            LinkExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: cn('prose prose-sm prose-zinc max-h-[260px] max-w-none focus:outline-none', editorClassName),
            },
        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML())
            }
        },
    })

    return (
        <div className='flex flex-col rounded border w-full bg-background'>
            <RichToolbar editor={editor} />
            <ScrollArea orientation='vertical' className='bg-input/30'>
                <EditorContent
                    editor={editor}
                    className={cn(
                        'grid min-h-[260px] w-full text-sm placeholder:opacity-80',
                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    {...props}
                />
            </ScrollArea>
            {footerbar && footerbar(editor)}
        </div>
    )
}

export default RichInput

export { RichInput as RichTextInput, RichToolbar, RichFooterBar }
