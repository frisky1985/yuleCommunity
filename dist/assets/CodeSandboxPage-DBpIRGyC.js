import{j as e,m as o}from"./framer-motion-Cgu_4qP_.js";import{H as L}from"./index-6OWQ0Sjn.js";import{r as l}from"./react-vendor-p_TFSz_F.js";import{F as M}from"./index-CpVD7KzJ.js";import{aJ as A,y as R,z as O,a9 as W,ag as I,x as b,C as B,af as P,u as U,n as z,I as D,N as F,ah as H,a0 as Y}from"./ui-utils-DrU6ETrV.js";import"./syntax-highlight-CIV2LYFs.js";const c=`// YuleTech C Code Sandbox
// 这是一个简单的 C 语言示例
// 点击"运行"按钮查看输出

#include <stdio.h>

int main() {
    printf("Hello, YuleTech!\\n");
    printf("欢迎使用在线代码沙盒\\n");
    
    // 计算 1+2+...+10
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("1+2+...+10 = %d\\n", sum);
    
    return 0;
}`,_=[{name:"Hello World",code:c},{name:"数组操作",code:`#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("数组元素: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    // 计算和
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    printf("和: %d\\n", sum);
    
    return 0;
}`},{name:"指针示例",code:`#include <stdio.h>

int main() {
    int value = 42;
    int *ptr = &value;
    
    printf("变量值: %d\\n", value);
    printf("变量地址: %p\\n", (void*)&value);
    printf("指针值: %p\\n", (void*)ptr);
    printf("指针所指值: %d\\n", *ptr);
    
    // 修改指针所指的值
    *ptr = 100;
    printf("修改后的值: %d\\n", value);
    
    return 0;
}`},{name:"结构体示例",code:`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[20];
    int age;
    float score;
} Student;

int main() {
    Student s1;
    strcpy(s1.name, "张三");
    s1.age = 20;
    s1.score = 85.5;
    
    printf("学生信息:\\n");
    printf("姓名: %s\\n", s1.name);
    printf("年龄: %d\\n", s1.age);
    printf("成绩: %.1f\\n", s1.score);
    
    return 0;
}`}];function X(){const[t,i]=l.useState(c),[r,d]=l.useState(null),[m,u]=l.useState(!1),[h,f]=l.useState(!1),[j,N]=l.useState(!0),v=l.useRef(null),y=l.useCallback(s=>{v.current=s},[]),w=async()=>{u(!0),d(null);const s=performance.now();try{await new Promise(x=>setTimeout(x,800));const a=C(t),n=performance.now()-s;d({stdout:a,stderr:"",exitCode:0,executionTime:n})}catch(a){d({stdout:"",stderr:String(a),exitCode:1,executionTime:performance.now()-s})}finally{u(!1)}},C=s=>{const a=s.match(/printf\s*\(\s*"([^"]*)"[^)]*\)/g);if(!a)return"// 没有输出";let n="";return a.forEach(x=>{const g=x.match(/"((?:[^"\\]|\\.)*)"/);if(g){let p=g[1];p=p.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\\\/g,"\\"),n+=p}}),n||"// 请确保使用 printf 输出内容"},k=()=>{confirm("确定要重置代码吗？")&&(i(c),d(null))},S=async()=>{try{await navigator.clipboard.writeText(t),f(!0),setTimeout(()=>f(!1),2e3)}catch{}},T=s=>{t!==c&&!confirm("当前代码将被替换，是否继续？")||(i(s),d(null))},E=()=>{const s=new Blob([t],{type:"text/plain"}),a=URL.createObjectURL(s),n=document.createElement("a");n.href=a,n.download="sandbox.c",n.click(),URL.revokeObjectURL(a)};return e.jsxs("div",{className:"bg-card border border-border rounded-xl overflow-hidden",children:[j&&e.jsx(o.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"bg-amber-500/10 border-b border-amber-500/20 p-3",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(A,{className:"w-5 h-5 text-amber-500 shrink-0"}),e.jsx("p",{className:"text-sm text-amber-700 dark:text-amber-400 flex-1",children:"此代码沙盒仅支持基础 C 语法高亮和简单代码模拟。实际编译执行功能需要后端支持。"}),e.jsx("button",{onClick:()=>N(!1),className:"text-amber-500 hover:text-amber-600 text-sm",children:"关闭"})]})}),e.jsxs("div",{className:"flex items-center justify-between p-3 border-b border-border bg-muted/30",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-muted-foreground",children:"模板:"}),e.jsx("div",{className:"flex items-center gap-1",children:_.map(s=>e.jsx("button",{onClick:()=>T(s.code),className:"px-3 py-1 text-xs rounded-md bg-muted hover:bg-muted/80 transition-colors",children:s.name},s.name))})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:S,className:"flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md hover:bg-muted transition-colors",title:"复制代码",children:[h?e.jsx(R,{className:"w-4 h-4 text-green-500"}):e.jsx(O,{className:"w-4 h-4"}),h?"已复制":"复制"]}),e.jsxs("button",{onClick:E,className:"flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md hover:bg-muted transition-colors",title:"下载代码",children:[e.jsx(W,{className:"w-4 h-4"}),"下载"]}),e.jsxs("button",{onClick:k,className:"flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md hover:bg-muted transition-colors",title:"重置",children:[e.jsx(I,{className:"w-4 h-4"}),"重置"]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border",children:[e.jsx("div",{className:"h-[400px] lg:h-[500px]",children:e.jsx(M,{height:"100%",defaultLanguage:"c",value:t,onChange:s=>i(s||""),onMount:y,options:{minimap:{enabled:!1},fontSize:14,lineNumbers:"on",roundedSelection:!1,scrollBeyondLastLine:!1,readOnly:!1,automaticLayout:!0,tabSize:4,insertSpaces:!0,wordWrap:"on",folding:!0,renderWhitespace:"selection"},theme:"vs-dark"})}),e.jsxs("div",{className:"flex flex-col h-[300px] lg:h-[500px] bg-[#1e1e1e]",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 border-b border-border/20",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{className:"w-4 h-4 text-muted-foreground"}),e.jsx("span",{className:"text-sm font-medium text-muted-foreground",children:"输出"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[r&&e.jsxs("span",{className:"text-xs text-muted-foreground flex items-center gap-1",children:[e.jsx(B,{className:"w-3 h-3"}),r.executionTime.toFixed(0),"ms"]}),e.jsxs("button",{onClick:w,disabled:m,className:"flex items-center gap-1.5 px-4 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:[e.jsx(P,{className:"w-4 h-4"}),m?"运行中...":"运行"]})]})]}),e.jsx("div",{className:"flex-1 p-4 font-mono text-sm overflow-auto",children:m?e.jsxs("div",{className:"flex items-center gap-2 text-muted-foreground",children:[e.jsx("div",{className:"w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"}),"正在编译执行..."]}):r?e.jsxs("div",{className:"space-y-2",children:[r.exitCode===0?e.jsxs("div",{className:"text-green-500 text-xs",children:["✓ 执行成功 (exit code: ",r.exitCode,")"]}):e.jsxs("div",{className:"text-red-500 text-xs",children:["✗ 执行失败 (exit code: ",r.exitCode,")"]}),r.stdout&&e.jsx("pre",{className:"text-foreground whitespace-pre-wrap",children:r.stdout}),r.stderr&&e.jsx("pre",{className:"text-red-400 whitespace-pre-wrap",children:r.stderr})]}):e.jsxs("div",{className:"text-muted-foreground text-sm",children:[e.jsx("p",{children:'点击"运行"按钮执行代码'}),e.jsx("p",{className:"text-xs mt-2 text-muted-foreground/60",children:"提示: 使用 printf() 输出内容到控制台"})]})})]})]}),e.jsxs("div",{className:"p-3 border-t border-border bg-muted/30 text-xs text-muted-foreground flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{children:["Ln ",t.split(`
`).length,", Col ",t.split(`
`).pop()?.length||0]}),e.jsx("span",{children:"UTF-8"}),e.jsx("span",{children:"C"})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(U,{className:"w-3 h-3"}),e.jsx("span",{children:"Monaco Editor"})]})]})]})}const J=[{icon:b,title:"支持标准 C 语法",desc:"高亮显示、自动补全、语法检查"},{icon:D,title:"内置示例模板",desc:"Hello World、数组、指针、结构体等经典示例"},{icon:F,title:"实时运行",desc:"编译并查看输出结果"}],V=["不支持外部头文件引用（除标准库函数）","不支持文件 I/O 操作","代码执行时间限制在 5 秒以内","内存使用限制在 128MB 以内"];function ee(){return e.jsxs("div",{className:"min-h-screen pt-16",children:[e.jsxs(L,{children:[e.jsx("title",{children:"在线代码沙盒 - YuleTech | C 语言在线编程"}),e.jsx("meta",{name:"description",content:"在线 C 语言代码沙盒，支持语法高亮、代码编译、实时运行，带有丰富的示例模板和学习资源。"})]}),e.jsx("section",{className:"relative py-16 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"text-center",children:[e.jsxs(o.span,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6",children:[e.jsx(z,{className:"w-4 h-4"}),"在线编程"]}),e.jsxs(o.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},className:"text-4xl sm:text-5xl font-bold tracking-tight mb-6",children:["C 语言代码沙盒",e.jsx("span",{className:"text-gradient-accent",children:" 在线编译运行"})]}),e.jsx(o.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},className:"text-lg text-muted-foreground max-w-3xl mx-auto",children:"基于 Monaco Editor 的在线 C 语言编程环境，支持语法高亮、自动补全、实时编译。 内置丰富的代码模板，帮助你快速上手 AutoSAR BSW 开发。"})]})})}),e.jsx("section",{className:"py-8",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsx(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:e.jsx(X,{})})})}),e.jsx("section",{className:"py-16 border-t border-border",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:J.map((t,i)=>e.jsxs(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:i*.1},className:"text-center",children:[e.jsx("div",{className:"w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center",children:e.jsx(t.icon,{className:"w-6 h-6 text-primary"})}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:t.title}),e.jsx("p",{className:"text-muted-foreground text-sm",children:t.desc})]},t.title))})})}),e.jsx("section",{className:"py-16 bg-muted/30 border-t border-border",children:e.jsx("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-card border border-border rounded-xl p-6",children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0",children:e.jsx(H,{className:"w-5 h-5 text-amber-500"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"使用限制与声明"}),e.jsx("ul",{className:"space-y-2 text-sm text-muted-foreground",children:V.map((t,i)=>e.jsxs("li",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-muted-foreground"}),t]},i))}),e.jsxs("div",{className:"mt-4 pt-4 border-t border-border text-sm text-muted-foreground",children:[e.jsx("p",{className:"mb-2",children:"当前版本为演示版本，使用 Monaco Editor 进行代码编辑，代码执行为模拟环境。 如需完整的在线编译执行功能，建议搭建后端服务使用 WebAssembly 或 Docker 容器技术。"}),e.jsxs("a",{href:"https://github.com/microsoft/monaco-editor",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-primary hover:underline",children:["了解 Monaco Editor",e.jsx(Y,{className:"w-3 h-3"})]})]})]})]})})})}),e.jsx("section",{className:"py-16",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-center mb-10",children:"相关学习资源"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[{title:"C 语言基础教程",desc:"从入门到精通",link:"/learning/c-basics"},{title:"AutoSAR 规范解读",desc:"BSW 开发指南",link:"/docs/autosar"},{title:"MCAL 驱动开发",desc:"微控制器驱动层",link:"/opensource"},{title:"实战项目",desc:"堆校与调试",link:"/learning/projects"}].map(t=>e.jsxs("a",{href:t.link,className:"group p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-elegant transition-all",children:[e.jsx("h4",{className:"font-semibold mb-1 group-hover:text-primary transition-colors",children:t.title}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t.desc})]},t.title))})]})})]})}export{ee as CodeSandboxPage};
