
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-pastel-pink/30 via-white to-pastel-lavender/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
              Discover Your <span className="text-primary">Perfect Style</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our curated collection of beautiful boutique fashion designed exclusively for women.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-pastel px-8 py-6">Shop New Arrivals</Button>
              <Button variant="outline" className="px-8 py-6 border-pastel-pink text-primary-foreground hover:bg-pastel-pink/10">
                Explore Collection
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-40 h-40 bg-pastel-mint rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-pastel-lavender rounded-full opacity-50 blur-xl"></div>
              <div className="relative bg-white p-4 rounded-2xl pastel-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80" 
                  alt="Fashion Model"
                  className="rounded-xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
