import HeroSection from '@/components/HeroSection';
import EventHighlights from '@/components/EventHighlights';
import CallToAction from '@/components/CallToAction';
import './globals.css';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <EventHighlights />
      <CallToAction />
    </div>
  );
};

export default Home;
