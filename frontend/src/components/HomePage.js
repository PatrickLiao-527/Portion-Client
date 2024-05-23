// src/components/HomePage.js
import React from 'react';
import TopSection from './TopSection';
import BannerSection from './Banner';
import ThreeStepSection from './ThreeStepSection';

const HomePage = () => {
  return (
    <div className="home-page">
      <TopSection />
      <BannerSection />
      <ThreeStepSection />
    </div>
  );
};

export default HomePage;
