
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/back-button';
import { useAuth } from '@/hooks/useAuth';
import { orderService } from '@/services/orderService';
import { profileService } from '@/services/profileService';
import { Address, Order, Profile } from '@/types/supabase';
import { addressService } from '@/services/addressService';

const Account = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load profile data
        const profileData = await profileService.getProfile();
        setProfile(profileData);
        
        // Load orders
        const ordersData = await orderService.getOrders();
        setOrders(ordersData);
        
        // Load addresses
        const addressesData = await addressService.getAddresses();
        setAddresses(addressesData);
      } catch (error) {
        console.error('Error loading account data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your account information',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  const handleLogout = async () => {
    await signOut();
    // Navigation is handled by the auth state change listener
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            Loading your account information...
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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <BackButton />
          </div>
          <div className="bg-white rounded-xl pastel-shadow p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">My Account</h1>
              <p className="text-muted-foreground mt-2">Manage your account settings and view your orders</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Account Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {profile?.first_name} {profile?.last_name}</p>
                  <p><span className="font-medium">Email:</span> {profile?.email}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/account/edit')}
                >
                  Edit Profile
                </Button>
                
                <h2 className="text-xl font-semibold pt-4">Saved Addresses</h2>
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-md p-4 relative">
                        {address.is_default && (
                          <span className="absolute top-2 right-2 bg-pastel-pink text-white text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <p className="font-medium">{address.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zip_code}
                        </p>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/account/addresses')}
                    >
                      Manage Addresses
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground italic">
                    No saved addresses found.
                    <Button 
                      variant="link" 
                      className="block w-full mt-2"
                      onClick={() => navigate('/account/addresses/new')}
                    >
                      Add a new address
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id} 
                        className="border rounded-md p-4 hover:border-pastel-pink cursor-pointer transition-colors"
                        onClick={() => navigate(`/account/orders/${order.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                            <p className={`text-xs px-2 py-1 rounded-full ${
                              order.order_status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : order.order_status === 'processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/account/orders')}
                    >
                      View All Orders
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground italic">
                    You haven't placed any orders yet.
                    <Button 
                      className="w-full btn-pastel mt-4"
                      onClick={() => navigate('/shop')}
                    >
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                className="w-full text-destructive border-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
