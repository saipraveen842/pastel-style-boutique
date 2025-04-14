import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, CircleUser, HomeIcon, Package, ShoppingBag, CreditCard, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { addressService } from '@/services/addressService';
import { orderService } from '@/services/orderService';
import { Order, Address } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const Account = () => {
  const { user, signOut, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const [userOrders, userAddresses] = await Promise.all([
          orderService.getUserOrders(),
          addressService.getUserAddresses()
        ]);
        
        setOrders(userOrders || []);
        setAddresses(userAddresses || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load your account data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, toast]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount();
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-pink mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your account information...</p>
              </div>
            </div>
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl pastel-shadow p-6 sticky top-24">
                <div className="flex items-center space-x-3 pb-6 mb-6 border-b border-pastel-pink/10">
                  <div className="w-12 h-12 rounded-full bg-pastel-pink/20 flex items-center justify-center">
                    <CircleUser className="text-pastel-pink" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{user?.user_metadata?.first_name || 'User'} {user?.user_metadata?.last_name || ''}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('profile')} 
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-pastel-pink/10 text-pastel-pink' : 'hover:bg-gray-100'}`}
                  >
                    <CircleUser size={18} />
                    <span>My Profile</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('orders')} 
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-pastel-pink/10 text-pastel-pink' : 'hover:bg-gray-100'}`}
                  >
                    <Package size={18} />
                    <span>My Orders</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('addresses')} 
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${activeTab === 'addresses' ? 'bg-pastel-pink/10 text-pastel-pink' : 'hover:bg-gray-100'}`}
                  >
                    <HomeIcon size={18} />
                    <span>My Addresses</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('wishlist')} 
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${activeTab === 'wishlist' ? 'bg-pastel-pink/10 text-pastel-pink' : 'hover:bg-gray-100'}`}
                  >
                    <ShoppingBag size={18} />
                    <span>Wishlist</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('payments')} 
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${activeTab === 'payments' ? 'bg-pastel-pink/10 text-pastel-pink' : 'hover:bg-gray-100'}`}
                  >
                    <CreditCard size={18} />
                    <span>Payment Methods</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('settings')} 
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-pastel-pink/10 text-pastel-pink' : 'hover:bg-gray-100'}`}
                  >
                    <Settings size={18} />
                    <span>Account Settings</span>
                  </button>
                </nav>
                
                <div className="mt-10 pt-6 border-t border-pastel-pink/10">
                  <Button 
                    onClick={handleLogout}
                    className="w-full bg-[#333] text-white hover:bg-[#222] mb-2"
                  >
                    Sign Out
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive"
                        className="w-full"
                      >
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? "Deleting..." : "Delete Account"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
            
            <div className="lg:hidden mb-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 h-auto">
                  <TabsTrigger value="profile" className="py-3">
                    <CircleUser size={16} className="mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="py-3">
                    <Package size={16} className="mr-2" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="py-3">
                    <HomeIcon size={16} className="mr-2" />
                    Addresses
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="bg-white rounded-xl pastel-shadow p-6">
              {activeTab === 'profile' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-2">First Name</h3>
                        <p className="font-medium">{user?.user_metadata?.first_name || 'Not set'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-2">Last Name</h3>
                        <p className="font-medium">{user?.user_metadata?.last_name || 'Not set'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-2">Email Address</h3>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-2">Member Since</h3>
                        <p className="font-medium flex items-center">
                          <CalendarIcon size={16} className="mr-2 text-pastel-pink" />
                          {new Date(user?.created_at as string).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-pastel-pink/10">
                      <h3 className="font-semibold mb-4">Edit Profile</h3>
                      <Button 
                        onClick={() => setActiveTab('settings')}
                        className="bg-[#333] text-white hover:bg-[#222]"
                      >
                        Edit Profile Information
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto text-pastel-pink/50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                      <Button 
                        onClick={() => navigate('/shop')}
                        className="bg-[#333] text-white hover:bg-[#222]"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border border-pastel-pink/20 rounded-lg p-4">
                          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                            <div>
                              <h3 className="font-semibold">Order #{order.id.slice(-6)}</h3>
                              <p className="text-sm text-muted-foreground">
                                Placed on {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                order.order_status === 'delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.order_status === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center border-t border-pastel-pink/10 pt-4 mt-4">
                            <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/order/${order.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'addresses' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
                  
                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <HomeIcon className="w-16 h-16 mx-auto text-pastel-pink/50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
                      <p className="text-muted-foreground mb-6">Add a shipping address to speed up checkout.</p>
                      <Button className="bg-[#333] text-white hover:bg-[#222]">
                        Add New Address
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {addresses.map(address => (
                        <div 
                          key={address.id} 
                          className={`border rounded-lg p-4 ${
                            address.is_default ? 'border-pastel-pink bg-pastel-pink/5' : 'border-pastel-pink/20'
                          }`}
                        >
                          {address.is_default && (
                            <div className="mb-2">
                              <span className="text-xs font-medium bg-pastel-pink text-white px-2 py-1 rounded-full">
                                Default Address
                              </span>
                            </div>
                          )}
                          
                          <div className="space-y-1 mb-4">
                            <p className="font-medium">{address.street}</p>
                            <p>{address.city}, {address.state} {address.zip_code}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.is_default && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => addressService.setDefaultAddress(address.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                            {!address.is_default && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive hover:text-destructive"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this address?')) {
                                    addressService.deleteAddress(address.id);
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <Button className="bg-[#333] text-white hover:bg-[#222] mt-4">
                        Add New Address
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {(activeTab === 'wishlist' || activeTab === 'payments' || activeTab === 'settings') && (
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-6">
                    {activeTab === 'wishlist' ? 'My Wishlist' : 
                     activeTab === 'payments' ? 'Payment Methods' : 
                     'Account Settings'}
                  </h1>
                  <p className="text-muted-foreground mb-4">This feature is coming soon!</p>
                  <Button 
                    onClick={() => setActiveTab('profile')}
                    variant="outline"
                  >
                    Back to Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
