
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  salePrice?: number;
  colors?: string[];
  sizes?: string[];
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
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
      description: `${product.name} has been added to your cart`,
    });

    if (onAddToCart) onAddToCart();
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      size: product.sizes ? product.sizes[0] : 'One Size',
      color: product.colors ? product.colors[0] : 'Default',
      quantity: 1
    });
    
    navigate('/checkout');
    
    if (onBuyNow) onBuyNow();
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </Link>
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-pastel-pink text-white px-2 py-1 text-xs font-semibold rounded">
            NEW
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-2 right-2 bg-pastel-yellow text-primary px-2 py-1 text-xs font-semibold rounded">
            SALE
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <div className="mt-1">
          {product.salePrice ? (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">${product.salePrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-4 flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-[#222222] text-white hover:bg-[#333333] text-xs"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
