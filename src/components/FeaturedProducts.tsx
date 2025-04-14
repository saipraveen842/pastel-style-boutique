
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

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
    isFeatured: true,
    isSale: true,
    salePrice: 17.49
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
    isFeatured: true,
    isSale: true,
    salePrice: 12.49
  }
];

const newArrivals: Product[] = [
  {
    id: 101,
    name: "Bohemian Maxi Dress",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=783&q=80",
    category: "Dresses",
    isNew: true
  },
  {
    id: 102,
    name: "Linen Blend Button-Up",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Tops",
    isNew: true
  },
  {
    id: 103,
    name: "Relaxed Fit Jeans",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Bottoms",
    isNew: true
  },
  {
    id: 104,
    name: "Statement Necklace",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Accessories",
    isNew: true
  }
];

const saleProducts: Product[] = [
  {
    id: 201,
    name: "Classic Wrap Dress",
    price: 79.99,
    salePrice: 39.99,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Dresses",
    isSale: true
  },
  {
    id: 202,
    name: "Embroidered Blouse",
    price: 54.99,
    salePrice: 27.49,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=627&q=80",
    category: "Tops",
    isSale: true
  },
  {
    id: 203,
    name: "High-Rise Slim Pants",
    price: 69.99,
    salePrice: 34.99,
    image: "https://images.unsplash.com/photo-1590838719319-0c6d1e87a5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Bottoms",
    isSale: true
  },
  {
    id: 204,
    name: "Gold Hoop Earrings",
    price: 39.99,
    salePrice: 19.99,
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Accessories",
    isSale: true
  }
];

const FeaturedProducts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      size: product.sizes ? product.sizes[0] : 'One Size',
      color: product.colors ? product.colors[0] : 'Default',
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      size: product.sizes ? product.sizes[0] : 'One Size',
      color: product.colors ? product.colors[0] : 'Default',
      quantity: 1
    });
    
    navigate('/cart');
  };
  
  const handleViewAllProducts = () => {
    navigate('/shop');
  };
  
  const handleViewNewArrivals = () => {
    navigate('/new-arrivals');
  };
  
  const handleViewSale = () => {
    navigate('/category/sale');
  };
  
  return (
    <>
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
      
      <section className="py-12 bg-pastel-pink/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">New Arrivals</h2>
            <p className="text-muted-foreground mt-2">Just landed! Shop the latest styles</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
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
              onClick={handleViewNewArrivals}
            >
              View All New Arrivals
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-pastel-yellow/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">50% Off Sale</h2>
            <p className="text-muted-foreground mt-2">Limited time offers on these amazing styles</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map(product => (
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
              className="bg-pastel-yellow hover:bg-pastel-yellow/80 text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 font-medium"
              onClick={handleViewSale}
            >
              Shop All Sale Items
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
