export type Store = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  sales: number;
  isNew: boolean;
  isUpcoming: boolean;
  isStarred: boolean;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  storeId: string;
  rating: number;
  sales: number;
  category: string;
  createdAt: string;
};

export const stores: Store[] = [
  {
    id: '1',
    name: 'Tech Haven',
    description: 'The ultimate destination for tech enthusiasts. From cutting-edge gadgets to everyday essentials.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2940&auto=format&fit=crop',
    rating: 4.8,
    sales: 1250,
    isNew: false,
    isUpcoming: false,
    isStarred: true,
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Fashion Forward',
    description: 'Trendsetting clothing and accessories for the modern individual.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2940&auto=format&fit=crop',
    rating: 4.6,
    sales: 956,
    isNew: false,
    isUpcoming: false,
    isStarred: true,
    createdAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Home Harmony',
    description: 'Transform your living spaces with our curated collection of home décor and furniture.',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2942&auto=format&fit=crop',
    rating: 4.7,
    sales: 820,
    isNew: false,
    isUpcoming: false,
    isStarred: true,
    createdAt: '2023-03-10',
  },
  {
    id: '4',
    name: 'Wellness World',
    description: 'Holistic health products for mind, body, and soul.',
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2878&auto=format&fit=crop',
    rating: 4.9,
    sales: 1510,
    isNew: false,
    isUpcoming: false,
    isStarred: false,
    createdAt: '2023-04-05',
  },
  {
    id: '5',
    name: 'Gourmet Galaxy',
    description: 'Artisanal foods and gourmet ingredients from around the world.',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2880&auto=format&fit=crop',
    rating: 4.7,
    sales: 780,
    isNew: false,
    isUpcoming: false,
    isStarred: false,
    createdAt: '2023-05-22',
  },
  {
    id: '6',
    name: 'Novel Nook',
    description: 'A paradise for book lovers with an extensive collection of titles across genres.',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=2942&auto=format&fit=crop',
    rating: 4.5,
    sales: 650,
    isNew: true,
    isUpcoming: false,
    isStarred: false,
    createdAt: '2024-02-12',
  },
  {
    id: '7',
    name: 'Urban Garden',
    description: 'Everything you need to create and maintain your perfect green space.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2940&auto=format&fit=crop',
    rating: 4.3,
    sales: 420,
    isNew: true,
    isUpcoming: false,
    isStarred: false,
    createdAt: '2024-01-30',
  },
  {
    id: '8',
    name: 'Pet Paradise',
    description: 'Premium products for your furry, feathered, and finned family members.',
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=2874&auto=format&fit=crop',
    rating: 4.8,
    sales: 890,
    isNew: true,
    isUpcoming: false,
    isStarred: false,
    createdAt: '2024-03-05',
  },
  {
    id: '9',
    name: 'Artistic Avenue',
    description: 'Art supplies and creative tools for artists of all levels.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2940&auto=format&fit=crop',
    rating: 4.4,
    sales: 560,
    isNew: false,
    isUpcoming: true,
    isStarred: false,
    createdAt: '2025-01-01',
  },
  {
    id: '10',
    name: 'Outdoor Odyssey',
    description: 'Gear and apparel for unforgettable adventures in nature.',
    image: 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=2940&auto=format&fit=crop',
    rating: 4.6,
    sales: 720,
    isNew: false,
    isUpcoming: true,
    isStarred: false,
    createdAt: '2025-02-15',
  },
];

// Mock products for the stores
export const products: Product[] = [
  {
    id: '101',
    name: 'Premium Wireless Headphones',
    description: 'Immersive sound quality with noise cancellation technology.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2940&auto=format&fit=crop',
    ],
    storeId: '1',
    rating: 4.7,
    sales: 320,
    category: 'Electronics',
    createdAt: '2023-06-15',
  },
  // Add more products as needed
];

// Helper functions to work with mock data
export const getStoreById = (id: string): Store | undefined => {
  return stores.find(store => store.id === id);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByStoreId = (storeId: string): Product[] => {
  return products.filter(product => product.storeId === storeId);
};

export const getStarredStores = (): Store[] => {
  return stores.filter(store => store.isStarred);
};

export const getHighRatedStores = (): Store[] => {
  return [...stores].sort((a, b) => b.rating - a.rating).slice(0, 5);
};

export const getNewStores = (): Store[] => {
  return stores.filter(store => store.isNew);
};

export const getUpcomingStores = (): Store[] => {
  return stores.filter(store => store.isUpcoming);
};