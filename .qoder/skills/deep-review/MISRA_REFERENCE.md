# MISRA C:2012 关键规则参考

## 规则分类

### 必要规则 (Required) - 必须遵守

#### 第 5 章: 标识符
- **Rule 5.1**: 外部链接标识符唯一性
- **Rule 5.2**: 同一作用域标识符唯一性
- **Rule 5.3**: 内部/外部链接标识符区分

#### 第 8 章: 声明与定义
- **Rule 8.2**: 函数必须有原型声明
- **Rule 8.4**: 兼容类型的外部声明
- **Rule 8.6**: 外部链接函数必须有原型
- **Rule 8.8**: 函数原型作用域外使用 static

#### 第 10 章: 类型转换
- **Rule 10.1**: 操作数必须是本质类型
- **Rule 10.2**: 相同本质类型的表达式操作
- **Rule 10.3**: 不能将宽类型转换为窄类型
- **Rule 10.4**: 复合赋值操作类型匹配

#### 第 11 章: 指针转换
- **Rule 11.1**: 禁止函数指针与其他指针转换
- **Rule 11.2**: 指针转换必须指向完整类型
- **Rule 11.3**: 禁止指针与整数之间的转换
- **Rule 11.4**: 禁止指针到不同地址空间的转换
- **Rule 11.5**: 禁止 void 指针到非指针对象转换
- **Rule 11.6**: 禁止整数到指针转换

#### 第 17 章: 函数调用
- **Rule 17.1**: stdarg.h 宏必须在函数参数中使用
- **Rule 17.2**: 禁止递归函数
- **Rule 17.3**: 函数不应隐式声明
- **Rule 17.4**: 数组索引禁止使用指针算术

#### 第 21 章: 标准库
- **Rule 21.1**: #include 指令必须指定标准头文件
- **Rule 21.2**: 禁止使用保留的标识符
- **Rule 21.3**: 禁止调用动态内存管理函数 (malloc/free)
- **Rule 21.4**: 禁止使用标准 I/O 库
- **Rule 21.5**: 禁止使用 signal.h
- **Rule 21.6**: 禁止使用 stdio.h 库函数

#### 第 22 章: 运行时环境
- **Rule 22.1**: 确保资源不泄漏 (文件、内存)
- **Rule 22.2**: 块应具有适当的存储持续时间
- **Rule 22.3**: 同一文件不应打开多次
- **Rule 22.4**: 禁止写入 const 限定对象
- **Rule 22.5**: 禁止使用 NULL 指针
- **Rule 22.6**: 指针参数必须有非 NULL 断言

### 强制规则 (Mandatory) - 语法层面

- **Rule 1.1**: 代码必须符合 C 语言标准
- **Rule 1.2**: 语言扩展不得影响程序行为
- **Rule 1.3**: 文件必须以换行符结束
- **Rule 2.1**:  unreachable 代码必须删除
- **Rule 2.2**: 死代码必须删除

## AutoSAR 特定扩展

### M4 规则 (安全相关)
- **AMM100**: 所有函数必须有返回类型
- **AMM101**: 指针比较必须检查 NULL
- **AMM102**: 禁止使用可变参数列表
- **AMM103**: 循环必须有明确的终止条件

## 检查工具配置

### PC-lint Plus
```
-misra(2)          // MISRA C:2012
-misra-required    // 检查 Required 规则
-misra-mandatory   // 检查 Mandatory 规则
```

### Coverity
```
--misra-c2012      // 启用 MISRA C:2012 检查
--aggressive       // 严格模式
```

### Cppcheck
```
--addon=misra.py   // MISRA 检查插件
--rule-file=misra.xml
```

## 常见违规示例

### 违规: 隐式类型转换
```c
// ❌ 违规 Rule 10.3
int32_t a = 1000;
int8_t b = a;  // 窄化转换

// ✅ 修正
int32_t a = 1000;
int8_t b;
if (a >= INT8_MIN && a <= INT8_MAX) {
    b = (int8_t)a;  // 显式转换 + 范围检查
}
```

### 违规: 指针转换
```c
// ❌ 违规 Rule 11.1
void (*fp)(void) = (void (*)(void))0x1234;

// ✅ 修正 - 使用联合
typedef union {
    void (*func)(void);
    uintptr_t addr;
} FuncPtr;

FuncPtr p = {.addr = 0x1234};
```

### 违规: 使用动态内存
```c
// ❌ 违规 Rule 21.3
int *arr = (int *)malloc(10 * sizeof(int));

// ✅ 修正 - 使用静态分配
int arr[10];
```

### 违规: 递归函数
```c
// ❌ 违规 Rule 17.2
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// ✅ 修正 - 迭代
int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

## 合规性检查清单

```
MISRA C 合规检查:
- [ ] 所有 Required 规则通过
- [ ] 所有 Mandatory 规则通过
- [ ] 违规项有正当理由并记录
- [ ] 偏差得到安全团队批准
- [ ] 定期重新扫描验证
```

## 偏差管理

当必须违反某条规则时:

1. **记录原因**: 为什么必须违反？
2. **风险评估**: 违反后的安全风险？
3. **缓解措施**: 如何降低风险？
4. **审批流程**: 安全团队审核批准
5. **代码注释**: 在代码中标明偏差

```c
/* 
 * Deviation: MISRA Rule 21.3
 * Reason: 动态配置表大小在编译时未知
 * Risk: 可能内存不足
 * Mitigation: 分配前检查大小，失败时安全降级
 * Approved: 2024-01-15 by Security Team
 */
ConfigTable *table = malloc(size * sizeof(ConfigEntry));
if (table == NULL) {
    safe_degrade();
}
```
