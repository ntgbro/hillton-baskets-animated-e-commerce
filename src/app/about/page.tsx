"use client";

import Image from "next/image";
import { Award, Users, Target, Heart } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { companyInfo } from "@/data/company";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About Hillton Baskets</h1>
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
                {companyInfo.description}
              </p>
              <p className="text-muted-foreground">
                Since {companyInfo.founded}, we've been transforming kitchens across India with our 
                innovative storage solutions. Our commitment to quality and customer satisfaction has 
                made us the trusted choice for over {companyInfo.stats.happyCustomers.toLocaleString()} homeowners.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
                alt="Hillton Baskets"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Award, label: "Years of Excellence", value: companyInfo.stats.yearsInBusiness + "+" },
              { icon: Users, label: "Happy Customers", value: (companyInfo.stats.happyCustomers / 1000) + "K+" },
              { icon: Target, label: "Products Installed", value: (companyInfo.stats.productsInstalled / 1000) + "K+" },
              { icon: Heart, label: "Cities Covered", value: companyInfo.stats.citiesCovered + "+" },
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
