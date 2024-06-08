import MissionStatement from '@/components/MissionStatement';
import Vision from '@/components/Vision';
import History from '@/components/History';
import CoreValues from '@/components/CoreValues';
import ProgramsInitiatives from '@/components/ProgramsInitiatives';
import JoinUs from '@/components/JoinUs';

export const metadata = {
  title: 'About',
  description: 'About Page of SICOSA-2005',
};

const AboutPage = () => {
  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      <MissionStatement />
      <Vision />
      <History />
      <CoreValues />
      <ProgramsInitiatives />
      <JoinUs />
    </div>
  );
};

export default AboutPage;
