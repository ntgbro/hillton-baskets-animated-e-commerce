export interface CartItem {
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

const CART_STORAGE_KEY = "hillton_cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const addToCart = (item: CartItem): CartItem[] => {
  const cart = getCart();
  const existingIndex = cart.findIndex((i) => i.productId === item.productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: string): CartItem[] => {
  const cart = getCart();
  const filtered = cart.filter((item) => item.productId !== productId);
  saveCart(filtered);
  return filtered;
};

export const updateQuantity = (
  productId: string,
  quantity: number
): CartItem[] => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.productId === productId);

  if (index > -1) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    cart[index].quantity = quantity;
    saveCart(cart);
  }

  return cart;
};

export const clearCart = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const calculateCart = (items: CartItem[]): Cart => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = items.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const shipping = subtotal >= 10000 ? 0 : 299;
  const tax = Math.round(subtotal * 0.09); // 9% GST
  const total = subtotal + shipping + tax;

  return {
    items,
    subtotal,
    discount: totalDiscount,
    shipping,
    tax,
    total,
  };
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};
