import { Divider } from '@mantine/core';
import React from 'react';
import Hackathon from '../FindHackathon.tsx/Hackathon';
import HackathonBanner from '../FindHackathon.tsx/HackathonBanner';

const HackathonPage = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] p-4">
      
      <HackathonBanner />
      
      <Hackathon />
    </div>
  );
};

export default HackathonPage;