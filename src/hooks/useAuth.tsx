import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_OUT') {
          setTimeout(() => {
            navigate('/login');
          }, 0);
        } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setTimeout(() => {
            navigate('/');
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Existing session check:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (
    email: string, 
    password: string,
    userData: { firstName: string; lastName: string }
  ) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          }
        }
      });

      if (error) throw error;
      
      console.log('Signup successful:', data);
      
      toast({
        title: 'Account created',
        description: 'You have successfully signed up.',
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Sign up failed',
        description: error.message || 'An error occurred during sign up.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('Sign in successful:', data);
      
      toast({
        title: 'Welcome back',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: 'Sign in failed',
        description: error.message || 'Invalid email or password.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: 'Signed out',
        description: 'You have been signed out.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message || 'An error occurred during sign out.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        toast({
          title: 'Error',
          description: 'You must be logged in to delete your account.',
          variant: 'destructive',
        });
        return;
      }
      
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        const { error: deleteError } = await supabase.rpc('delete_user');
        if (deleteError) throw deleteError;
      }
      
      toast({
        title: 'Account deleted',
        description: 'Your account has been successfully deleted.',
      });
      
      setUser(null);
      setSession(null);
      
      navigate('/');
    } catch (error: any) {
      console.error('Delete account error:', error);
      toast({
        title: 'Delete account failed',
        description: error.message || 'An error occurred while deleting your account.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    deleteAccount,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : null;
};
