import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

const TipTapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Start writing your note...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border border-[#4b4b4b] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-[#2b2b2b] p-2 border-b border-[#4b4b4b] flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold')
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 00-4 4v4a4 4 0 008 0V8a4 4 0 00-4-4zm-2 8a2 2 0 114 0v4a2 2 0 11-4 0v-4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic')
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011-1h4a1 1 0 110 2h-2.5l-2 10h2.5a1 1 0 110 2h-4a1 1 0 110-2h2.5l2-10H11a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            editor.isActive('strike')
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="w-px h-6 bg-[#4b4b4b] mx-2"></div>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList')
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive('orderedList')
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="w-px h-6 bg-[#4b4b4b] mx-2"></div>
        <button
          onClick={() => {
            const url = window.prompt('Enter the URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={`p-2 rounded ${
            editor.isActive('link')
              ? 'bg-pink-200 text-[#1e1e1e]'
              : 'bg-[#3b3b3b] text-white hover:bg-pink-200 hover:text-[#1e1e1e]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-[#2b2b2b] p-4 min-h-[300px]">
        <EditorContent editor={editor} className="prose prose-invert max-w-none" />
      </div>
    </div>
  )
}

export default TipTapEditor 