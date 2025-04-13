
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
  
  async getOrderById(orderId: string): Promise<{order: Order, items: OrderItem[]} | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    // Fetch the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.user.id)
      .maybeSingle();
    
    if (orderError || !order) {
      console.error('Error fetching order:', orderError);
      throw orderError;
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
  
  async createOrder(addressId: string, cartItems: CartItem[]): Promise<Order | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
    
    // Start a transaction by inserting the order first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.user.id,
        address_id: addressId,
        total_amount: totalAmount
      })
      .select()
      .single();
    
    if (orderError || !order) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }
    
    // Then insert all order items
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
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }
    
    return order;
  }
};
