import { supabase } from "@/integrations/supabase/client";
import { Order, OrderItem } from "@/types/supabase";
import { CartItem } from "@/contexts/CartContext";

export const orderService = {
  async getUserOrders(): Promise<Order[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getOrderById(orderId: string): Promise<{ order: Order; items: OrderItem[] }> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }
    
    // Fetch the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.user.id)
      .single();
    
    if (orderError) {
      console.error('Error fetching order:', orderError);
      throw orderError;
    }
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    // Fetch the order items
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    
    if (itemsError) {
      console.error('Error fetching order items:', itemsError);
      throw itemsError;
    }
    
    return {
      order,
      items: items || []
    };
  },
  
  async createOrder(addressId: string, cartItems: CartItem[]): Promise<Order> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }
    
    if (!addressId) {
      throw new Error('Address ID is required');
    }
    
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart is empty');
    }
    
    // Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Start a transaction
    // Note: Supabase doesn't directly support transactions from the client library,
    // so we're doing multiple operations and manually handling failures
    
    try {
      // 1. Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.user.id,
          address_id: addressId,
          total_amount: totalAmount,
          payment_status: 'pending',
          order_status: 'processing'
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      if (!order) throw new Error('Failed to create order');
      
      // 2. Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        // If there's an error with order items, delete the order to keep things consistent
        await supabase.from('orders').delete().eq('id', order.id);
        throw itemsError;
      }
      
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};
