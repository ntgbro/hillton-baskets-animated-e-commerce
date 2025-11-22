export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: "Home" | "Work" | "Other";
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@hilltonbaskets.com",
    password: "password123",
    name: "John Doe",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    createdAt: "2024-01-15T10:30:00Z",
    addresses: [
      {
        id: "addr1",
        name: "John Doe",
        phone: "+91 98765 43210",
        addressLine1: "123 MG Road",
        addressLine2: "Near City Mall",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        isDefault: true,
        type: "Home"
      },
      {
        id: "addr2",
        name: "John Doe",
        phone: "+91 98765 43210",
        addressLine1: "456 Tech Park, Whitefield",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560066",
        isDefault: false,
        type: "Work"
      }
    ],
    wishlist: ["1", "4", "10", "22"]
  }
];
