"use client";

import { Compass, Wrench, Settings, Shield, RotateCcw, Truck } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: Compass,
    title: "Free Design Consultation",
    description: "Our expert designers will help you plan the perfect kitchen storage solution tailored to your space and needs. We provide detailed 3D designs and measurements.",
    features: ["Free home visit", "3D design visualization", "Expert recommendations", "Space optimization tips"]
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Our trained technicians ensure flawless installation of all products. We handle everything from measurements to final setup with precision and care.",
    features: ["Trained technicians", "Complete installation kit", "Clean workmanship", "Post-installation support"]
  },
  {
    icon: Settings,
    title: "Customization Services",
    description: "Every kitchen is unique. We offer custom sizes, configurations, and finishes to match your specific requirements perfectly.",
    features: ["Custom dimensions", "Multiple finish options", "Flexible configurations", "Design flexibility"]
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "All our products come with comprehensive warranty coverage. Select products include extended warranties up to 7 years for your peace of mind.",
    features: ["Up to 7-year warranty", "Free service during warranty", "Genuine spare parts", "Quick resolution"]
  },
  {
    icon: RotateCcw,
    title: "Easy Returns & Exchange",
    description: "Not satisfied? We offer a hassle-free 30-day return and exchange policy. Your satisfaction is our guarantee.",
    features: ["30-day return window", "Free pickup", "Full refund", "No questions asked"]
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "We deliver to over 85 cities across India with secure packaging and tracking. Free shipping on orders above ₹10,000.",
    features: ["85+ cities covered", "Secure packaging", "Real-time tracking", "Free shipping available"]
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Services</h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              Complete kitchen solutions with end-to-end support
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Kitchen?</h2>
            <p className="text-muted-foreground mb-6">
              Get in touch with us for a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
