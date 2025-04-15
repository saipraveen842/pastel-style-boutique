
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image: string;
  category: string | null;
  is_new: boolean;
  is_featured: boolean;
  is_sale: boolean;
  sale_price: number | null;
  colors: string[];
  sizes: string[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  address_id: string;
  total_amount: number;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  size: string | null;
  color: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
}

// Add function declarations to fix type errors
export interface SupabaseFunctions {
  create_payment: (args: {
    p_order_id: string;
    p_razorpay_order_id: string;
    p_amount: number;
    p_currency: string;
    p_status: string;
  }) => Payment;
  
  update_payment_status: (args: {
    p_razorpay_payment_id: string;
    p_razorpay_order_id: string;
    p_status: string;
  }) => boolean;
  
  delete_user: () => void;
}
