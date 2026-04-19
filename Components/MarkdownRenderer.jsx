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
      '<pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4 border-2 border-black"><code>$1</code></pre>'
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-2 py-1 rounded font-mono text-sm">$1</code>');

    // Headers (h2, h3, etc)
    html = html.replace(
      /^### (.*?)$/gm,
      '<h3 class="text-3xl font-bold my-4 text-black border-b-2 border-black pb-3" style="font-family: var(--font-playfair)">$1</h3>'
    );
    html = html.replace(
      /^## (.*?)$/gm,
      '<h2 class="text-4xl font-bold my-6 text-black border-b-2 border-black pb-3" style="font-family: var(--font-playfair)">$1</h2>'
    );
    html = html.replace(
      /^# (.*?)$/gm,
      '<h1 class="text-5xl font-bold my-6 text-black border-b-2 border-black pb-3" style="font-family: var(--font-playfair)">$1</h1>'
    );

    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-black">$1</strong>');

    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800" style="font-family: var(--font-merriweather)">$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800 font-bold" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="w-full h-auto my-4 border-2 border-black shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.1)]" />'
    );

    // Blockquotes
    html = html.replace(
      /^&gt; (.*?)$/gm,
      '<blockquote class="border-l-4 border-black bg-gray-50 p-4 my-4 italic text-gray-700" style="font-family: var(--font-merriweather)">$1</blockquote>'
    );

    // Unordered lists
    html = html.replace(/^\- (.*?)$/gm, '<li class="list-disc list-inside ml-4 my-1">$1</li>');
    html = html.replace(/(<li class="list-disc list-inside ml-4 my-1">.*?<\/li>)/gs, '<ul class="my-4">$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.*?)$/gm, '<li class="list-decimal list-inside ml-4 my-1">$1</li>');
    html = html.replace(/(<li class="list-decimal list-inside ml-4 my-1">.*?<\/li>)/gs, '<ol class="my-4">$1</ol>');

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
      return `<p class="my-4 leading-7 text-gray-800" style="font-family: var(--font-merriweather)">${para}</p>`;
    });

    return html.join('');
  };

  return (
    <div
      className="prose prose-lg max-w-none markdown-content"
      dangerouslySetInnerHTML={{
        __html: parseMarkdown(content),
      }}
    />
  );
}
