
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'isAuthenticated'> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mock login function (replace with actual auth)
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create mock user (in real app, this would come from your backend)
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      firstName: 'Demo',
      lastName: 'User',
      email,
      isAuthenticated: true
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  
  // Mock signup function
  const signup = async (userData: Omit<User, 'id' | 'isAuthenticated'> & { password: string }) => {
    // In a real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new user (in real app, this would be handled by your backend)
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      isAuthenticated: true
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout,
      isAuthenticated 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
