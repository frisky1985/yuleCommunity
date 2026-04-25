import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Stats } from '../components/Stats';
import { OpenSource } from '../components/OpenSource';
import { Community } from '../components/Community';
import { CTA } from '../components/CTA';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>YuleTech - 汽车基础软件开源社区 | AutoSAR BSW</title>
        <meta name="description" content="YuleTech 是国内领先的汽车基础软件开源社区，提供 AutoSAR BSW 开源代码、开发工具链、学习成长平台和硬件开发板。" />
      </Helmet>
      <Hero />
      <Features />
      <Stats />
      <OpenSource />
      <Community />
      <CTA />
    </>
  );
}
