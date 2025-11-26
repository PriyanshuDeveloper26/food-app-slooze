import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      restaurant: null,
      
      addItem: (item, restaurant) => {
        const state = get();
        
        // If cart has items from different restaurant, return false to indicate rejection
        if (state.restaurant && state.restaurant._id !== restaurant._id) {
          return false;
        }
        
        const existingItem = state.items.find(i => i._id === item._id);
        
        if (existingItem) {
          set({
            items: state.items.map(i =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            restaurant
          });
        } else {
          set({
            items: [...state.items, { ...item, quantity: 1, restaurantId: restaurant._id }],
            restaurant
          });
        }
        return true;
      },
      
      removeItem: (itemId) => {
        const state = get();
        const newItems = state.items.filter(i => i._id !== itemId);
        set({ 
          items: newItems,
          restaurant: newItems.length === 0 ? null : state.restaurant
        });
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
        } else {
          set({
            items: get().items.map(i =>
              i._id === itemId ? { ...i, quantity } : i
            )
          });
        }
      },
      
      clearCart: () => set({ items: [], restaurant: null }),
      
      // Validate cart integrity - remove items from different restaurants
      validateCart: () => {
        const state = get();
        if (!state.restaurant || state.items.length === 0) return;
        
        const validItems = state.items.filter(item => 
          !item.restaurantId || item.restaurantId === state.restaurant._id
        );
        
        if (validItems.length !== state.items.length) {
          set({ items: validItems });
        }
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
