import hljs from 'highlight.js';
import type { CSSProperties } from 'react';

interface CodeBlockProps {
  language: string;
  children: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  customStyle?: CSSProperties;
}

export function CodeBlock({ language, children, showLineNumbers, wrapLongLines, customStyle }: CodeBlockProps) {
  const code = typeof children === 'string' ? children : String(children);
  const highlighted = language
    ? hljs.highlight(code, { language }).value
    : hljs.highlightAuto(code).value;

  return (
    <pre className="hljs" style={{ ...customStyle, overflow: 'auto', margin: 0, padding: '1rem', fontSize: '13px', lineHeight: '1.5', background: '#282c34', color: '#abb2bf', whiteSpace: wrapLongLines ? 'pre-wrap' : 'pre', wordBreak: wrapLongLines ? 'break-word' : 'normal' }}>
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}

export default CodeBlock;
