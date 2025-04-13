
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image: string;
  category: string | null;
  is_new: boolean;
  is_sale: boolean;
  is_featured: boolean;
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
