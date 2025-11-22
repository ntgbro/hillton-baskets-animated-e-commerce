"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Package, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";

const achievements = [
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Years in Business",
  },
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: Package,
    value: 125000,
    suffix: "+",
    label: "Products Installed",
  },
  {
    icon: MapPin,
    value: 85,
    suffix: "+",
    label: "Cities Covered",
  },
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}
    </div>
  );
}

export function AchievementsCounter() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-muted-foreground">
            Building trust and excellence, one kitchen at a time
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-2">
                  <CountUp end={achievement.value} />
                  <span className="text-4xl md:text-5xl font-bold text-primary">
                    {achievement.suffix}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium">
                  {achievement.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
