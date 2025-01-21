"use client"
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Sparkles
} from "lucide-react";
import {useAction} from "convex/react";
import {useParams} from "next/navigation";
import {api} from "@/convex/_generated/api";
import { toast } from "react-toastify";

function EditorExtensions({ editor }) {

    const {fileId} = useParams()
    console.log("fileId", fileId)

    const searchAI= useAction(api.myAction.search)

    const onAIClick=async ()=> {
        try {
            console.log("AI Clicked");

            const selectedText = editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                " "
            );

            if (!selectedText.trim()) {
                toast.warn("Please select some text before using AI search.");
                return;
            }

            const AIResponse = await searchAI({
                query: selectedText,
                fileId: fileId,
            });

            if (AIResponse && AIResponse.result) {
                console.log("AI Response:", AIResponse.result);
                toast.success("AI Response: " + AIResponse.result);
            } else {
                console.warn("AI returned an invalid response:", AIResponse);
                toast.error("AI could not process the request. Please try again.");
            }
        } catch (error) {
            console.error("Error while calling AI:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    }


    if (!editor) {
        console.warn("Editor instance is not initialized.");
        return null;
    }

    return (
        <div className="editor-extensions">
            <div className="control-group">
                <div className="button-group">
                    {/* Bold */}
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'active' : ''}
                    >
                        <Bold size={18} />
                    </button>

                    {/* Italic */}
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'active' : ''}
                    >
                        <Italic size={18} />
                    </button>

                    {/* Underline */}
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'text-blue-500' : ''}
                    >
                        <Underline size={18} />
                    </button>

                    {/* Strike-through */}
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'active' : ''}
                    >
                        <Strikethrough size={18} />
                    </button>

                    {/* Heading 1 */}
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
                    >
                        <Heading1 size={18} />
                    </button>

                    {/* Heading 2 */}
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
                    >
                        <Heading2 size={18} />
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}>
                        <Heading3 size={18} />
                    </button>
                    <button onClick={onAIClick} className='hover:text-blue-500'>
                        <Sparkles />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditorExtensions;