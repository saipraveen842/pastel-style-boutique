
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const categories = [
    "New Arrivals",
    "Dresses",
    "Tops",
    "Bottoms",
    "Accessories",
    "Sale"
  ];

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
                key={category} 
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="nav-link text-sm"
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="nav-link">
              <Search size={20} />
            </button>
            <Link to="/cart" className="nav-link relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/account" className="nav-link hidden md:block">
              <User size={20} />
            </Link>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t border-pastel-pink/20 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 pl-10 rounded-full border border-pastel-pink/30 focus:outline-none focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pastel-pink" size={18} />
            </div>
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
                  key={category} 
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="nav-link text-sm py-2 border-b border-pastel-pink/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link 
                to="/account" 
                className="nav-link text-sm py-2 border-b border-pastel-pink/10"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
