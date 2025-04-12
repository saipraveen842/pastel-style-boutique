
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Pastel Floral Summer Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Dresses",
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Lavender Blouse",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Tops",
    isFeatured: true
  },
  {
    id: 3,
    name: "High-Waisted Wide Leg Pants",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Bottoms",
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    name: "Pearl Earrings Set",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Accessories",
    isFeatured: true
  }
];

const FeaturedProducts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: Product) => {
    toast({
      title: "Proceeding to checkout",
      description: `You are buying ${product.name}.`,
    });
    // Navigate to cart or checkout in a real implementation
    navigate('/cart');
  };
  
  const handleViewAllProducts = () => {
    navigate('/shop');
  };
  
  return (
    <section className="py-12 bg-pastel-lavender/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground mt-2">Discover our most loved pieces</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => handleAddToCart(product)}
              onBuyNow={() => handleBuyNow(product)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="btn-pastel px-8 py-3"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
