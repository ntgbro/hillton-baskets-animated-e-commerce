"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const promotions = [
  {
    id: 1,
    text: "🎉 GRAND SALE! Get up to 40% OFF on all Kitchen Organizers",
    bg: "bg-gradient-to-r from-purple-600 to-blue-600",
  },
  {
    id: 2,
    text: "✨ FREE Installation on orders above ₹15,000",
    bg: "bg-gradient-to-r from-green-600 to-teal-600",
  },
  {
    id: 3,
    text: "🚚 FREE Shipping on all orders above ₹10,000",
    bg: "bg-gradient-to-r from-orange-600 to-red-600",
  },
  {
    id: 4,
    text: "💎 Premium Soft-Close Systems - Limited Stock Available",
    bg: "bg-gradient-to-r from-pink-600 to-purple-600",
  },
];

export function PromotionsScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={`${promotions[currentIndex].bg} text-white py-6`}>
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="text-white hover:bg-white/20 hidden md:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="text-center flex-1 font-medium text-sm md:text-base">
              {promotions[currentIndex].text}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-white hover:bg-white/20 hidden md:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
