'use client';

import { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Heading2, 
  Quote,
  Link2,
  Image as ImageIcon,
  List,
  Undo2
} from 'lucide-react';

export default function RichTextEditor({ value, onChange, onImageInsert }) {
  const textareaRef = useRef(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleTextAreaChange = (e) => {
    onChange(e.target.value);
  };

  const handleTextAreaSelect = (e) => {
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
  };

  const insertMarkdown = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = value;
    const selectedText = text.substring(start, end) || 'text';

    const newText = 
      text.substring(0, start) + 
      before + 
      selectedText + 
      after + 
      text.substring(end);

    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selectedText.length;
    }, 0);
  };

  const insertHeading = () => {
    insertMarkdown('## ', '\n');
  };

  const insertBold = () => {
    insertMarkdown('**', '**');
  };

  const insertItalic = () => {
    insertMarkdown('*', '*');
  };

  const insertQuote = () => {
    insertMarkdown('> ', '\n');
  };

  const insertLink = () => {
    insertMarkdown('[link text](', ')');
  };

  const insertImage = () => {
    insertMarkdown('![alt text](', ')');
  };

  const insertList = () => {
    insertMarkdown('- ', '\n');
  };

  const insertCode = () => {
    insertMarkdown('```\n', '\n```');
  };

  const clearFormat = () => {
    onChange('');
  };

  return (
    <div className="border-2 border-black text-black">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b-2 border-black p-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={insertHeading}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Heading (## )"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Heading2 size={16} />
          <span className="text-xs font-bold">H2</span>
        </button>

        <button
          type="button"
          onClick={insertBold}
          className="flex items-center gap-1 px-3 py-2 bg-white  border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Bold (**text**)"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Bold size={16} />
          <span className="text-xs font-bold">B</span>
        </button>

        <button
          type="button"
          onClick={insertItalic}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Italic (*text*)"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Italic size={16} />
          <span className="text-xs font-bold">I</span>
        </button>

        <div className="border-l-2 border-black"></div>

        <button
          type="button"
          onClick={insertQuote}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Quote (> )"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Quote size={16} />
          <span className="text-xs font-bold">Q</span>
        </button>

        <button
          type="button"
          onClick={insertList}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="List (- )"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <List size={16} />
          <span className="text-xs font-bold">L</span>
        </button>

        <div className="border-l-2 border-black"></div>

        <button
          type="button"
          onClick={insertLink}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Link ([text](url))"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Link2 size={16} />
          <span className="text-xs font-bold">Link</span>
        </button>

        <button
          type="button"
          onClick={insertImage}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Image (![alt](url))"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <ImageIcon size={16} />
          <span className="text-xs font-bold">IMG</span>
        </button>

        <button
          type="button"
          onClick={insertCode}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Code Block"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <span className="text-xs font-bold">&lt;/&gt;</span>
        </button>

        <div className="border-l-2 border-black"></div>

        <button
          type="button"
          onClick={clearFormat}
          className="flex items-center gap-1 px-3 py-2 bg-white border-2 border-black hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,0.1)] transition-all"
          title="Clear All"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Undo2 size={16} />
          <span className="text-xs font-bold">Clear</span>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextAreaChange}
        onSelect={handleTextAreaSelect}
        placeholder="Enter your blog content here... Use markdown formatting:
• **bold text**
• *italic text*
• ## Heading
• > Quote
• - List items
• [Link text](url)
• ![Image alt](image-url)"
        className="w-full h-[400px] p-4 font-mono text-sm resize-none focus:outline-none"
        style={{ fontFamily: 'var(--font-poppins)' }}
      />

      {/* Help Text */}
      <div className="bg-gray-50 border-t-2 border-black p-3">
        <p 
          className="text-xs text-gray-600 mb-2 font-bold"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          📝 Markdown Syntax Guide:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>
          <div><span className="font-bold">**bold**</span> → bold text</div>
          <div><span className="italic">*italic*</span> → italic text</div>
          <div><span className="font-bold">## Head</span> → heading</div>
          <div><span className="border-l-4 border-gray-400 pl-1">&gt; Quote</span></div>
          <div><span className="font-bold">- item</span> → list</div>
          <div><span className="text-blue-600 underline">[text](url)</span> → link</div>
          <div><span>![alt](url)</span> → image</div>
          <div><span className="font-mono bg-gray-200 px-1">\`code\`</span> → code</div>
        </div>
      </div>
    </div>
  );
}
