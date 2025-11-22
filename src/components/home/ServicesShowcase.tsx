"use client";

import { Compass, Wrench, Settings, Shield, RotateCcw, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    icon: Compass,
    title: "Free Design Consultation",
    description: "Expert guidance for your perfect kitchen storage solution",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Trained technicians ensure flawless setup",
  },
  {
    icon: Settings,
    title: "Custom Solutions",
    description: "Tailored sizes and configurations available",
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "Up to 7 years warranty on select products",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Fast delivery to 85+ cities",
  },
];

export function ServicesShowcase() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Hillton Baskets?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best products and services for your kitchen
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
