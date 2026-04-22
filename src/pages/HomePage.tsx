import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Stats } from '../components/Stats';
import { OpenSource } from '../components/OpenSource';
import { Community } from '../components/Community';
import { CTA } from '../components/CTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <OpenSource />
      <Community />
      <CTA />
    </>
  );
}
