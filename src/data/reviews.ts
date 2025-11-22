export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
}

export const mockReviews: Review[] = [
  {
    id: "rev1",
    productId: "1",
    userId: "1",
    userName: "Priya Sharma",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    title: "Excellent quality and worth every penny!",
    comment: "The stainless steel quality is outstanding. Installation was easy and the soft-close mechanism works perfectly. Highly recommended for modular kitchens.",
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300"],
    helpful: 45,
    verified: true,
    createdAt: "2024-01-25T10:30:00Z"
  },
  {
    id: "rev2",
    productId: "1",
    userId: "2",
    userName: "Rajesh Kumar",
    rating: 4,
    title: "Good product but installation could be better",
    comment: "Quality is great and looks premium. However, needed professional help for installation. Overall satisfied with the purchase.",
    helpful: 23,
    verified: true,
    createdAt: "2024-01-28T15:20:00Z"
  },
  {
    id: "rev3",
    productId: "3",
    userId: "3",
    userName: "Anjali Patel",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    title: "Perfect cutlery organizer!",
    comment: "Fits perfectly in my drawer. The adjustable compartments are very useful. Material quality is excellent and easy to clean.",
    helpful: 67,
    verified: true,
    createdAt: "2024-02-01T09:15:00Z"
  },
  {
    id: "rev4",
    productId: "22",
    userId: "4",
    userName: "Vikram Singh",
    rating: 5,
    title: "Best kitchen upgrade ever!",
    comment: "The German runners are incredibly smooth. Soft-close is whisper quiet. This is premium quality that will last for years. Worth the investment!",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300"
    ],
    helpful: 89,
    verified: true,
    createdAt: "2024-02-10T14:45:00Z"
  }
];
