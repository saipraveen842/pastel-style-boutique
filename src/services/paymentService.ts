
import { supabase } from "@/integrations/supabase/client";
import { Payment } from "@/types/supabase";

export const paymentService = {
  async createPayment(orderId: string, amount: number) {
    try {
      console.log("Creating payment for order:", orderId, "with amount:", amount);
      // Create Razorpay order using our Edge Function
      const { data: razorpayOrder, error: razorpayError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: { orderId, amount }
        }
      );

      if (razorpayError) {
        console.error("Error creating Razorpay order:", razorpayError);
        throw razorpayError;
      }
      
      console.log("Razorpay order created:", razorpayOrder);

      // Create payment record in our database
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert([{
          order_id: orderId,
          razorpay_order_id: razorpayOrder.id,
          amount: amount,
          currency: 'INR',
          status: 'pending'
        }])
        .select()
        .single();

      if (paymentError) {
        console.error("Error creating payment record:", paymentError);
        throw paymentError;
      }
      
      console.log("Payment recor created:", payment);

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
      console.log("Updating payment status:", 
        { razorpayPaymentId, razorpayOrderId, status });
        
      const { data, error } = await supabase
        .from('payments')
        .update({ 
          razorpay_payment_id: razorpayPaymentId,
          status: status,
        })
        .eq('razorpay_order_id', razorpayOrderId)
        .select();

      if (error) {
        console.error("Error updating payment status:", error);
        throw error;
      }
      
      console.log("Payment status updated successfully");
      return data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }
};
