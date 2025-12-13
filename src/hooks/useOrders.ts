"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export interface Order {
    id: string;
    orderId: string;
    orderNumber: string;
    userId: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    subtotal: number;
    discount: number;
    shippingCharges: number;
    tax: {
        cgst: number;
        sgst: number;
        totalTax: number;
    };
    totalAmount: number;
    shippingAddress: any;
    createdAt: any;
    updatedAt: any;
}

export function useOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setOrders([]);
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);

                const q = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const ordersData: Order[] = [];

                querySnapshot.forEach((doc) => {
                    ordersData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Order);
                });

                setOrders(ordersData);
            } catch (err: any) {
                console.error('Error fetching orders:', err);
                setError(err.message || 'Failed to fetch orders');
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    return { orders, loading, error };
}
