
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/back-button';
import { useCheckout } from '@/hooks/useCheckout';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    form,
    step,
    isProcessing,
    items,
    subtotal,
    shipping,
    tax,
    total,
    isShippingFormValid,
    onSubmit,
    goBack
  } = useCheckout();

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
            <p className="mb-6">You don't have any items in your cart to checkout.</p>
            <Button onClick={() => navigate('/shop')} className="bg-primary text-white hover:bg-primary/90">
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4">
          {step !== 'confirmation' && (
            <div className="mb-4">
              <BackButton />
            </div>
          )}
          
          <CheckoutHeader currentStep={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl pastel-shadow p-6">
                {step === 'shipping' && (
                  <ShippingForm
                    form={form}
                    isProcessing={isProcessing}
                    onSubmit={onSubmit}
                    goBack={goBack}
                    isShippingFormValid={isShippingFormValid}
                  />
                )}

                {step === 'payment' && (
                  <PaymentForm
                    form={form}
                    isProcessing={isProcessing}
                    onSubmit={onSubmit}
                    goBack={goBack}
                  />
                )}

                {step === 'confirmation' && <OrderConfirmation />}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
