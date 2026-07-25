import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, X as XIcon, ArrowRight, Shield, Building2, Sparkles, BugPlay, Cpu, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Pricing data ─── */
const TIERS = [
  {
    name: '社区版',
    desc: '个人开发者 · 学生 · 研究者',
    icon: BugPlay,
    price: '¥0',
    period: '永远免费',
    featured: false,
    cta: '免费使用',
    href: '#',
    variant: 'outline' as const,
    features: [
      { ok: true, text: '全部开源 BSW 模块 (MIT)' },
      { ok: true, text: '浏览器端代码沙盒' },
      { ok: true, text: '社区论坛 + 问答' },
      { ok: true, text: '技术博客 + 学习路径' },
      { ok: false, text: '私人仓库' },
      { ok: false, text: '团队协作' },
    ],
  },
  {
    name: '专业版',
    desc: '独立开发者 · 自由职业者',
    icon: Sparkles,
    price: '¥3,999',
    period: '/ 年',
    sub: '月付 ¥399 · 年付省 ¥800',
    featured: true,
    cta: '立即订阅',
    href: '#',
    variant: 'default' as const,
    features: [
      { ok: true, text: '社区版全部功能' },
      { ok: true, text: '3 个私人项目仓库' },
      { ok: true, text: '高级沙盒（全模块）' },
      { ok: true, text: '模块对比 + PDF 报告' },
      { ok: true, text: '完整学习路径 + 成就徽章' },
      { ok: true, text: '邮件优先支持（24h）' },
    ],
  },
  {
    name: '企业版',
    desc: 'OEM · Tier 1 · 芯片厂商',
    icon: Building2,
    price: '¥50,000',
    period: '/ 年起',
    sub: '定制报价，按需配置',
    featured: false,
    cta: '预约演示',
    href: '#',
    variant: 'outline' as const,
    features: [
      { ok: true, text: '专业版全部功能' },
      { ok: true, text: '私有化部署（On-premise）' },
      { ok: true, text: 'SSO（企微 / 钉钉 / LDAP / SAML）' },
      { ok: true, text: 'RBAC + 团队工作区' },
      { ok: true, text: '专属技术支持 + SLA 保障' },
      { ok: true, text: '定制 BSW 模块开发' },
    ],
  },
] as const;

const COMPARISON = [
  {
    icon: Shield,
    label: '国际商业工具 vs YuleTech',
    competitor: '¥100,000+ / 席 / 年',
    us: '¥3,999 / 年（专业版）',
    ratio: '× 25',
  },
  {
    icon: Cpu,
    label: '国内商业方案 vs YuleTech',
    competitor: '¥50,000~200,000 / 年',
    us: '¥50,000 / 年（企业版）',
    ratio: '≈',
  },
  {
    icon: GitBranch,
    label: '闭源 · 本地安装 · 无社区',
    competitor: '',
    us: '开源 · 云原生 · 社区生态',
    ratio: '完胜',
  },
] as const;

/* ─── Card ─── */
function PricingCard({ tier, index }: { tier: typeof TIERS[number]; index: number }) {
  const Icon = tier.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 * index, ease: [0.16, 1, 0.3, 1] }}
      className={[
        'relative flex flex-col rounded-2xl border p-6 transition-all duration-300',
        tier.featured
          ? 'border-primary/40 bg-primary/[0.04] shadow-[0_0_40px_-8px_hsl(var(--primary)/0.15)]'
          : 'border-border bg-card',
        'hover:translate-y-[-4px] hover:shadow-xl',
      ].join(' ')}
    >
      {/* Badge */}
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-[hsl(var(--accent))] px-4 py-1 text-[11px] font-semibold text-primary-foreground tracking-wide shadow-md">
          🌟 推荐
        </div>
      )}

      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{tier.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{tier.desc}</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Price */}
      <div className="mb-4 leading-tight">
        <span className="text-3xl font-extrabold tracking-tight">{tier.price}</span>
        <span className="ml-1 text-sm font-medium text-muted-foreground">{tier.period}</span>
        {'sub' in tier && (
          <p className="mt-1 text-xs font-medium text-emerald-500">{tier.sub}</p>
        )}
      </div>

      {/* CTA */}
      <Button variant={tier.variant} size="lg" className="mb-5 w-full" onClick={() => window.location.href = tier.href}>
        {tier.cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Features */}
      <ul className="space-y-2.5">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            {f.ok ? (
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            ) : (
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground/40">
                <XIcon className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            )}
            <span className={f.ok ? '' : 'text-muted-foreground/50'}>{f.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Comparison bar ─── */
function CompareItem({ item, index }: { item: typeof COMPARISON[number]; index: number }) {
  const Icon = item.icon;
  const isHighlight = item.ratio === '完胜';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 + 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4"
    >
      <div className={[
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
        isHighlight ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary',
      ].join(' ')}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-medium text-muted-foreground">{item.label}</p>
        <div className="flex items-center gap-3 text-sm font-semibold">
          {item.competitor && (
            <>
              <span className="truncate text-red-500">{item.competitor}</span>
              <span className="shrink-0 text-xs text-muted-foreground/50">→</span>
            </>
          )}
          <span className={isHighlight ? 'text-amber-500' : 'text-primary'}>{item.us}</span>
        </div>
      </div>
      <div className={[
        'shrink-0 text-sm font-extrabold',
        isHighlight ? 'text-amber-500' : 'text-red-500',
      ].join(' ')}>
        {item.ratio}
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export function PricingPage() {
  return (
    <>
      <Helmet>
        <title>定价 - YuleTech</title>
        <meta name="description" content="YuleTech 定价方案：社区版免费，专业版 ¥3,999/年，企业版 ¥50,000/年起。告别传统工具的高昂许可费。" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              MIT 开源 · 云原生 AutoSAR BSW 平台
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              重构 AutoSAR 工具{' '}
              <span className="text-gradient">定价体系</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              告别传统商业工具每年十几万的许可证费用。<br />
              从开源免费到企业级私有部署，总有一档适合你。
            </p>
          </motion.div>

          {/* ── Pricing cards ── */}
          <div className="mb-14 grid gap-6 md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>

          {/* ── Comparison ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <h2 className="mb-6 text-center text-lg font-bold">
              与行业方案的<span className="text-gradient">价格对比</span>
            </h2>
            <div className="space-y-3">
              {COMPARISON.map((item, i) => (
                <CompareItem key={item.label} item={item} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ── Footer ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center text-xs text-muted-foreground/40"
          >
            予乐科技 YuleTech · 让 AutoSAR 开发不再有价格门槛
          </motion.p>

        </div>
      </div>
    </>
  );
}

export default PricingPage;
