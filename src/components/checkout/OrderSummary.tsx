
import React from 'react';
import { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary = ({ items, subtotal, shipping, tax, total }: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-xl pastel-shadow p-6 sticky top-20">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <div className="text-xs text-muted-foreground">
                <span>Size: {item.size}</span> · <span>Color: {item.color}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs">Qty: {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-pastel-pink/10 pt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-pastel-pink/10 pt-3 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary-foreground">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
