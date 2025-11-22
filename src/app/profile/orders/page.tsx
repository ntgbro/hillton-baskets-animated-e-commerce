"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { mockOrders } from "@/data/orders";
import { formatDate, getStatusColor } from "@/lib/utils";

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const userOrders = mockOrders.filter((o) => o.userId === user.id);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <Button asChild variant="outline">
              <Link href="/profile">Back to Profile</Link>
            </Button>
          </div>

          {userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map((order) => {
                const statusColors = getStatusColor(order.status);
                return (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <Badge className={`${statusColors.bg} ${statusColors.text} border-${statusColors.border}`}>
                            {order.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex gap-4">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                              <Image
                                src={item.productImage}
                                alt={item.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium line-clamp-1">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="font-semibold">₹{item.total.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="text-2xl font-bold">₹{order.total.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Track Order</Button>
                          <Button>View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping and your orders will appear here
                </p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
