
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import BackButton from '@/components/ui/back-button';
import { Product } from '@/components/ProductCard';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate a product fetch
    const fetchProduct = () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // This would be replaced with actual API fetch in a real app
        const dummyProduct: Product = {
          id: Number(productId),
          name: `Product ${productId}`,
          price: 49.99,
          image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
          category: "Dresses",
          isNew: Math.random() > 0.7,
          colors: ["Pink", "Blue", "White"],
          sizes: ["XS", "S", "M", "L", "XL"]
        };
        
        setProduct(dummyProduct);
        setSelectedSize(dummyProduct.sizes?.[0] || '');
        setSelectedColor(dummyProduct.colors?.[0] || '');
        setIsLoading(false);
      }, 500);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        size: selectedSize || 'One Size',
        color: selectedColor || 'Default',
        quantity: quantity
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="text-lg">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Product not found</h2>
            <Button className="btn-pastel" onClick={() => navigate('/shop')}>
              Return to Shop
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square w-full overflow-hidden rounded-xl pastel-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-pastel-pink text-white px-3 py-1 text-sm font-semibold rounded">
                  NEW
                </span>
              )}
              {product.isSale && (
                <span className="absolute top-4 right-4 bg-pastel-yellow text-primary px-3 py-1 text-sm font-semibold rounded">
                  SALE
                </span>
              )}
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                <p className="text-muted-foreground mt-1">{product.category}</p>
              </div>
              
              <div className="flex items-center">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-semibold">${product.salePrice.toFixed(2)}</span>
                    <span className="ml-3 text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded-md ${
                          selectedSize === size 
                            ? 'border-pastel-pink bg-pastel-pink/10 font-medium' 
                            : 'border-gray-200 hover:border-pastel-pink/50'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-2 border rounded-md ${
                          selectedColor === color 
                            ? 'border-pastel-pink bg-pastel-pink/10 font-medium' 
                            : 'border-gray-200 hover:border-pastel-pink/50'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selection */}
              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 border border-gray-200 rounded-l-md flex items-center justify-center hover:bg-gray-50"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <div className="w-12 h-10 border-t border-b border-gray-200 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    className="w-10 h-10 border border-gray-200 rounded-r-md flex items-center justify-center hover:bg-gray-50"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <Button 
                  className="w-full bg-[#222222] hover:bg-[#333333] text-white"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#222222] text-[#222222] hover:bg-[#2222221a]"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
              
              {/* Product Description */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium mb-2">Product Description</h3>
                <p className="text-muted-foreground">
                  This beautiful {product.name.toLowerCase()} features a comfortable fit and stylish design. 
                  Perfect for any occasion, it's made with high-quality materials that are designed to last.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
