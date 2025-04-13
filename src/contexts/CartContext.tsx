import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantityChange: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart items from localStorage or Supabase when component mounts
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // Load cart from Supabase if user is logged in
        try {
          // First, check if we have a cart table. If not, we'll just use localStorage.
          const { data: existingCarts, error: checkError } = await supabase
            .from('carts')
            .select('*')
            .eq('user_id', user.id);
            
          if (checkError) {
            console.error('Error checking cart in Supabase:', checkError);
            loadFromLocalStorage();
            return;
          }
            
          if (existingCarts && existingCarts.length > 0) {
            const cartData = existingCarts[0].items;
            setCartItems(cartData);
          } else {
            loadFromLocalStorage();
          }
        } catch (error) {
          console.error('Error loading cart from Supabase:', error);
          loadFromLocalStorage();
        }
      } else {
        loadFromLocalStorage();
      }
    };
    
    const loadFromLocalStorage = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          setCartItems([]);
        }
      }
    };
    
    loadCart();
  }, [user]);
  
  // Save cart items to localStorage and Supabase (if user is logged in)
  useEffect(() => {
    // Always save to localStorage as a fallback
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // If user is logged in, sync with Supabase
    const syncWithSupabase = async () => {
      if (!user) return;
      
      try {
        // Check if we can access the carts table (it might not exist in all implementations)
        const { error: checkError } = await supabase
          .from('carts')
          .select('id')
          .limit(1);
          
        if (checkError) {
          // If we can't access the table, just use localStorage only
          return;
        }
        
        // Check if user already has a cart
        const { data: existingCart, error: getError } = await supabase
          .from('carts')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (getError && getError.code !== 'PGRST116') {
          console.error('Error checking existing cart:', getError);
          return;
        }
        
        if (existingCart) {
          // Update existing cart
          const { error: updateError } = await supabase
            .from('carts')
            .update({ items: cartItems, updated_at: new Date().toISOString() })
            .eq('id', existingCart.id);
            
          if (updateError) {
            console.error('Error updating cart in Supabase:', updateError);
          }
        } else {
          // Create new cart
          const { error: insertError } = await supabase
            .from('carts')
            .insert({ user_id: user.id, items: cartItems });
            
          if (insertError) {
            console.error('Error creating cart in Supabase:', insertError);
          }
        }
      } catch (error) {
        console.error('Error syncing cart with Supabase:', error);
      }
    };
    
    // Only run this if we have items in the cart and after initial render
    if (cartItems.length > 0) {
      syncWithSupabase();
    }
  }, [cartItems, user]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color);

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
        return newItems;
      } else {
        return [...prevItems, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update quantity of an item
  const updateQuantity = (id: number, quantityChange: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + quantityChange;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
