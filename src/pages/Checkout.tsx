import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MapPin, CreditCard, ShoppingBag, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/back-button';

// Form validation schema
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

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  // Calculate order summary
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardName: '',
      expDate: '',
      cvv: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      // In a real application, this would handle payment processing
      // and send the order to the backend
      toast({
        title: "Order placed successfully!",
        description: "Your order has been confirmed and will be shipped soon.",
      });
      setStep('confirmation');
      clearCart();
    }
  };

  // Go back to previous step
  const goBack = () => {
    if (step === 'payment') {
      setStep('shipping');
    } else if (step === 'confirmation') {
      navigate('/');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Back button */}
          {step !== 'confirmation' && (
            <div className="mb-4">
              <BackButton />
            </div>
          )}
          
          {/* Checkout progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`flex flex-col items-center ${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'text-pastel-pink' : 'text-muted-foreground'}`}>
                <div className="w-8 h-8 rounded-full bg-pastel-pink text-white flex items-center justify-center mb-1">
                  <MapPin size={16} />
                </div>
                <span className="text-xs">Shipping</span>
              </div>
              <div className={`w-20 h-0.5 ${step === 'payment' || step === 'confirmation' ? 'bg-pastel-pink' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step === 'payment' || step === 'confirmation' ? 'text-pastel-pink' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full ${step === 'payment' || step === 'confirmation' ? 'bg-pastel-pink text-white' : 'bg-gray-200 text-muted-foreground'} flex items-center justify-center mb-1`}>
                  <CreditCard size={16} />
                </div>
                <span className="text-xs">Payment</span>
              </div>
              <div className={`w-20 h-0.5 ${step === 'confirmation' ? 'bg-pastel-pink' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step === 'confirmation' ? 'text-pastel-pink' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full ${step === 'confirmation' ? 'bg-pastel-pink text-white' : 'bg-gray-200 text-muted-foreground'} flex items-center justify-center mb-1`}>
                  <Check size={16} />
                </div>
                <span className="text-xs">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl pastel-shadow p-6">
                {step === 'shipping' && (
                  <>
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Phone Number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Street Address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="ZIP Code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" onClick={goBack} className="flex items-center">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Cart
                          </Button>
                          <Button type="submit" className="btn-pastel">
                            Continue to Payment
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="XXXX XXXX XXXX XXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name on Card</FormLabel>
                              <FormControl>
                                <Input placeholder="Name on Card" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiration Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="XXX" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" onClick={goBack} className="flex items-center">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Shipping
                          </Button>
                          <Button type="submit" className="btn-pastel">
                            Place Order
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </>
                )}

                {step === 'confirmation' && (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 bg-pastel-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-pastel-pink" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                    </p>
                    <p className="font-medium mb-8">Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                    
                    <Button onClick={() => navigate('/')} className="btn-pastel px-8">
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl pastel-shadow p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
