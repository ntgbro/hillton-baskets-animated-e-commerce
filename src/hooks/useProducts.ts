"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export interface Product {
    id: string;
    productId: string;
    sku: string;
    name: string;
    description: string;
    mainImageURL: string;
    galleryURLs: string[];
    category: string;
    subCategory?: string;
    specifications: any;
    price: number;
    discountedPrice?: number;
    mrp: number;
    tax: {
        gstRate: number;
        hsnCode: string;
    };
    inventory: {
        currentStock: number;
        reorderLevel: number;
        maxStockLevel: number;
    };
    isAvailable: boolean;
    isFeatured: boolean;
    tags: string[];
    avgRating: number;
    totalRatings: number;
    orderCount: number;
    status: string;
    createdAt: any;
    updatedAt: any;
}

export function useProducts(categoryFilter?: string) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simplified query - no composite index needed
                let q;

                if (categoryFilter) {
                    q = query(
                        collection(db, 'products'),
                        where('category', '==', categoryFilter),
                        where('status', '==', 'active')
                    );
                } else {
                    q = query(
                        collection(db, 'products'),
                        where('status', '==', 'active')
                    );
                }

                const querySnapshot = await getDocs(q);
                const productsData: Product[] = [];

                querySnapshot.forEach((doc) => {
                    productsData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Product);
                });

                // Sort in memory instead of Firestore (works without index)
                productsData.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));

                setProducts(productsData);
            } catch (err: any) {
                console.error('Error fetching products:', err);
                setError(err.message || 'Failed to fetch products');
                setProducts([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryFilter]);


    return { products, loading, error };
}
