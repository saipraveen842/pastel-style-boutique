
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CartButton from './ui/cart-button';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const categories = [
    { name: "New Arrivals", path: "/category/new-arrivals" },
    { name: "Dresses", path: "/category/dresses" },
    { name: "Tops", path: "/category/tops" },
    { name: "Bottoms", path: "/category/bottoms" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Sale", path: "/category/sale" }
  ];

  const isActiveLink = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-pastel-pink/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold text-primary-foreground">
            <span className="font-bold">Pastel</span>Boutique
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.path}
                className={`nav-link text-sm transition-colors ${
                  isActiveLink(category.path) 
                    ? 'text-pastel-pink font-semibold' 
                    : 'hover:text-pastel-pink'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="nav-link">
              <Search size={20} />
            </button>
            <CartButton />
            <button 
              onClick={handleAuthAction}
              className="nav-link hidden md:flex items-center space-x-1"
            >
              {isAuthenticated ? (
                <User size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  <span className="text-sm">Sign In</span>
                </>
              )}
            </button>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t border-pastel-pink/20 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 pl-10 rounded-full border border-pastel-pink/30 focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pastel-pink" size={18} />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-pastel-pink text-white px-4 py-1 rounded-full text-sm"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-pastel-pink/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.path}
                  className={`nav-link text-sm py-2 border-b border-pastel-pink/10 ${
                    isActiveLink(category.path) ? 'text-pastel-pink font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account"
                    className={`nav-link text-sm py-2 border-b border-pastel-pink/10 text-left ${
                      location.pathname === '/account' ? 'text-pastel-pink font-semibold' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button 
                    className="nav-link text-sm py-2 border-b border-pastel-pink/10 text-left text-destructive"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className={`nav-link text-sm py-2 border-b border-pastel-pink/10 text-left ${
                    location.pathname === '/login' ? 'text-pastel-pink font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In / Register
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
