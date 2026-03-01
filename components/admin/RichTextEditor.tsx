"use client";

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo, useRef, forwardRef } from 'react';

// Use a wrapper to forward the ref correctly
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new');
        return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false }
);

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: EditorProps) {
    const quillRef = useRef<any>(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const quill = quillRef.current;
            // The ref is now the actual component, but novel/quill access might vary.
            // With react-quill, we usually get the editor via ref.current.getEditor()
            const editor = quill?.getEditor?.() || quill?.editor;
            const range = editor?.getSelection();

            if (!editor) return;

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", "blog/inner");
                const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                if (!res.ok) {
                    const { error } = await res.json();
                    throw new Error(error || "Upload failed");
                }
                const { publicUrl } = await res.json();
                editor.insertEmbed(range.index, 'image', publicUrl);
                editor.setSelection(range.index + 1);
            } catch (err) {
                console.error("Inner image upload error:", err);
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden quill-editor-wrapper">
            <ReactQuill
                forwardedRef={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="text-text-primary"
            />
            <style jsx global>{`
                .quill-editor-wrapper .ql-toolbar {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1) !important;
                }
                .quill-editor-wrapper .ql-container {
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    min-height: 400px;
                    font-size: 1.1rem;
                    color: white;
                }
                .quill-editor-wrapper .ql-editor {
                    min-height: 400px;
                }
                .quill-editor-wrapper .ql-editor.ql-blank::before {
                    color: rgba(255, 255, 255, 0.3) !important;
                    font-style: normal;
                }
                .quill-editor-wrapper .ql-stroke {
                    stroke: #fff !important;
                }
                .quill-editor-wrapper .ql-fill {
                    fill: #fff !important;
                }
                .quill-editor-wrapper .ql-picker {
                    color: #fff !important;
                }
                .quill-editor-wrapper .ql-picker-options {
                    background: #1a1a1a !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                }
            `}</style>
        </div>
    );
}
