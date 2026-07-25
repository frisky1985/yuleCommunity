import{j as e,A as k,m}from"./framer-motion-JoH0GZ7Q.js";import{r as n}from"./react-vendor-xnT7OPjt.js";import{H as y}from"./index-YYlZjqKD.js";import{u as H}from"./index-BwPx4mqM.js";import{c as u}from"./utils-BVVaoC_K.js";import{aF as T,g as E,u as S,v as _}from"./ui-utils-CaBEDqaF.js";function A({text:s,successDuration:l=2e3,onCopy:d,size:r="sm",className:p}){const[h,c]=n.useState(!1),a=n.useRef(null),o=n.useCallback(async()=>{try{await navigator.clipboard.writeText(s),c(!0),d?.(),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>{c(!1)},l)}catch(j){console.error("Failed to copy:",j),g(s)}},[s,d,l]),g=j=>{const t=document.createElement("textarea");t.value=j,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{document.execCommand("copy"),c(!0),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>{c(!1)},l)}catch(x){console.error("Fallback copy failed:",x)}finally{document.body.removeChild(t)}},f={sm:"w-8 h-8",md:"w-10 h-10",lg:"w-12 h-12"},i={sm:"w-4 h-4",md:"w-5 h-5",lg:"w-6 h-6"};return e.jsxs(m.button,{type:"button",onClick:o,className:u("inline-flex items-center justify-center rounded-md transition-colors","hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",f[r],p),"aria-label":h?"代码已复制":"复制代码到剪贴板","aria-live":"polite","aria-atomic":"true",whileHover:{scale:1.05},whileTap:{scale:.95},"data-testid":"copy-button",children:[e.jsx(k,{mode:"wait",children:h?e.jsx(m.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",stiffness:500,damping:30},children:e.jsx(S,{className:u(i[r],"text-green-400"),"aria-hidden":"true"})},"check"):e.jsx(m.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",stiffness:500,damping:30},children:e.jsx(_,{className:u(i[r],"text-muted-foreground"),"aria-hidden":"true"})},"copy")}),e.jsx("span",{className:"sr-only",children:h?"复制成功":"复制代码"})]})}const G=`
  /* ---- light theme (GitHub) ---- */
  .hljs-light .hljs { color: #24292e; background: transparent; }
  .hljs-light .hljs-keyword,
  .hljs-light .hljs-literal,
  .hljs-light .hljs-symbol,
  .hljs-light .hljs-name { color: #d73a49; }
  .hljs-light .hljs-string,
  .hljs-light .hljs-title,
  .hljs-light .hljs-section,
  .hljs-light .hljs-attribute,
  .hljs-light .hljs-addition,
  .hljs-light .hljs-variable,
  .hljs-light .hljs-template-variable,
  .hljs-light .hljs-bullet { color: #032f62; }
  .hljs-light .hljs-comment,
  .hljs-light .hljs-quote,
  .hljs-light .hljs-deletion { color: #6a737d; }
  .hljs-light .hljs-number,
  .hljs-light .hljs-regexp { color: #005cc5; }
  .hljs-light .hljs-built_in,
  .hljs-light .hljs-type { color: #e36209; }
  .hljs-light .hljs-selector-class,
  .hljs-light .hljs-params { color: #6f42c1; }
  .hljs-light .hljs-meta,
  .hljs-light .hljs-meta-string { color: #032f62; }
  .hljs-light .hljs-doctag { color: #6a737d; }

  /* ---- dark theme (GitHub Dark) ---- */
  .hljs-dark .hljs { color: #c9d1d9; background: transparent; }
  .hljs-dark .hljs-keyword,
  .hljs-dark .hljs-literal,
  .hljs-dark .hljs-symbol,
  .hljs-dark .hljs-name { color: #ff7b72; }
  .hljs-dark .hljs-string,
  .hljs-dark .hljs-title,
  .hljs-dark .hljs-section,
  .hljs-dark .hljs-attribute,
  .hljs-dark .hljs-addition,
  .hljs-dark .hljs-variable,
  .hljs-dark .hljs-template-variable,
  .hljs-dark .hljs-bullet { color: #a5d6ff; }
  .hljs-dark .hljs-comment,
  .hljs-dark .hljs-quote,
  .hljs-dark .hljs-deletion { color: #8b949e; }
  .hljs-dark .hljs-number,
  .hljs-dark .hljs-regexp { color: #79c0ff; }
  .hljs-dark .hljs-built_in,
  .hljs-dark .hljs-type { color: #ffa657; }
  .hljs-dark .hljs-selector-class,
  .hljs-dark .hljs-params { color: #d2a8ff; }
  .hljs-dark .hljs-meta,
  .hljs-dark .hljs-meta-string { color: #a5d6ff; }
  .hljs-dark .hljs-doctag { color: #8b949e; }

  /* ---- line number styling ---- */
  .code-line { display: flex; }
  .line-number {
    min-width: 2.5em;
    padding-right: 1em;
    display: inline-block;
    font-size: 0.875em;
    user-select: none;
    text-align: right;
    margin-right: 1em;
    border-right: 1px solid rgba(128,128,128,0.2);
  }
`;function z({code:s,language:l="text",showLineNumbers:d=!0,collapsible:r=!1,defaultCollapsed:p=!1,filename:h,onCopy:c,className:a}){const[o,g]=n.useState(!p),{theme:f}=H(),i=f==="dark",j=n.useCallback(()=>{g(b=>!b)},[]),t=n.useMemo(()=>{try{return l&&l!=="text"&&y.getLanguage(l)?y.highlight(s,{language:l}).value:y.highlightAuto(s).value}catch{return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}},[s,l]),x=n.useMemo(()=>d?t.split(`
`).map((w,C)=>{const N=C+1;return`<span class="code-line"><span class="line-number" style="color:${i?"#6e7681":"#a0a0a0"}">${N}</span>${w||" "}</span>`}).join(`
`):t,[t,d,i]),v=l.charAt(0).toUpperCase()+l.slice(1);return e.jsxs("div",{className:u("my-4 rounded-lg overflow-hidden border border-border",a),"data-testid":"code-block",children:[e.jsx("style",{children:G}),e.jsxs("div",{className:"bg-muted-foreground/10 px-4 py-2 text-xs text-muted-foreground font-mono flex items-center justify-between border-b border-border/50",children:[e.jsx("div",{className:"flex items-center gap-2",children:h?e.jsx("span",{className:"font-medium",children:h}):e.jsx("span",{children:v})}),e.jsxs("div",{className:"flex items-center gap-1",children:[r&&e.jsx("button",{type:"button",onClick:j,className:"inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors","aria-label":o?"折叠代码块":"展开代码块","aria-expanded":o,children:o?e.jsx(T,{className:"w-4 h-4","aria-hidden":"true"}):e.jsx(E,{className:"w-4 h-4","aria-hidden":"true"})}),e.jsx(A,{text:s,onCopy:c,size:"sm"})]})]}),e.jsx(k,{initial:!1,children:(!r||o)&&e.jsx(m.div,{initial:r?{height:0,opacity:0}:!1,animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},children:e.jsx("div",{className:u("overflow-x-auto",i?"hljs-dark":"hljs-light"),children:e.jsx("pre",{className:"!m-0 !rounded-none !bg-transparent p-4 text-sm leading-relaxed",style:{background:i?"#0d1117":"#ffffff",color:i?"#c9d1d9":"#24292e"},children:e.jsx("code",{className:`language-${l}`,dangerouslySetInnerHTML:{__html:x}})})})})}),r&&!o&&e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},className:"px-4 py-3 text-sm text-muted-foreground text-center bg-muted/30",children:"代码已折叠，点击展开"})]})}export{z as C};
