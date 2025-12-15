"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    // Removed border radius from navbar
    <header className="sticky top-0 z-50 w-full bg-[oklch(0.55_0.19_264)]">
      {/* Redesigned Navbar with Two Equal Parts */}
      <div className="container mx-auto px-4 h-28 flex flex-col justify-center">
        {/* Upper Part */}
        <div className="flex items-center justify-between h-1/2">
          {/* Changed delivery display font to white */}
          <div className="flex items-center gap-2">
            <span className="text-base text-white">Delivering to Bangalore 560001</span>
          </div>
          {/* Changed location pin symbol to white */}
          <Button variant="ghost" size="icon" asChild className="h-12 w-12">
            <Link href="/location">
              <MapPin className="h-12 w-12 text-white scale-150" />
            </Link>
          </Button>
        </div>
        
        {/* Lower Part */}
        <div className="flex items-center h-1/2">
          
          {/* Brand Name - Changed to white */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl font-bold text-white">Hillton</div>
            <div className="text-base text-white/80 hidden sm:block">Baskets</div>
          </Link>
          
          {/* Search Input Field */}
          <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl mx-2">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for kitchen baskets, organizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-4 border-white/30 bg-white/10 text-white placeholder:text-white/70"
              />
            </div>
          </form>
          
          {/* Search Icon - Changed to white */}
          <Button variant="ghost" size="icon" type="submit" onClick={handleSearch} className="h-12 w-12">
            <Search className="h-12 w-12 text-white scale-150" />
          </Button>
          
          {/* Login Button - Visible when user is not logged in */}
          {!user && (
            <Button asChild size="sm" className="hidden md:inline-flex ml-2 bg-white text-[oklch(0.55_0.19_264)] hover:bg-white/90">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="container mx-auto px-4">
        <nav className="hidden md:flex items-center gap-6 py-3 text-sm">
          <Link
            href="/products"
            className={`hover:text-white transition-colors ${pathname?.startsWith("/products") ? "text-white font-semibold" : "text-white/80"
              }`}
          >
            All Products
          </Link>
          <Link
            href="/products?category=kitchen-baskets"
            className="hover:text-white transition-colors text-white/80"
          >
            Kitchen Baskets
          </Link>
          <Link
            href="/products?category=kitchen-organizers"
            className="hover:text-white transition-colors text-white/80"
          >
            Organizers
          </Link>
          <Link
            href="/products?tag=bestseller"
            className="hover:text-white transition-colors text-white/80"
          >
            Bestsellers
          </Link>
          <Link
            href="/products?tag=premium"
            className="hover:text-white transition-colors text-white/80"
          >
            Premium
          </Link>
          <Link href="/about" className="hover:text-white transition-colors text-white/80">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors text-white/80">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}