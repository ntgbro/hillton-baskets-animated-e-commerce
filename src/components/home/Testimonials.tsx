"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { companyInfo } from "@/data/company";
import { motion, AnimatePresence } from "framer-motion";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? companyInfo.testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === companyInfo.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-sm">
            Real experiences from real customers
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 mb-6">
          {companyInfo.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4 mb-4">
                    {testimonial.avatar && (
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4 mb-4">
                    {companyInfo.testimonials[currentIndex].avatar && (
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src={companyInfo.testimonials[currentIndex].avatar}
                          alt={companyInfo.testimonials[currentIndex].name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        {companyInfo.testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {companyInfo.testimonials[currentIndex].location}
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({
                          length: companyInfo.testimonials[currentIndex].rating,
                        }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-muted-foreground italic">
                    "{companyInfo.testimonials[currentIndex].comment}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {companyInfo.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
