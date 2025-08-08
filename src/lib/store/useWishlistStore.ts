import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: string;
  name: string;
  image: string;
  price?: number;
  type: 'product' | 'store';
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  getItemsByType: (type: 'product' | 'store') => WishlistItem[];
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const currentItems = get().items;
        if (!currentItems.some((i) => i.id === item.id)) {
          set({ items: [...currentItems, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      hasItem: (id) => {
        return get().items.some((item) => item.id === id);
      },

      getItemsByType: (type) => {
        return get().items.filter((item) => item.type === type);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);