
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const CartButton = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative p-2 hover:bg-pastel-pink/10 rounded-full transition-colors">
      <ShoppingBag size={20} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs bg-pastel-pink text-white rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
