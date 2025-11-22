"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Smartphone, Building2, Wallet, Check } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses?.find((a) => a.isDefault)?.id || user?.addresses?.[0]?.id || ""
  );

  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/checkout");
    return null;
  }

  if (cart.items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter your UPI ID");
      return;
    }

    // Simulate order placement
    toast.success("Order placed successfully!");
    clearCart();
    router.push("/profile/orders");
  };

  const selectedAddressData = user?.addresses?.find((a) => a.id === selectedAddress);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    <div className="space-y-4">
                      {user?.addresses?.map((address) => (
                        <div
                          key={address.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                            selectedAddress === address.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <RadioGroupItem value={address.id} id={address.id} />
                          <label htmlFor={address.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
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
                              {address.addressLine1}
                              {address.addressLine2 && `, ${address.addressLine2}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Phone: {address.phone}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  <Button variant="outline" className="w-full mt-4">
                    Add New Address
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="h-5 w-5" />
                        <label htmlFor="upi" className="flex-1 cursor-pointer">
                          <div className="font-semibold">UPI</div>
                          <div className="text-sm text-muted-foreground">
                            PhonePe, Google Pay, Paytm
                          </div>
                        </label>
                      </div>

                      {paymentMethod === "upi" && (
                        <div className="ml-11 space-y-2">
                          <Label htmlFor="upiId">Enter UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </div>
                      )}

                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5" />
                        <label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Credit/Debit Card</div>
                          <div className="text-sm text-muted-foreground">
                            Visa, Mastercard, Rupay
                          </div>
                        </label>
                      </div>

                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                          paymentMethod === "netbanking"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Building2 className="h-5 w-5" />
                        <label htmlFor="netbanking" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Net Banking</div>
                          <div className="text-sm text-muted-foreground">
                            All major banks supported
                          </div>
                        </label>
                      </div>

                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                          paymentMethod === "wallet"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Wallet className="h-5 w-5" />
                        <label htmlFor="wallet" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Wallets</div>
                          <div className="text-sm text-muted-foreground">
                            Paytm, PhonePe, Amazon Pay
                          </div>
                        </label>
                      </div>

                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <Check className="h-5 w-5" />
                        <label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Cash on Delivery</div>
                          <div className="text-sm text-muted-foreground">
                            Pay when you receive
                          </div>
                        </label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Products */}
                  <div className="space-y-3 mb-4">
                    {cart.items.map((item) => (
                      <div key={item.productId} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Delivery Address Summary */}
                  {selectedAddressData && (
                    <>
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-1">
                          Delivering to:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddressData.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddressData.city}, {selectedAddressData.pincode}
                        </p>
                      </div>
                      <Separator className="my-4" />
                    </>
                  )}

                  {/* Price Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(cart.discount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {cart.shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          formatPrice(cart.shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPrice(cart.tax)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
