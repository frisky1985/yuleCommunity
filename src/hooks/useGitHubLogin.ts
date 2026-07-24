import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
const GITHUB_SCOPE = 'read:user user:email';

interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  interval: number;
}

interface AccessTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  email: string | null;
  bio: string | null;
}

export function useGitHubLogin() {
  const { login } = useAuth();
  const [step, setStep] = useState<'idle' | 'authorizing' | 'polling' | 'done' | 'error'>('idle');
  const [userCode, setUserCode] = useState('');
  const [verificationUri, setVerificationUri] = useState('');
  const [error, setError] = useState('');
  const [deviceCode, setDeviceCode] = useState<DeviceCodeResponse | null>(null);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);

  const startDeviceFlow = useCallback(async () => {
    if (!GITHUB_CLIENT_ID) {
      // 未配置 GitHub OAuth — fallback 到 mock 登录
      await login('github-user@yuletech.com', 'github-oauth');
      setGithubUser({ login: 'demo-user', id: 0, avatar_url: '', name: 'Demo User', email: 'demo@yuletech.com', bio: '' });
      setStep('done');
      return;
    }

    setStep('authorizing');
    setError('');

    try {
      const res = await fetch('https://github.com/login/device/code', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, scope: GITHUB_SCOPE }),
      });
      const data: DeviceCodeResponse = await res.json();
      setUserCode(data.user_code);
      setVerificationUri(data.verification_uri);
      setDeviceCode(data);
      setStep('polling');

      // 开始轮询 token
      const pollInterval = data.interval * 1000;
      const maxAttempts = 60; // 最多等 5-10 分钟
      let attempts = 0;

      const poll = async () => {
        attempts++;
        try {
          const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id: GITHUB_CLIENT_ID,
              device_code: data.device_code,
              grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            }),
          });
          const tokenData: AccessTokenResponse = await tokenRes.json();

          if (tokenData.access_token) {
            // 获取用户信息
            const userRes = await fetch('https://api.github.com/user', {
              headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
            });
            const ghUser: GitHubUser = await userRes.json();
            setGithubUser(ghUser);

            // 通过本地 auth 系统登录（这里会触发降级到 mock，但保留 GitHub 信息）
            await login(ghUser.email || `${ghUser.login}@github.com`, 'github-oauth');
            setStep('done');
            return;
          }

          if (tokenData.error === 'authorization_pending') {
            if (attempts < maxAttempts) {
              setTimeout(poll, pollInterval);
            } else {
              setError('授权超时，请重试');
              setStep('error');
            }
            return;
          }

          if (tokenData.error === 'slow_down') {
            setTimeout(poll, pollInterval + 5000);
            return;
          }

          if (tokenData.error === 'access_denied') {
            setError('用户取消了授权');
            setStep('error');
            return;
          }

          setError(tokenData.error_description || '授权失败');
          setStep('error');
        } catch (e) {
          setError('网络错误，请重试');
          setStep('error');
        }
      };

      setTimeout(poll, pollInterval);
    } catch (e) {
      setError('无法启动 GitHub 授权');
      setStep('error');
    }
  }, [login]);

  const reset = useCallback(() => {
    setStep('idle');
    setError('');
    setUserCode('');
    setDeviceCode(null);
    setGithubUser(null);
  }, []);

  return { step, userCode, verificationUri, error, githubUser, startDeviceFlow, reset };
}
