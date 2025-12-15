"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user } = useAuth();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/products", icon: Search, label: "Products" },
    { href: "/cart", icon: ShoppingCart, label: "Cart", badge: cartCount > 0 ? cartCount : undefined },
    {
      href: user ? "/profile" : "/auth/login",
      icon: User,
      label: user ? "Profile" : "Login",
    },
  ];

  return (
    // Changed background color to match navbar color
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[oklch(0.55_0.19_264)] border-t border-white/10">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 relative transition-colors",
                isActive
                  // Changed active color to white
                  ? "text-white"
                  // Changed inactive color to white with opacity
                  : "text-white/70 hover:text-white"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}