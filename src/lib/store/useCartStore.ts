import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeId: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  hydrated: boolean;
  setHydrated: (state: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,

      setHydrated: (state: boolean) => {
        set({ hydrated: state });
      },

      addItem: (item: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () => {
        if (!get().hydrated) return 0;
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        if (!get().hydrated) return 0;
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// This handles client-side hydration
if (typeof window !== 'undefined') {
  // This runs only on client
  useCartStore.persist.onFinishHydration(() => {
    useCartStore.setState({ hydrated: true });
  });
}