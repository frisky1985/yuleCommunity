# GitHub 推送指南

## 方法一：使用 GitHub CLI (推荐)

### 1. 安装 GitHub CLI

```bash
# macOS
brew install gh

# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Windows (使用 winget)
winget install --id GitHub.cli
```

### 2. 登录 GitHub

```bash
gh auth login
```

按照提示：
- 选择 `GitHub.com`
- 选择 `HTTPS`
- 选择 `Login with a web browser`
- 浏览器会打开授权页面，确认授权
- 回到终端，推送代码

```bash
cd ~/yuleCommunity-web
git push -u origin master
```

---

## 方法二：使用 Personal Access Token (经典方式)

### 1. 创建 GitHub Token

1. 登录 GitHub (https://github.com)
2. 点击右上角头像 → **Settings**
3. 左侧菜单 → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. 点击 **Generate new token (classic)**
6. 配置 Token：
   - **Note**: `yuleCommunity Push Token`
   - **Expiration**: 选择过期时间（建议 90 天或自定义）
   - **Scopes**: 勾选以下权限：
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

7. 点击 **Generate token**
8. **立即复制 Token**（页面关闭后无法再次查看）

### 2. 配置 Git 凭证

```bash
# 配置 Git 凭证存储
git config --global credential.helper cache

# 设置用户名和邮箱
git config --global user.name "frisky1985"
git config --global user.email "your-email@example.com"
```

### 3. 推送代码

```bash
cd ~/yuleCommunity-web

# 使用 Token 推送（推荐）
git push -u origin master

# 会提示输入用户名和密码
# Username: frisky1985
# Password: [粘贴刚才生成的 Token]
```

---

## 方法三：使用 SSH 密钥

### 1. 生成 SSH 密钥

```bash
# 生成密钥（使用你的 GitHub 邮箱）
ssh-keygen -t ed25519 -C "your-email@example.com"

# 按回车使用默认路径
# 设置密码（可选，直接回车跳过）

# 启动 SSH 代理
eval "$(ssh-agent -s)"

# 添加私钥
ssh-add ~/.ssh/id_ed25519
```

### 2. 添加公钥到 GitHub

```bash
# 复制公钥
cat ~/.ssh/id_ed25519.pub
```

1. 登录 GitHub → 头像 → **Settings**
2. 左侧 → **SSH and GPG keys**
3. 点击 **New SSH key**
4. **Title**: `yuleCommunity SSH Key`
5. **Key**: 粘贴刚才复制的公钥
6. 点击 **Add SSH key**

### 3. 修改远程仓库为 SSH

```bash
cd ~/yuleCommunity-web

# 改为 SSH 地址
git remote set-url origin git@github.com:frisky1985/yuleCommunity.git

# 验证
git remote -v
# 应显示: origin  git@github.com:frisky1985/yuleCommunity.git

# 推送
git push -u origin master
```

---

## 快速检查清单

```bash
# 1. 检查远程仓库配置
git remote -v

# 2. 确认有未推送的提交
git log origin/master..master

# 3. 检查用户名和邮箱
git config user.name
git config user.email

# 4. 推送
git push -u origin master
```

---

## 常见问题

### Q: 提示 "Permission denied (publickey)"
```bash
# 确保 SSH 代理运行
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Q: 提示 "Authentication failed"
```bash
# 使用 Token 作为密码
git push
# Username: frisky1985
# Password: [Token，不是 GitHub 密码]
```

### Q: 提示 "Could not resolve host"
```bash
# 检查网络连接
ping github.com

# 检查 Git 配置
git config --list | grep remote
```

---

## 推送成功后

访问你的仓库：https://github.com/frisky1985/yuleCommunity

确认以下文件已上传：
- ✅ `src/components/TeamWorkspace.tsx`
- ✅ `src/components/SSOSettings.tsx`
- ✅ `src/components/PrivateRegistry.tsx`
- ✅ `src/components/AnalyticsDashboard.tsx`
- ✅ `src/enterprise/EnterprisePage.tsx`
- ✅ `src/ide/IDEPage.tsx`
- ✅ `src/learning/` (学习系统)
