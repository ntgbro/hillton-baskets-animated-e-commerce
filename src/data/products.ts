export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  subcategory: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  material: string;
  dimensions: string;
  weight: string;
  color: string[];
  features: string[];
  warranty: string;
  brand: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Stainless Steel Kitchen Basket Set",
    slug: "premium-stainless-steel-kitchen-basket-set",
    description: "Complete kitchen storage solution with 5 premium stainless steel baskets. Perfect for organizing utensils, vegetables, and pantry items. Features rust-proof construction and smooth gliding mechanisms.",
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    category: "Kitchen Baskets",
    subcategory: "Pull-out Baskets",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800"
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.7,
    reviewCount: 328,
    material: "304 Grade Stainless Steel",
    dimensions: "18\" x 20\" x 22\"",
    weight: "8.5 kg",
    color: ["Silver", "Chrome"],
    features: [
      "Rust-proof stainless steel construction",
      "Soft-close mechanism",
      "Easy installation kit included",
      "Maximum load capacity: 25kg",
      "5-year warranty"
    ],
    warranty: "5 Years",
    brand: "Hillton Baskets",
    tags: ["bestseller", "premium", "modular"]
  },
  {
    id: "2",
    name: "Corner Unit Carousel System",
    slug: "corner-unit-carousel-system",
    description: "Maximize your corner space with this innovative 360-degree rotating carousel system. Features 3 tiers of storage with chrome-plated wire baskets. Perfect for storing spices, bottles, and kitchen essentials.",
    price: 6499,
    originalPrice: 8999,
    discount: 28,
    category: "Kitchen Baskets",
    subcategory: "Corner Solutions",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    inStock: true,
    stockCount: 32,
    rating: 4.5,
    reviewCount: 187,
    material: "Chrome-plated Steel",
    dimensions: "28\" diameter x 32\" height",
    weight: "6.2 kg",
    color: ["Chrome", "Black"],
    features: [
      "360-degree smooth rotation",
      "3-tier storage system",
      "Anti-rust coating",
      "Easy access to corner spaces",
      "Load capacity: 20kg per tier"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["innovative", "space-saver"]
  },
  {
    id: "3",
    name: "Modular Cutlery Organizer Drawer",
    slug: "modular-cutlery-organizer-drawer",
    description: "Keep your cutlery perfectly organized with this premium drawer organizer. Features adjustable compartments, anti-slip base, and soft-touch finish. Fits standard kitchen drawers.",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    category: "Kitchen Organizers",
    subcategory: "Drawer Organizers",
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    inStock: true,
    stockCount: 78,
    rating: 4.8,
    reviewCount: 542,
    material: "BPA-Free Plastic with Rubber Base",
    dimensions: "16\" x 13\" x 2.5\"",
    weight: "0.8 kg",
    color: ["White", "Grey", "Black"],
    features: [
      "Adjustable compartments",
      "Non-slip rubber base",
      "Easy to clean",
      "Fits standard drawers",
      "Dishwasher safe"
    ],
    warranty: "2 Years",
    brand: "Hillton Baskets",
    tags: ["bestseller", "affordable"]
  },
  {
    id: "4",
    name: "Premium Tall Unit Pull-out System",
    slug: "premium-tall-unit-pull-out-system",
    description: "Complete tall unit solution with 5 pull-out baskets and side-mounted runners. Perfect for pantry storage with crystal-clear visibility and easy access. Heavy-duty construction for long-lasting use.",
    price: 15999,
    originalPrice: 21999,
    discount: 27,
    category: "Kitchen Baskets",
    subcategory: "Tall Unit Systems",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800"
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 156,
    material: "304 Stainless Steel",
    dimensions: "18\" x 20\" x 72\"",
    weight: "22 kg",
    color: ["Silver"],
    features: [
      "5 spacious pull-out baskets",
      "Soft-close telescopic runners",
      "Maximum load: 30kg per basket",
      "Complete installation kit",
      "Professional installation support"
    ],
    warranty: "7 Years",
    brand: "Hillton Baskets",
    tags: ["premium", "large-capacity"]
  },
  {
    id: "5",
    name: "Under Sink Storage Basket Set",
    slug: "under-sink-storage-basket-set",
    description: "Maximize under-sink space with this clever 2-tier sliding basket system. Features adjustable height and width to fit around plumbing. Rust-resistant coating for humid environments.",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    category: "Kitchen Baskets",
    subcategory: "Under Sink",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    inStock: true,
    stockCount: 56,
    rating: 4.4,
    reviewCount: 234,
    material: "Coated Steel Wire",
    dimensions: "14\" x 18\" x 14\"",
    weight: "3.5 kg",
    color: ["White", "Silver"],
    features: [
      "Adjustable width and height",
      "2-tier sliding design",
      "Rust-resistant coating",
      "Fits around plumbing",
      "Easy assembly"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["space-saver", "adjustable"]
  },
  {
    id: "6",
    name: "Magic Corner Pull-out System",
    slug: "magic-corner-pull-out-system",
    description: "Revolutionary corner solution that brings everything within reach. Features unique swing-out mechanism with 2 independent baskets. Make the most of difficult corner spaces in your modular kitchen.",
    price: 9999,
    originalPrice: 13999,
    discount: 29,
    category: "Kitchen Baskets",
    subcategory: "Corner Solutions",
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    inStock: true,
    stockCount: 24,
    rating: 4.6,
    reviewCount: 145,
    material: "Chrome-plated Steel",
    dimensions: "28\" x 28\" x 20\"",
    weight: "12 kg",
    color: ["Chrome"],
    features: [
      "Swing-out mechanism",
      "2 independent baskets",
      "Smooth ball-bearing runners",
      "Maximum visibility",
      "Space optimization"
    ],
    warranty: "5 Years",
    brand: "Hillton Baskets",
    tags: ["innovative", "premium"]
  },
  {
    id: "7",
    name: "Bottle Pull-out Organizer",
    slug: "bottle-pull-out-organizer",
    description: "Sleek and slim pull-out designed specifically for bottles and tall containers. Features adjustable dividers and smooth sliding mechanism. Perfect for oils, sauces, and beverages.",
    price: 4299,
    originalPrice: 5999,
    discount: 28,
    category: "Kitchen Organizers",
    subcategory: "Bottle Holders",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 42,
    rating: 4.5,
    reviewCount: 198,
    material: "Stainless Steel",
    dimensions: "6\" x 20\" x 28\"",
    weight: "4.8 kg",
    color: ["Silver", "Black"],
    features: [
      "Slim 6-inch width",
      "Adjustable bottle dividers",
      "Soft-close mechanism",
      "Holds up to 12 bottles",
      "Anti-rust coating"
    ],
    warranty: "4 Years",
    brand: "Hillton Baskets",
    tags: ["slim", "organizer"]
  },
  {
    id: "8",
    name: "Kitchen Thali Basket Organizer",
    slug: "kitchen-thali-basket-organizer",
    description: "Vertical plate and thali organizer with soft-close pull-out. Holds up to 20 plates safely with anti-slip silicone supports. Includes separate section for bowls and containers.",
    price: 5499,
    originalPrice: 7499,
    discount: 27,
    category: "Kitchen Organizers",
    subcategory: "Plate Organizers",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    inStock: true,
    stockCount: 38,
    rating: 4.7,
    reviewCount: 276,
    material: "Stainless Steel with Silicone Grips",
    dimensions: "18\" x 20\" x 24\"",
    weight: "6.5 kg",
    color: ["Silver"],
    features: [
      "Vertical plate storage",
      "Anti-slip silicone supports",
      "Holds 20+ plates",
      "Separate bowl section",
      "Soft-close system"
    ],
    warranty: "4 Years",
    brand: "Hillton Baskets",
    tags: ["organizer", "bestseller"]
  },
  {
    id: "9",
    name: "Wire Basket Set - 3 Piece",
    slug: "wire-basket-set-3-piece",
    description: "Versatile 3-piece wire basket set perfect for fruits, vegetables, and dry goods. Features stackable design, removable baskets, and powder-coated finish. Ideal for countertop or pantry use.",
    price: 2299,
    originalPrice: 3499,
    discount: 34,
    category: "Kitchen Organizers",
    subcategory: "Wire Baskets",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    inStock: true,
    stockCount: 92,
    rating: 4.3,
    reviewCount: 412,
    material: "Powder-coated Steel Wire",
    dimensions: "12\" x 12\" x 30\" (stacked)",
    weight: "2.8 kg",
    color: ["Black", "White", "Silver"],
    features: [
      "3 stackable baskets",
      "Removable design",
      "Powder-coated finish",
      "Ventilated storage",
      "Space-saving"
    ],
    warranty: "2 Years",
    brand: "Hillton Baskets",
    tags: ["affordable", "versatile"]
  },
  {
    id: "10",
    name: "Premium Pantry Pull-out 400mm",
    slug: "premium-pantry-pull-out-400mm",
    description: "Professional-grade 400mm pantry pull-out with 4 chrome-plated baskets. Features German-made soft-close runners and includes mounting brackets. Perfect for spice and grocery storage.",
    price: 11999,
    originalPrice: 16999,
    discount: 29,
    category: "Kitchen Baskets",
    subcategory: "Pantry Systems",
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 167,
    material: "Chrome-plated Steel",
    dimensions: "15.7\" x 20\" x 60\"",
    weight: "16 kg",
    color: ["Chrome"],
    features: [
      "German soft-close runners",
      "4 spacious baskets",
      "Professional installation kit",
      "Load capacity: 25kg",
      "Lifetime runner warranty"
    ],
    warranty: "5 Years (Lifetime on runners)",
    brand: "Hillton Baskets",
    tags: ["premium", "professional"]
  },
  {
    id: "11",
    name: "Cutlery Drawer Insert with Knife Block",
    slug: "cutlery-drawer-insert-knife-block",
    description: "Premium wooden cutlery organizer with integrated knife block. Features bamboo construction, 7 compartments, and soft velvet lining. Combines elegance with functionality.",
    price: 3799,
    originalPrice: 5499,
    discount: 31,
    category: "Kitchen Organizers",
    subcategory: "Drawer Organizers",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 64,
    rating: 4.6,
    reviewCount: 289,
    material: "Bamboo with Velvet Lining",
    dimensions: "18\" x 14\" x 3\"",
    weight: "1.5 kg",
    color: ["Natural Wood", "Dark Brown"],
    features: [
      "Bamboo construction",
      "Integrated knife block",
      "7 compartments",
      "Velvet-lined sections",
      "Eco-friendly"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["premium", "eco-friendly"]
  },
  {
    id: "12",
    name: "Tandem Box Drawer System - 450mm",
    slug: "tandem-box-drawer-system-450mm",
    description: "High-quality tandem box drawer system with Blumotion soft-close technology. Features full extension, side-mounted design, and premium powder-coated finish. Kitchen luxury redefined.",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    category: "Kitchen Baskets",
    subcategory: "Drawer Systems",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewCount: 142,
    material: "Powder-coated Steel",
    dimensions: "17.7\" x 20\" x 7\"",
    weight: "8.5 kg",
    color: ["Silver", "Anthracite"],
    features: [
      "Blumotion soft-close",
      "Full extension access",
      "Load capacity: 40kg",
      "Premium finish",
      "Easy installation"
    ],
    warranty: "6 Years",
    brand: "Hillton Baskets",
    tags: ["premium", "soft-close"]
  },
  {
    id: "13",
    name: "Spice Rack Pull-out - 150mm",
    slug: "spice-rack-pull-out-150mm",
    description: "Slim 150mm pull-out spice rack with 3 tiers. Perfect for narrow cabinets, holds up to 24 spice bottles. Features chrome-plated wire construction and smooth ball-bearing slides.",
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    category: "Kitchen Organizers",
    subcategory: "Spice Racks",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 71,
    rating: 4.4,
    reviewCount: 356,
    material: "Chrome Wire",
    dimensions: "5.9\" x 20\" x 24\"",
    weight: "3.2 kg",
    color: ["Chrome"],
    features: [
      "3-tier design",
      "Holds 24 spice bottles",
      "Ball-bearing slides",
      "Slim 150mm width",
      "Easy access"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["slim", "organizer"]
  },
  {
    id: "14",
    name: "Detergent Pull-out with Towel Rail",
    slug: "detergent-pull-out-towel-rail",
    description: "Under-sink pull-out designed for cleaning supplies with integrated towel rail. Features removable bucket holder, adjustable shelves, and soft-close mechanism. Keep cleaning essentials organized.",
    price: 4799,
    originalPrice: 6499,
    discount: 26,
    category: "Kitchen Baskets",
    subcategory: "Under Sink",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    inStock: true,
    stockCount: 47,
    rating: 4.5,
    reviewCount: 203,
    material: "Stainless Steel",
    dimensions: "14\" x 18\" x 20\"",
    weight: "5.5 kg",
    color: ["Silver"],
    features: [
      "Integrated towel rail",
      "Removable bucket holder",
      "Adjustable shelves",
      "Soft-close slides",
      "Rust-resistant"
    ],
    warranty: "4 Years",
    brand: "Hillton Baskets",
    tags: ["functional", "under-sink"]
  },
  {
    id: "15",
    name: "Glass and Mug Organizer Basket",
    slug: "glass-mug-organizer-basket",
    description: "Elegant pull-out organizer designed specifically for glassware and mugs. Features soft silicone cushioning, adjustable dividers, and smooth-glide mechanism. Protect your precious glassware.",
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    category: "Kitchen Organizers",
    subcategory: "Glass Holders",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    inStock: true,
    stockCount: 52,
    rating: 4.7,
    reviewCount: 187,
    material: "Stainless Steel with Silicone",
    dimensions: "18\" x 20\" x 16\"",
    weight: "4.8 kg",
    color: ["Silver", "Black"],
    features: [
      "Silicone cushioning",
      "Adjustable dividers",
      "Holds 16+ glasses",
      "Smooth-glide rails",
      "Protects glassware"
    ],
    warranty: "4 Years",
    brand: "Hillton Baskets",
    tags: ["premium", "protective"]
  },
  {
    id: "16",
    name: "Wicker Basket Set - Natural Finish",
    slug: "wicker-basket-set-natural-finish",
    description: "Handwoven wicker basket set of 4 pieces. Features natural rattan finish, fabric liners, and sturdy handles. Perfect for bread, fruits, and decorative storage. Adds rustic charm to your kitchen.",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    category: "Kitchen Organizers",
    subcategory: "Decorative Baskets",
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    inStock: true,
    stockCount: 85,
    rating: 4.2,
    reviewCount: 478,
    material: "Natural Rattan with Fabric Liner",
    dimensions: "Various sizes (8\" to 14\")",
    weight: "1.2 kg (set)",
    color: ["Natural", "Dark Brown", "White"],
    features: [
      "Handwoven rattan",
      "4-piece set",
      "Fabric liners included",
      "Sturdy handles",
      "Eco-friendly"
    ],
    warranty: "1 Year",
    brand: "Hillton Baskets",
    tags: ["affordable", "decorative", "eco-friendly"]
  },
  {
    id: "17",
    name: "Chrome Dish Rack Pull-out",
    slug: "chrome-dish-rack-pull-out",
    description: "Premium dish drying rack that pulls out for convenience. Features 2-tier design, drip tray, cutlery holder, and cup hooks. Keep your dishes organized and let them air-dry in style.",
    price: 6799,
    originalPrice: 9499,
    discount: 28,
    category: "Kitchen Organizers",
    subcategory: "Dish Racks",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 41,
    rating: 4.6,
    reviewCount: 224,
    material: "Chrome-plated Steel",
    dimensions: "18\" x 20\" x 16\"",
    weight: "5.2 kg",
    color: ["Chrome"],
    features: [
      "2-tier design",
      "Pull-out mechanism",
      "Drip tray included",
      "Cutlery holder",
      "Cup hooks"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["functional", "chrome"]
  },
  {
    id: "18",
    name: "Modular Tray Divider System",
    slug: "modular-tray-divider-system",
    description: "Adjustable tray and baking sheet organizer for base cabinets. Features 5 removable dividers, non-slip base, and expandable width. Keep trays, cutting boards, and baking sheets organized vertically.",
    price: 2499,
    originalPrice: 3799,
    discount: 34,
    category: "Kitchen Organizers",
    subcategory: "Tray Organizers",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    inStock: true,
    stockCount: 96,
    rating: 4.5,
    reviewCount: 367,
    material: "Coated Steel",
    dimensions: "12-18\" (expandable) x 20\" x 10\"",
    weight: "2.2 kg",
    color: ["White", "Grey"],
    features: [
      "5 removable dividers",
      "Expandable width",
      "Vertical storage",
      "Non-slip base",
      "Space-saving"
    ],
    warranty: "2 Years",
    brand: "Hillton Baskets",
    tags: ["adjustable", "organizer"]
  },
  {
    id: "19",
    name: "Luxury Soft-Close Waste Bin System",
    slug: "luxury-soft-close-waste-bin-system",
    description: "Premium dual-compartment waste system with soft-close lid and pull-out mechanism. Features 2x15L bins, odor-seal lid, and smooth slides. Perfect for segregating waste in modern kitchens.",
    price: 8499,
    originalPrice: 11999,
    discount: 29,
    category: "Kitchen Baskets",
    subcategory: "Waste Systems",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 33,
    rating: 4.8,
    reviewCount: 198,
    material: "Stainless Steel with Plastic Bins",
    dimensions: "18\" x 18\" x 16\"",
    weight: "7.5 kg",
    color: ["Silver", "Black"],
    features: [
      "Dual 15L compartments",
      "Soft-close lid",
      "Pull-out mechanism",
      "Odor-seal design",
      "Easy bin removal"
    ],
    warranty: "5 Years",
    brand: "Hillton Baskets",
    tags: ["premium", "waste-management"]
  },
  {
    id: "20",
    name: "Kitchen Trolley with Wire Baskets",
    slug: "kitchen-trolley-wire-baskets",
    description: "Mobile kitchen trolley with 3 large wire baskets and butcher block top. Features heavy-duty locking casters, towel bar, and wine bottle holder. Extra workspace and storage combined.",
    price: 9999,
    originalPrice: 13999,
    discount: 29,
    category: "Kitchen Organizers",
    subcategory: "Kitchen Trolleys",
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    inStock: true,
    stockCount: 27,
    rating: 4.7,
    reviewCount: 156,
    material: "Wood Top with Steel Frame",
    dimensions: "20\" x 16\" x 36\"",
    weight: "15 kg",
    color: ["Natural Wood", "Black Frame"],
    features: [
      "Butcher block top",
      "3 wire baskets",
      "Locking casters",
      "Towel bar",
      "Wine bottle holder"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["mobile", "versatile"]
  },
  {
    id: "21",
    name: "Hanging Pot and Pan Organizer",
    slug: "hanging-pot-pan-organizer",
    description: "Ceiling or wall-mounted pot rack with 10 hooks. Features industrial-style black finish, solid iron construction, and includes mounting hardware. Free up cabinet space and display cookware.",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    category: "Kitchen Organizers",
    subcategory: "Pot Racks",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
    ],
    inStock: true,
    stockCount: 58,
    rating: 4.4,
    reviewCount: 267,
    material: "Iron",
    dimensions: "36\" x 18\" x 2\"",
    weight: "6.8 kg",
    color: ["Black", "Bronze"],
    features: [
      "10 S-hooks included",
      "Wall or ceiling mount",
      "Industrial design",
      "Solid iron construction",
      "Complete hardware"
    ],
    warranty: "3 Years",
    brand: "Hillton Baskets",
    tags: ["hanging", "industrial"]
  },
  {
    id: "22",
    name: "Premium Soft-Close Base Unit",
    slug: "premium-soft-close-base-unit",
    description: "Complete base unit with 2 pull-out baskets and soft-close technology. Features German-engineered runners, stainless steel construction, and maximum stability. The ultimate kitchen upgrade.",
    price: 12999,
    originalPrice: 17999,
    discount: 28,
    category: "Kitchen Baskets",
    subcategory: "Base Units",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800"
    ],
    inStock: true,
    stockCount: 19,
    rating: 4.9,
    reviewCount: 134,
    material: "304 Stainless Steel",
    dimensions: "18\" x 22\" x 24\"",
    weight: "18 kg",
    color: ["Silver"],
    features: [
      "German-engineered runners",
      "2 spacious baskets",
      "Soft-close technology",
      "Load capacity: 35kg",
      "Professional grade"
    ],
    warranty: "7 Years",
    brand: "Hillton Baskets",
    tags: ["premium", "professional", "bestseller"]
  }
];

export const categories = [
  {
    id: "1",
    name: "Kitchen Baskets",
    slug: "kitchen-baskets",
    description: "Premium pull-out systems and storage baskets",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    productCount: 12
  },
  {
    id: "2",
    name: "Kitchen Organizers",
    slug: "kitchen-organizers",
    description: "Smart organization solutions for modern kitchens",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400",
    productCount: 10
  },
  {
    id: "3",
    name: "Corner Solutions",
    slug: "corner-solutions",
    description: "Maximize corner space efficiency",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
    productCount: 2
  },
  {
    id: "4",
    name: "Drawer Systems",
    slug: "drawer-systems",
    description: "Premium drawer solutions with soft-close",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=400",
    productCount: 3
  }
];
