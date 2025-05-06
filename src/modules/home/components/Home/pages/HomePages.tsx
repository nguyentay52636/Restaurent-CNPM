import React from 'react';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import BestDishes from '../components/BestDishes';
import RegionTabs from '../components/RegionTabs';
import RegularMenu from '../components/RegularMenu';
import PromotionCard from '../components/PromotionCard';

export default function HomePages() {
  return (
    <main className="w-full min-w-full max-w-full mx-auto">
      {/* Chắc chắn main chiếm toàn bộ chiều rộng màn hình */}
      <HeroSection />
      <Features />
      <BestDishes />
      <RegionTabs />
      <RegularMenu />
      <PromotionCard />
    </main>
  );
}
