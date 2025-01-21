'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import EditorExtensions from '@/app/workspace/_components/Editor_Extensions';
import { useEffect, useState } from 'react';

function TextEditor() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Ensure this runs only on the client
        setIsClient(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start taking notes here...',
            }),
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5 bg-gray-50 dark:bg-gray-900 text-black dark:text-white',
            },
        },
        // Explicitly prevent immediate rendering during SSR
        injectCSS: false,
        immediatelyRender: false,
    });

    if (!isClient) return null; // Prevent rendering on the server

    if (!editor) return <div>Loading editor...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <EditorExtensions editor={editor} />
            <div className="border border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default TextEditor;
