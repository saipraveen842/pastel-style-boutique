
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pastel-gray/30 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About PastelBoutique</h3>
            <p className="text-muted-foreground text-sm">
              A curated collection of beautiful boutique fashion designed exclusively for women, 
              with a focus on quality and style.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Home</Link></li>
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary text-sm">Shop All</Link></li>
              <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-primary text-sm">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-muted-foreground hover:text-primary text-sm">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary text-sm">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary text-sm">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Subscribe to get special offers, free giveaways, and style updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 p-2 text-sm border border-pastel-pink/30 rounded-l-lg focus:outline-none focus:border-primary"
              />
              <button 
                type="submit" 
                className="bg-pastel-pink text-primary-foreground px-3 rounded-r-lg font-medium text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-pastel-pink/20 mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PastelBoutique. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
