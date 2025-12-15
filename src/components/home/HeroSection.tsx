"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transform Your Kitchen with
              <span className="text-primary block mt-2">Premium Storage Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover India's finest collection of modular kitchen baskets and organizers. 
              German engineering meets Indian craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="group">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">7-Year Warranty</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">15+ Years</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl w-4/5 mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
                alt="Premium Kitchen Baskets"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-card p-4 rounded-lg shadow-lg"
            >
              <p className="text-2xl font-bold text-primary">50,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-card p-4 rounded-lg shadow-lg"
            >
              <p className="text-2xl font-bold text-primary">4.8★</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
