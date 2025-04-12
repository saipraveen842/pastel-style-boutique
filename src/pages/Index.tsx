
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import StyleBot from '@/components/StyleBot';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Categories />
        <section className="py-16 bg-pastel-pink/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Personal Style Assistance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Not sure what suits you best? Our AI style assistant can help you find the perfect outfit 
              based on your preferences. Just click the chat icon in the bottom right corner.
            </p>
            <div className="inline-block bg-white p-3 rounded-xl pastel-shadow">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Style Assistant"
                className="rounded-lg w-full max-w-2xl mx-auto"
              />
            </div>
          </div>
        </section>
      </main>
      <StyleBot />
      <Footer />
    </div>
  );
};

export default Index;
