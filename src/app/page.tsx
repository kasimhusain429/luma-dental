import Header from '@/components/Header';
import MoeStage from '@/components/MoeStage';
import StoryDock from '@/components/StoryDock';
import ScrollDriver from '@/components/ScrollDriver';
import { MotionProvider } from '@/components/Reveal';
import { Book, Calm, Craft, Footer, Hero, Team, Testimonials, Treatments } from '@/components/Sections';

export default function Home() {
  return (
    <MotionProvider>
      <Header />
      <StoryDock />
      <MoeStage />
      <main id="main">
        <Hero />
        <Calm />
        <Craft />
        <Treatments />
        <Team />
        <Testimonials />
        <Book />
      </main>
      <Footer />
      <ScrollDriver />
    </MotionProvider>
  );
}
