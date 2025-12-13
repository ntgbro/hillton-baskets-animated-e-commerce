"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Heart, Share2, ShoppingCart, Check, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
import { useProduct } from "@/hooks/useProduct";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { product, loading, error } = useProduct(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </>
    );
  }

  if (error || !product) {
    notFound();
  }

  // Map Firebase product to display format
  const displayProduct = {
    ...product,
    images: product.galleryURLs && product.galleryURLs.length > 0
      ? product.galleryURLs
      : [product.mainImageURL || '/placeholder-product.jpg'],
    discount: product.discountedPrice
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0,
    originalPrice: product.price,
    price: product.discountedPrice || product.price,
    rating: product.avgRating || 0,
    reviewCount: product.totalRatings || 0,
    inStock: product.isAvailable && (product.inventory?.currentStock || 0) > 0,
    features: product.specifications?.features || [],
    material: product.specifications?.material || 'Stainless Steel',
    dimensions: product.specifications?.dimensions || 'Standard',
    weight: product.specifications?.weight || 'N/A',
    warranty: product.specifications?.warranty || '1 Year',
    brand: 'Hillton Baskets',
    color: product.specifications?.finish ? [product.specifications.finish] : ['Chrome'],
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: displayProduct.price,
      originalPrice: displayProduct.originalPrice,
      discount: displayProduct.discount,
      image: displayProduct.images[0],
      quantity,
      inStock: displayProduct.inStock,
    });
    toast.success("Added to cart!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square mb-4 rounded-lg overflow-hidden border"
              >
                <Image
                  src={displayProduct.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {displayProduct.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive">
                    {displayProduct.discount}% OFF
                  </Badge>
                )}
              </motion.div>
              {displayProduct.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {displayProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary" : "border-transparent"
                        }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
                  <span className="font-semibold">{displayProduct.rating.toFixed(1)}</span>
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-muted-foreground">
                  {displayProduct.reviewCount} ratings
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">{formatPrice(displayProduct.price)}</span>
                {displayProduct.discount > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(displayProduct.originalPrice)}
                    </span>
                    <Badge variant="secondary" className="text-green-600">
                      {displayProduct.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Colors */}
              {displayProduct.color && displayProduct.color.length > 0 && (
                <div className="mb-6">
                  <Label className="mb-2 block font-semibold">Available Finishes</Label>
                  <div className="flex gap-2">
                    {displayProduct.color.map((color: string) => (
                      <Badge key={color} variant="outline">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <Label className="mb-2 block font-semibold">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!displayProduct.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {displayProduct.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      <span className="text-sm">Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm">{displayProduct.warranty} Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <span className="text-sm">30-Day Returns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-sm">{displayProduct.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  {displayProduct.features && displayProduct.features.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-2">
                        {displayProduct.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Technical Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Material</span>
                      <span className="text-muted-foreground">{displayProduct.material}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Dimensions</span>
                      <span className="text-muted-foreground">{displayProduct.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Weight</span>
                      <span className="text-muted-foreground">{displayProduct.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Warranty</span>
                      <span className="text-muted-foreground">{displayProduct.warranty}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Brand</span>
                      <span className="text-muted-foreground">{displayProduct.brand}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
