import { Helmet } from 'react-helmet-async';
import { useGitHubLogin } from '../hooks/useGitHubLogin';
import { GitHubAuthDialog } from '../components/GitHubAuthDialog';
import { useAuth } from '../hooks/useAuth';

export function JoinPage() {
  const { isAuthenticated } = useAuth();
  const { step, userCode, verificationUri, error, startDeviceFlow, reset } = useGitHubLogin();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">已登录</h1>
          <p className="text-muted-foreground">您已经成功加入 YuleTech 社区</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>加入社区 - YuleTech</title>
      </Helmet>
      <div className="min-h-screen pt-16 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">加入 YuleTech 社区</h1>
            <p className="text-muted-foreground">
              与 AutoSAR 开发者一起交流、学习、成长
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <button
              onClick={startDeviceFlow}
              disabled={step === 'authorizing' || step === 'polling'}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#24292f] hover:bg-[#1b1f23] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {step === 'authorizing' ? '连接中...' : '使用 GitHub 登录'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
                <button onClick={reset} className="ml-2 underline">重试</button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              登录即表示您同意我们的服务条款和隐私政策
            </p>
          </div>
        </div>
      </div>

      {/* Device Flow Dialog */}
      {(step === 'polling') && userCode && verificationUri && (
        <GitHubAuthDialog
          userCode={userCode}
          verificationUri={verificationUri}
          onClose={reset}
        />
      )}
    </>
  );
}
