
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Account = () => {
  const { user, logout } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl pastel-shadow p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">My Account</h1>
              <p className="text-muted-foreground mt-2">Manage your account settings and view your orders</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Account Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast({
                    title: "Coming soon",
                    description: "Edit profile functionality will be available soon."
                  })}
                >
                  Edit Profile
                </Button>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <div className="text-center py-8 text-muted-foreground italic">
                  You haven't placed any orders yet.
                </div>
                <Button 
                  className="w-full btn-pastel"
                  onClick={() => navigate('/shop')}
                >
                  Start Shopping
                </Button>
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
