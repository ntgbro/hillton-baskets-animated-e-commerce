"use client";

import { PromotionsScroll } from "@/components/home/PromotionsScroll";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { AchievementsCounter } from "@/components/home/AchievementsCounter";
import { Testimonials } from "@/components/home/Testimonials";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <PromotionsScroll />
        <FeaturedProducts />
        <ServicesShowcase />
        <AchievementsCounter />
        <Testimonials />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}