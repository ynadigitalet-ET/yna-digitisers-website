"use client";

import { useRef, useEffect } from "react";
import { Bold, Italic, List, Link as LinkIcon, Heading2 } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML || "");
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex gap-1 border-b border-border bg-border/30 p-2">
        <button type="button" onClick={() => exec("bold")} className="rounded p-1.5 hover:bg-border" title="Bold">
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("italic")} className="rounded p-1.5 hover:bg-border" title="Italic">
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("formatBlock", "h2")} className="rounded p-1.5 hover:bg-border" title="Heading">
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className="rounded p-1.5 hover:bg-border" title="List">
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) exec("createLink", url);
          }}
          className="rounded p-1.5 hover:bg-border"
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-4 text-sm focus:outline-none prose-content"
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
}
