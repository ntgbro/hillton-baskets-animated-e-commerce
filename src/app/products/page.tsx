"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const tags = Array.from(new Set(products.flatMap((p) => p.tags)));

  // Initialize filtered products when products load
  useEffect(() => {
    if (products.length > 0 && filteredProducts.length === 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    const categoryParam = searchParams?.get("category");
    if (categoryParam) {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(categoryParam.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Apply tag filter
    const tagParam = searchParams?.get("tag");
    if (tagParam) {
      filtered = filtered.filter((p) => p.tags.includes(tagParam));
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        p.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        filtered.sort((a, b) => {
          const discountA = a.discountedPrice ? ((a.price - a.discountedPrice) / a.price) * 100 : 0;
          const discountB = b.discountedPrice ? ((b.price - b.discountedPrice) / b.price) * 100 : 0;
          return discountB - discountA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, sortBy, priceRange, selectedCategories, selectedTags, searchParams, products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <Label className="mb-3 block">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={20000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <Label className="mb-3 block">Filter by Tags</Label>
        <div className="space-y-2">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <label
                htmlFor={tag}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">All Products</h1>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 bg-card border rounded-lg p-6">
                <h2 className="font-semibold mb-4 text-lg">Filters</h2>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading products...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-destructive text-lg font-semibold">Error loading products</p>
                  <p className="text-muted-foreground mt-2">{error}</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
