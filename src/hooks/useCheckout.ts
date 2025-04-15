
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { addressService } from '@/services/addressService';
import { orderService } from '@/services/orderService';
import { paymentService } from '@/services/paymentService';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid ZIP code is required" }),
  cardNumber: z.string().min(16, { message: "Valid card number is required" }),
  cardName: z.string().min(2, { message: "Name on card is required" }),
  expDate: z.string().min(5, { message: "Expiration date is required" }),
  cvv: z.string().min(3, { message: "CVV is required" }),
});

export type CheckoutFormValues = z.infer<typeof formSchema>;

export const useCheckout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const { user } = useAuth();
  
  const [addressId, setAddressId] = useState<string | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (step === 'shipping' && user?.email) {
      form.setValue('email', user.email);
      Object.keys(form.formState.touchedFields).forEach((fieldName) => {
        form.trigger(fieldName as keyof CheckoutFormValues);
      });
    }
  }, [step, user, form]);

  useEffect(() => {
    const loadAddresses = async () => {
      if (!user) return;
      
      try {
        setLoadingAddresses(true);
        const addresses = await addressService.getUserAddresses();
        setSavedAddresses(addresses);
        
        const defaultAddress = addresses.find(addr => addr.is_default);
        if (defaultAddress) {
          setAddressId(defaultAddress.id);
          form.setValue('address', defaultAddress.street);
          form.setValue('city', defaultAddress.city);
          form.setValue('state', defaultAddress.state);
          form.setValue('zipCode', defaultAddress.zip_code);
          form.trigger(['address', 'city', 'state', 'zipCode']);
        }
      } catch (error) {
        console.error('Error loading addresses:', error);
      } finally {
        setLoadingAddresses(false);
      }
    };
    
    loadAddresses();
  }, [user, form]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      const razorpayLoaded = await initializeRazorpay();
      if (!razorpayLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }
      
      const order = await orderService.createOrder(addressId!, items);
      const res = await paymentService.createPayment(
        order.id,
        Math.round(total * 100)
      );

      const options = {
        key: "rzp_test_WyK93y9mvps7SN",
        amount: res.razorpayOrder.amount,
        currency: res.razorpayOrder.currency || "INR",
        name: "E-Commerce Store",
        description: "Order Payment",
        order_id: res.razorpayOrder.id,
        handler: async function(response: any) {
          try {
            await paymentService.updatePaymentStatus(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              'completed'
            );
            
            toast({
              title: "Payment Successful",
              description: "Your order has been placed successfully!",
            });
            
            clearCart();
            setStep('confirmation');
          } catch (error) {
            console.error('Error processing payment:', error);
            toast({
              title: "Payment Error",
              description: "There was an error processing your payment. Please try again.",
              variant: "destructive",
            });
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${form.getValues('firstName')} ${form.getValues('lastName')}`,
          email: form.getValues('email'),
          contact: form.getValues('phone')
        },
        theme: {
          color: "#f43f5e",
        },
        modal: {
          ondismiss: function() {
            toast({
              title: "Payment Cancelled",
              description: "You have cancelled the payment. Your order is still pending.",
            });
            setIsProcessing(false);
          }
        }
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast({
        title: "Payment Error",
        description: "There was an error initializing the payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const isShippingFormValid = () => {
    const { firstName, lastName, email, phone, address, city, state, zipCode } = form.getValues();
    return (
      firstName?.length >= 2 &&
      lastName?.length >= 2 &&
      email?.includes('@') &&
      phone?.length >= 10 &&
      address?.length >= 5 &&
      city?.length >= 2 &&
      state?.length >= 2 &&
      zipCode?.length >= 5
    );
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (step === 'shipping') {
      try {
        const isValid = await form.trigger([
          'firstName', 'lastName', 'email', 'phone', 
          'address', 'city', 'state', 'zipCode'
        ]);
        
        if (!isValid) {
          toast({
            title: "Please check your information",
            description: "Some required fields are missing or invalid.",
            variant: "destructive",
          });
          return;
        }
        
        if (user && !addressId) {
          try {
            setIsProcessing(true);
            const newAddress = await addressService.createAddress({
              street: data.address,
              city: data.city,
              state: data.state,
              zip_code: data.zipCode,
              is_default: savedAddresses.length === 0
            });
            
            if (newAddress) {
              setAddressId(newAddress.id);
              toast({
                title: 'Address saved',
                description: 'Your address has been saved for future use.',
              });
            }
          } catch (error) {
            console.error('Error saving address:', error);
            toast({
              title: 'Error',
              description: 'Failed to save your address, but you can continue checkout.',
              variant: 'destructive',
            });
          } finally {
            setIsProcessing(false);
          }
        }
        
        setStep('payment');
      } catch (error) {
        console.error('Error in shipping step:', error);
        toast({
          title: "Error",
          description: "There was an error processing your shipping information.",
          variant: "destructive",
        });
      }
    } else if (step === 'payment') {
      await handlePayment();
    }
  };

  const goBack = () => {
    if (step === 'payment') {
      setStep('shipping');
    } else if (step === 'confirmation') {
      navigate('/');
    } else {
      navigate('/cart');
    }
  };

  return {
    form,
    step,
    isProcessing,
    items,
    subtotal,
    shipping,
    tax,
    total,
    loadingAddresses,
    isShippingFormValid,
    onSubmit,
    goBack
  };
};
