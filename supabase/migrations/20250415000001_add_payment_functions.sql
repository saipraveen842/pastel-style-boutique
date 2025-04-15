
-- Function to create a payment
CREATE OR REPLACE FUNCTION public.create_payment(
  p_order_id UUID,
  p_razorpay_order_id TEXT,
  p_amount NUMERIC,
  p_currency TEXT DEFAULT 'INR',
  p_status TEXT DEFAULT 'pending'
)
RETURNS JSON AS $$
DECLARE
  v_payment_id UUID;
  v_result JSON;
BEGIN
  INSERT INTO public.payments (
    order_id,
    razorpay_order_id,
    amount,
    currency,
    status
  ) VALUES (
    p_order_id,
    p_razorpay_order_id,
    p_amount,
    p_currency,
    p_status
  )
  RETURNING id INTO v_payment_id;
  
  SELECT row_to_json(p) INTO v_result
  FROM (
    SELECT * FROM public.payments WHERE id = v_payment_id
  ) p;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update payment status
CREATE OR REPLACE FUNCTION public.update_payment_status(
  p_razorpay_payment_id TEXT,
  p_razorpay_order_id TEXT,
  p_status TEXT DEFAULT 'completed'
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.payments
  SET 
    razorpay_payment_id = p_razorpay_payment_id,
    status = p_status,
    updated_at = now()
  WHERE razorpay_order_id = p_razorpay_order_id;
  
  -- Also update the order payment_status
  UPDATE public.orders
  SET 
    payment_status = p_status,
    updated_at = now()
  WHERE id = (
    SELECT order_id 
    FROM public.payments 
    WHERE razorpay_order_id = p_razorpay_order_id
  );
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
