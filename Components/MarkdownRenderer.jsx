'use client';

export default function MarkdownRenderer({ content }) {
  // Parse markdown and render as HTML
  const parseMarkdown = (text) => {
    if (!text) return '';

    let html = text;

    // Escape HTML special characters first
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks (must be before inline code)
    html = html.replace(
      /```\n([\s\S]*?)\n```/g,
      '<pre class="bg-bg-secondary text-text-primary p-6 rounded-sm overflow-x-auto my-8 border border-border-light font-mono text-sm leading-relaxed"><code>$1</code></pre>'
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-bg-secondary px-1.5 py-0.5 rounded font-mono text-sm text-brand">$1</code>');

    // Headers (h2, h3, etc)
    html = html.replace(
      /^### (.*?)$/gm,
      '<h3 class="text-2xl font-bold mt-12 mb-4 text-text-primary font-serif">$1</h3>'
    );
    html = html.replace(
      /^## (.*?)$/gm,
      '<h2 class="text-3xl font-bold mt-16 mb-4 text-text-primary font-serif">$1</h2>'
    );
    html = html.replace(
      /^# (.*?)$/gm,
      '<h1 class="text-4xl font-bold mt-20 mb-6 text-text-primary font-serif">$1</h1>'
    );

    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-text-primary">$1</strong>');

    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-text-secondary">$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand underline hover:text-brand-dark transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="w-full h-auto my-12" />'
    );

    // Blockquotes
    html = html.replace(
      /^&gt; (.*?)$/gm,
      '<blockquote class="border-l-[3px] border-text-primary pl-6 my-10 italic text-2xl text-text-secondary font-serif leading-relaxed">$1</blockquote>'
    );

    // Unordered lists
    html = html.replace(/^\- (.*?)$/gm, '<li class="list-disc ml-6 my-3 pr-2 text-text-primary">$1</li>');
    html = html.replace(/(<li class="list-disc ml-6 my-3 pr-2 text-text-primary">.*?<\/li>)/gs, '<ul class="my-6">$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.*?)$/gm, '<li class="list-decimal ml-6 my-3 pr-2 text-text-primary">$1</li>');
    html = html.replace(/(<li class="list-decimal ml-6 my-3 pr-2 text-text-primary">.*?<\/li>)/gs, '<ol class="my-6">$1</ol>');

    // Paragraphs
    html = html.split('\n\n').map((para) => {
      // Skip if it's already an HTML element
      if (
        para.startsWith('<') ||
        para.startsWith('&lt;') ||
        para.trim() === ''
      ) {
        return para;
      }
      return `<p class="mb-6 leading-relaxed text-text-primary font-sans text-[20px]">${para}</p>`;
    });

    return html.join('');
  };

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{
        __html: parseMarkdown(content),
      }}
    />
  );
}
