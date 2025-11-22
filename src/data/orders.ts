export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed";
  shippingAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export const mockOrders: Order[] = [
  {
    id: "ord1",
    userId: "1",
    orderNumber: "HB2024010001",
    status: "delivered",
    items: [
      {
        productId: "1",
        productName: "Premium Stainless Steel Kitchen Basket Set",
        productImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200",
        quantity: 1,
        price: 8999,
        total: 8999
      },
      {
        productId: "3",
        productName: "Modular Cutlery Organizer Drawer",
        productImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=200",
        quantity: 2,
        price: 1899,
        total: 3798
      }
    ],
    subtotal: 12797,
    discount: 500,
    shipping: 0,
    tax: 1230,
    total: 13527,
    paymentMethod: "UPI",
    paymentStatus: "completed",
    shippingAddress: {
      name: "John Doe",
      phone: "+91 98765 43210",
      addressLine1: "123 MG Road",
      addressLine2: "Near City Mall",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    orderDate: "2024-01-20T14:30:00Z",
    estimatedDelivery: "2024-01-25T18:00:00Z",
    trackingNumber: "HBT123456789"
  },
  {
    id: "ord2",
    userId: "1",
    orderNumber: "HB2024020002",
    status: "shipped",
    items: [
      {
        productId: "22",
        productName: "Premium Soft-Close Base Unit",
        productImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200",
        quantity: 1,
        price: 12999,
        total: 12999
      }
    ],
    subtotal: 12999,
    discount: 1000,
    shipping: 0,
    tax: 1200,
    total: 13199,
    paymentMethod: "UPI",
    paymentStatus: "completed",
    shippingAddress: {
      name: "John Doe",
      phone: "+91 98765 43210",
      addressLine1: "456 Tech Park, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560066"
    },
    orderDate: "2024-02-15T10:15:00Z",
    estimatedDelivery: "2024-02-22T18:00:00Z",
    trackingNumber: "HBT987654321"
  }
];
