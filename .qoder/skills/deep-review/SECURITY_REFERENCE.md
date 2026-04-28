# 安全审计参考指南

## OWASP Top 10 (2021)

### A01: 访问控制失效
**检查项**:
- [ ] 是否实施最小权限原则？
- [ ] API 是否验证用户权限？
- [ ] 是否防止 IDOR (不直接对象引用)？

**示例**:
```typescript
// ❌ 不安全 - 未验证资源所有权
app.get('/api/documents/:id', (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
});

// ✅ 安全 - 验证所有权
app.get('/api/documents/:id', authenticate, async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (doc.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(doc);
});
```

### A02: 加密失败
**检查项**:
- [ ] 敏感数据是否加密存储？
- [ ] 密码是否使用强哈希 (bcrypt/Argon2)？
- [ ] 是否使用 TLS 传输？
- [ ] 密钥是否安全存储？

**推荐算法**:
- 密码哈希: bcrypt (cost >= 12), Argon2id
- 对称加密: AES-256-GCM
- 非对称加密: RSA-2048+, Ed25519
- 哈希: SHA-256+ (非密码), bcrypt (密码)

### A03: 注入
**SQL 注入防护**:
```typescript
// ❌ 不安全
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ 安全 - 参数化查询
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

**命令注入防护**:
```typescript
// ❌ 不安全
exec(`convert ${inputFile} output.png`);

// ✅ 安全 - 使用数组参数
exec('convert', [inputFile, 'output.png']);
```

### A04: 不安全设计
**安全设计原则**:
1. 深度防御 (Defense in Depth)
2. 最小权限 (Least Privilege)
3. 零信任架构 (Zero Trust)
4. 安全默认值 (Secure by Default)

### A05: 安全配置错误
**检查清单**:
- [ ] 移除默认账户和密码
- [ ] 禁用不必要的服务/端口
- [ ] 关闭调试模式
- [ ] 设置安全 HTTP 头
- [ ] 定期更新依赖

**安全 HTTP 头**:
```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  },
  hsts: { maxAge: 31536000 },
  noSniff: true,
}));
```

### A06: 漏洞组件
**依赖扫描**:
```bash
npm audit          # Node.js
pip-audit          # Python
mvn dependency:check  # Java
go list -m all     # Go
```

**更新策略**:
- 定期运行依赖扫描
- 设置自动化 PR 更新漏洞依赖 (Dependabot/Renovate)
- 锁定依赖版本 (package-lock.json)

### A07: 认证和鉴权失败
**强认证要求**:
- [ ] 多因素认证 (MFA)
- [ ] 密码强度要求 (>= 12 字符)
- [ ] 登录失败限制
- [ ] 会话超时
- [ ] 安全的密码重置流程

**JWT 最佳实践**:
```typescript
// ✅ 安全配置
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  {
    algorithm: 'RS256',      // 非对称加密
    expiresIn: '15m',        // 短时效
    issuer: 'yuletech.com',
    audience: 'api.yuletech.com'
  }
);
```

### A08: 软件和数据完整性失败
**检查项**:
- [ ] CI/CD 管道是否签名？
- [ ] 容器镜像是否验证？
- [ ] 依赖是否来自可信源？
- [ ] 是否使用 Subresource Integrity (SRI)？

### A09: 安全日志和监控失败
**必须记录的事件**:
- 认证失败
- 访问控制失败
- 服务器错误
- 数据验证失败
- 可疑活动

**禁止记录**:
- 密码
- 会话 ID
- 信用卡号
- 个人身份信息 (PII)

### A10: 服务端请求伪造 (SSRF)
**防护**:
```typescript
// ❌ 不安全
const response = await fetch(userProvidedUrl);

// ✅ 安全 - URL 白名单验证
const allowedDomains = ['api.yuletech.com', 'cdn.yuletech.com'];
const url = new URL(userProvidedUrl);
if (!allowedDomains.includes(url.hostname)) {
  throw new Error('Domain not allowed');
}
```

## 内存安全漏洞模式 (C/C++)

### 缓冲区溢出
```c
// ❌ 栈溢出
void copy_input(const char *input) {
    char buffer[64];
    strcpy(buffer, input);  // 无边界检查
}

// ✅ 安全
void copy_input(const char *input) {
    char buffer[64];
    strncpy(buffer, input, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\0';
}
```

### Use-After-Free
```c
// ❌ 使用后释放
char *ptr = malloc(100);
free(ptr);
strcpy(ptr, "data");  // ptr 已释放

// ✅ 安全
char *ptr = malloc(100);
strcpy(ptr, "data");
free(ptr);
ptr = NULL;  // 防止悬空指针
```

### 双重释放
```c
// ❌ 双重释放
void process() {
    char *ptr = malloc(100);
    free(ptr);
    // ... 其他代码
    free(ptr);  // 重复释放
}

// ✅ 安全
void process() {
    char *ptr = malloc(100);
    // ... 使用 ptr
    if (ptr != NULL) {
        free(ptr);
        ptr = NULL;
    }
}
```

### 整数溢出
```c
// ❌ 整数溢出
void allocate(size_t count) {
    size_t size = count * sizeof(int);  // 可能溢出
    int *arr = malloc(size);
}

// ✅ 安全
void allocate(size_t count) {
    if (count > SIZE_MAX / sizeof(int)) {
        return;  // 溢出检测
    }
    size_t size = count * sizeof(int);
    int *arr = malloc(size);
}
```

## 并发安全问题

### 数据竞争
```typescript
// ❌ 不安全 - 竞态条件
let balance = 100;
async function withdraw(amount: number) {
  if (balance >= amount) {
    balance -= amount;
  }
}

// ✅ 安全 - 使用锁
class Account {
  private balance = 100;
  private lock = new AsyncLock();
  
  async withdraw(amount: number) {
    return this.lock.acquire('balance', async () => {
      if (this.balance >= amount) {
        this.balance -= amount;
        return true;
      }
      return false;
    });
  }
}
```

### 死锁预防
**规则**:
1. 始终按相同顺序获取锁
2. 使用超时机制
3. 避免嵌套锁
4. 使用锁层次结构

## 检查工具

### Node.js
```bash
# 安全扫描
npm audit
npx audit-ci

# 静态分析
npm run lint
npx tsc --noEmit

# 依赖检查
npx depcheck
```

### Python
```bash
# 安全扫描
bandit -r src/
safety check

# 静态分析
pylint src/
mypy src/
```

### C/C++
```bash
# 静态分析
cppcheck --enable=all src/
clang-tidy -checks='bugprone-*,misc-*' src/**/*.cpp

# 内存检查
valgrind --leak-check=full ./program
```

### Java
```bash
# 安全检查
mvn owasp:check
mvn spotbugs:check

# 代码质量
mvn checkstyle:check
mvn pmd:check
```
