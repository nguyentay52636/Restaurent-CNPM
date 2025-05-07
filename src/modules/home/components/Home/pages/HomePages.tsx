import React from 'react';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import BestDishes from '../components/BestDishes';
import RegionTabs from '../components/RegionTabs';
import RegularMenu from '../components/RegularMenu';
import PromotionCard from '../components/PromotionCard';
import { motion } from 'framer-motion';

export default function HomePages() {
  return (
    <motion.div>
      
      <HeroSection />
      <Features />
      <BestDishes />
      <RegionTabs />
      <RegularMenu />
      <PromotionCard />
    </motion.div>
  );
}
