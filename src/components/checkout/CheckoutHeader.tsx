
import React from 'react';
import { MapPin, CreditCard, Check } from 'lucide-react';

interface CheckoutHeaderProps {
  currentStep: 'shipping' | 'payment' | 'confirmation';
}

const CheckoutHeader = ({ currentStep }: CheckoutHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        <div className={`flex flex-col items-center ${currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation' ? 'text-pastel-pink' : 'text-muted-foreground'}`}>
          <div className="w-8 h-8 rounded-full bg-pastel-pink text-white flex items-center justify-center mb-1">
            <MapPin size={16} />
          </div>
          <span className="text-xs">Shipping</span>
        </div>
        <div className={`w-20 h-0.5 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-pastel-pink' : 'bg-gray-200'}`}></div>
        <div className={`flex flex-col items-center ${currentStep === 'payment' || currentStep === 'confirmation' ? 'text-pastel-pink' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-pastel-pink text-white' : 'bg-gray-200 text-muted-foreground'} flex items-center justify-center mb-1`}>
            <CreditCard size={16} />
          </div>
          <span className="text-xs">Payment</span>
        </div>
        <div className={`w-20 h-0.5 ${currentStep === 'confirmation' ? 'bg-pastel-pink' : 'bg-gray-200'}`}></div>
        <div className={`flex flex-col items-center ${currentStep === 'confirmation' ? 'text-pastel-pink' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full ${currentStep === 'confirmation' ? 'bg-pastel-pink text-white' : 'bg-gray-200 text-muted-foreground'} flex items-center justify-center mb-1`}>
            <Check size={16} />
          </div>
          <span className="text-xs">Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
