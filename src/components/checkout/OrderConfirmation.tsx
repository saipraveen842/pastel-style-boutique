
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <div className="h-16 w-16 bg-pastel-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check size={32} className="text-pastel-pink" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
      <p className="text-muted-foreground mb-6">
        Thank you for your purchase. Your order has been confirmed and will be shipped soon.
      </p>
      <p className="font-medium mb-8">Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
      
      <Button onClick={() => navigate('/')} className="bg-[#f43f5e] text-white hover:bg-[#e11d48] font-semibold px-8">
        Continue Shopping
      </Button>
    </div>
  );
};

export default OrderConfirmation;
