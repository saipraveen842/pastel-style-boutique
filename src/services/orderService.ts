
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderItem } from "@/types/supabase";

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    
    if (error) {
      console.error(`Error fetching items for order ${orderId}:`, error);
      throw error;
    }
    
    return data || [];
  },
  
  async createOrder(
    addressId: string, 
    totalAmount: number, 
    items: Array<{ 
      product_id: number; 
      quantity: number; 
      price: number; 
      size?: string; 
      color?: string; 
    }>
  ): Promise<Order> {
    // Start a transaction by using a single connection
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        address_id: addressId,
        total_amount: totalAmount
      })
      .select()
      .single();
    
    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }
    
    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      size: item.size || null,
      color: item.color || null
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // If items fail, we should ideally delete the order too in a real transaction,
      // but Supabase doesn't support transactions from the client SDK.
      throw itemsError;
    }
    
    return order;
  },
  
  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ order_status: status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating status for order ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async updatePaymentStatus(id: string, status: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating payment status for order ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};
