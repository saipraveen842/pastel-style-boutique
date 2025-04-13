
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StyleBot from '@/components/StyleBot';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax - discount;

  const moveToWishlist = (id: number) => {
    // In a real app, this would add to wishlist in the database/state
    removeFromCart(id);
    toast({
      title: "Added to wishlist",
      description: "The item has been moved to your wishlist",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(subtotal * 0.1);
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-8">Your Shopping Bag</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <ShoppingBag className="mx-auto h-16 w-16 text-pastel-pink mb-4" />
              <h2 className="text-2xl font-medium mb-4">Your bag is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your bag yet. Explore our collections to find your perfect style.
              </p>
              <Link to="/shop">
                <Button className="btn-pastel px-8 py-6 bg-primary text-white hover:bg-primary/90">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl pastel-shadow p-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-pastel-pink/10 last:border-b-0">
                      <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <span className="font-semibold text-primary-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-1">
                          <span className="mr-4">Size: {item.size}</span>
                          <span>Color: {item.color}</span>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center border border-pastel-pink/30 rounded-full">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-pastel-pink/10 rounded-l-full"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-pastel-pink/10 rounded-r-full"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <button 
                              onClick={() => moveToWishlist(item.id)}
                              className="flex items-center text-muted-foreground hover:text-primary-foreground transition-colors"
                            >
                              <Heart size={14} className="mr-1" />
                              Save for later
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center text-muted-foreground hover:text-primary-foreground transition-colors"
                            >
                              <X size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl pastel-shadow p-6 sticky top-20">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-pastel-pink/20 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary-foreground">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm text-muted-foreground mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-grow p-2 border border-pastel-pink/30 rounded-l-lg focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Try code: WELCOME10 for 10% off
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90 py-6 mb-4"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  <Link to="/shop" className="block text-center text-sm text-primary-foreground hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <StyleBot />
      <Footer />
    </div>
  );
};

export default Cart;
