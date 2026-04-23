import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'c' }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden my-4 border border-border">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <span className="text-xs font-medium text-muted-foreground uppercase">{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          background: 'hsl(var(--card))',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
