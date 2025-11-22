"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/data/products";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.images[0],
      quantity: 1,
      inStock: product.inStock,
    });
    toast.success("Added to cart!");
  };

  return (
    <Link href={`/products/${product.slug}`}>
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
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            {product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-destructive">
                {product.discount}% OFF
              </Badge>
            )}
            {product.tags.includes("bestseller") && (
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
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                <span>{product.rating}</span>
                <Star className="h-3 w-3 fill-current" />
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <Button
              className="w-full"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
