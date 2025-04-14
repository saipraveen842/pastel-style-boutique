
import { supabase } from "@/integrations/supabase/client";

export const paymentService = {
  async createPayment(orderId: string, amount: number) {
    try {
      // Create Razorpay order using our Edge Function
      const { data: razorpayOrder, error: razorpayError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: { orderId, amount }
        }
      );

      if (razorpayError) throw razorpayError;

      // Create payment record in our database
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: orderId,
          razorpay_order_id: razorpayOrder.id,
          amount,
          currency: 'INR',
          status: 'pending'
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      return {
        payment,
        razorpayOrder
      };
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  async updatePaymentStatus(razorpayPaymentId: string, razorpayOrderId: string, status: string) {
    try {
      const { error } = await supabase
        .from('payments')
        .update({
          razorpay_payment_id: razorpayPaymentId,
          status,
          updated_at: new Date().toISOString()
        })
        .eq('razorpay_order_id', razorpayOrderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }
};
