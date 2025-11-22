"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, MapPin, Heart, Settings, LogOut } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { mockOrders } from "@/data/orders";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const userOrders = mockOrders.filter((o) => o.userId === user.id);
  const recentOrders = userOrders.slice(0, 3);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-2xl">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>

                  <Separator className="my-4" />

                  <nav className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-medium"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/profile/orders"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
                    >
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      href="/profile/addresses"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Addresses</span>
                    </Link>
                    <Link
                      href="/profile/wishlist"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </nav>

                  <Separator className="my-4" />

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{userOrders.length}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{user.addresses.length}</div>
                      <div className="text-sm text-muted-foreground">Addresses</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{user.wishlist.length}</div>
                      <div className="text-sm text-muted-foreground">Wishlist</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">Member</div>
                      <div className="text-sm text-muted-foreground">Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/profile/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-semibold">Order #{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm">
                              {order.items.length} item{order.items.length > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{order.total.toLocaleString()}</p>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      No orders yet
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.addresses.slice(0, 2).map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{address.name}</span>
                          <span className="text-xs px-2 py-0.5 bg-muted rounded">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.addressLine1}, {address.city} - {address.pincode}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/profile/addresses">Manage Addresses</Link>
                  </Button>
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
