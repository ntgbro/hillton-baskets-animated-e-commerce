"use client";

import Image from "next/image";
import { Award, Users, Target, Heart, Loader2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";

export default function AboutPage() {
  const { companyInfo, loading, error } = useCompanyInfo();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
        <MobileBottomNav />
      </>
    );
  }

  if (error || !companyInfo) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
          <p className="text-destructive">Failed to load company information</p>
        </main>
        <Footer />
        <MobileBottomNav />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About {companyInfo.companyName}</h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              {companyInfo.tagline}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                {companyInfo.aboutUs.description}
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Our Mission:</strong> {companyInfo.aboutUs.missionStatement}
              </p>
              <p className="text-muted-foreground">
                <strong>Our Vision:</strong> {companyInfo.aboutUs.visionStatement}
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Award className="h-24 w-24 mx-auto mb-4 opacity-20" />
                <p>Company Image</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Award, label: "Years of Excellence", value: "10+" },
              { icon: Users, label: "Happy Customers", value: "5K+" },
              { icon: Target, label: "Products Installed", value: "10K+" },
              { icon: Heart, label: "Cities Covered", value: "50+" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                  <p className="text-muted-foreground">
                    We never compromise on quality. Every product undergoes rigorous testing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
                  <p className="text-muted-foreground">
                    Your satisfaction is our priority. We go the extra mile for you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously innovate to bring you the best kitchen solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
