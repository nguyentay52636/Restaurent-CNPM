
import React from 'react';
import HeroSection from '../components/Home/components/HeroSection';
import Features from '../components/Home/components/Features';
import BestDishes from '../components/Home/components/BestDishes';
import RegionTabs from '../components/Home/components/RegionTabs';
import RegularMenu from '../components/Home/components/RegularMenu';
import PromotionCard from '../components/Home/components/PromotionCard';
export default function HomePages() {
  return (
    <div>
      <HeroSection />
      <Features />
      <BestDishes />
      <RegionTabs />
      <RegularMenu/>
      <PromotionCard/>
    </div>
  );
}
