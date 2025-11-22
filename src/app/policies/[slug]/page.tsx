"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { policies } from "@/data/company";
import ReactMarkdown from "react-markdown";

export default function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const policy = policies[slug as keyof typeof policies];

  if (!policy) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {policy.title}
            </h1>
            <p className="text-center text-muted-foreground">
              Last updated: {policy.lastUpdated}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            <ReactMarkdown>{policy.content}</ReactMarkdown>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
