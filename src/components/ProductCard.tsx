
import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  color?: string;
  size?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      ...product,
      color: product.color || 'Default',
      size: product.size || 'M',
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      ...product,
      color: product.color || 'Default',
      size: product.size || 'M',
    });
    
    navigate('/cart');
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* New tag */}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-pastel-pink text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}
        
        {/* Quick actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between">
            <Button 
              size="sm" 
              variant="secondary" 
              className="bg-white text-foreground hover:bg-pastel-pink hover:text-primary-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1" /> Add to Cart
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="bg-white text-foreground hover:bg-pastel-pink hover:text-primary-foreground"
            >
              <Heart size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-foreground truncate">{product.name}</h3>
          <p className="text-primary-foreground font-semibold mt-1">
            ${product.price.toFixed(2)}
          </p>
        </Link>
        <div className="mt-2 text-xs text-muted-foreground">
          {product.category}
        </div>
        
        {/* Buy Now button */}
        <Button 
          className="w-full mt-3 bg-pastel-pink hover:bg-primary text-primary-foreground"
          size="sm"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
