
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
      const { data: payment, error: paymentError } = await supabase.rpc(
        'create_payment',
        {
          p_order_id: orderId,
          p_razorpay_order_id: razorpayOrder.id,
          p_amount: amount,
          p_currency: 'INR',
          p_status: 'pending'
        }
      );

      if (paymentError) {
        console.error("Error creating payment record:", paymentError);
        throw paymentError;
      }
      
      console.log("Payment record created:", payment);

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
        
      const { data, error } = await supabase.rpc(
        'update_payment_status',
        {
          p_razorpay_payment_id: razorpayPaymentId,
          p_razorpay_order_id: razorpayOrderId,
          p_status: status
        }
      );

      if (error) {
        console.error("Error updating payment status:", error);
        throw error;
      }
      
      console.log("Payment status updated successfully");
      return true;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }
};
