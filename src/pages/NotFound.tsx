
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-pastel-pink/5">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-pastel-pink mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you were looking for: {location.pathname}
          </p>
          <div className="space-y-4">
            <Link to="/" className="btn-pastel inline-block px-8 py-3">
              Return to Home
            </Link>
            <div className="flex justify-center space-x-6 mt-6">
              <Link to="/shop" className="text-primary-foreground hover:underline">
                Shop All
              </Link>
              <Link to="/new-arrivals" className="text-primary-foreground hover:underline">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
