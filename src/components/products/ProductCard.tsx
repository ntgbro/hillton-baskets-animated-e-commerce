"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Map Firebase product to display format
  const displayProduct = {
    id: product.id || product.productId,
    name: product.name,
    slug: product.productId || product.id, // Use productId as slug
    images: product.galleryURLs && product.galleryURLs.length > 0
      ? product.galleryURLs
      : [product.mainImageURL || 'https://placehold.co/600x600/e2e8f0/64748b?text=No+Image'],
    price: product.discountedPrice || product.price,
    originalPrice: product.price,
    discount: product.discountedPrice
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0,
    rating: product.avgRating || 0,
    reviewCount: product.totalRatings || 0,
    inStock: product.isAvailable && (product.inventory?.currentStock || 0) > 0,
    tags: product.tags || [],
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.price,
      originalPrice: displayProduct.originalPrice,
      discount: displayProduct.discount,
      image: displayProduct.images[0],
      quantity: 1,
      inStock: displayProduct.inStock,
    });
    toast.success("Added to cart!");
  };

  return (
    <Link href={`/products/${displayProduct.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
      >
        <Card
          className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square overflow-hidden bg-muted">
            {displayProduct.images[0] && displayProduct.images[0] !== '' ? (
              <Image
                src={displayProduct.images[0]}
                alt={displayProduct.name}
                fill
                className="object-cover transition-transform duration-300"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                <div className="text-center p-4">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No Image</p>
                </div>
              </div>
            )}
            {displayProduct.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-destructive">
                {displayProduct.discount}% OFF
              </Badge>
            )}
            {displayProduct.tags.includes("bestseller") && (
              <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                Bestseller
              </Badge>
            )}
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 opacity-0 transition-opacity"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2 min-h-[40px]">
              {displayProduct.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                <span>{displayProduct.rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-current" />
              </div>
              <span className="text-xs text-muted-foreground">
                ({displayProduct.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold">{formatPrice(displayProduct.price)}</span>
              {displayProduct.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(displayProduct.originalPrice)}
                </span>
              )}
            </div>
            <Button
              className="w-full"
              size="sm"
              onClick={handleAddToCart}
              disabled={!displayProduct.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {displayProduct.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
