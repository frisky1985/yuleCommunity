interface GitHubAuthDialogProps {
  userCode: string;
  verificationUri: string;
  onClose: () => void;
}

export function GitHubAuthDialog({ userCode, verificationUri, onClose }: GitHubAuthDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>

        <h2 className="text-lg font-bold mb-1">使用 GitHub 登录</h2>
        <p className="text-sm text-muted-foreground mb-4">
          在 GitHub 上输入以下代码完成授权
        </p>

        {/* 用户代码 */}
        <div className="bg-muted rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">设备激活码</p>
          <p className="text-3xl font-mono font-bold tracking-widest select-all">
            {userCode}
          </p>
        </div>

        {/* 验证地址 QR */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white p-2 rounded-lg">
            <div className="w-32 h-32 flex items-center justify-center text-sm text-muted-foreground">
              {verificationUri}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          访问 <span className="font-mono text-foreground">{verificationUri}</span> 并输入代码 <span className="font-mono font-bold">{userCode}</span>
        </p>

        <button
          onClick={onClose}
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}
