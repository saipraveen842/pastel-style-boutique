import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StyleBot from '@/components/StyleBot';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/ui/back-button';

const generateProducts = (count: number, category?: string): Product[] => {
  const categories = ['Dresses', 'Tops', 'Bottoms', 'Accessories'];
  const selectedCategory = category || 'All';
  
  return Array.from({ length: count }, (_, i) => {
    const productCategory = selectedCategory === 'All' ? 
      categories[Math.floor(Math.random() * categories.length)] : 
      selectedCategory;
    
    const images = {
      'Dresses': [
        "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=783&q=80",
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=719&q=80",
      ],
      'Tops': [
        "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=627&q=80",
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      ],
      'Bottoms': [
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1590838719319-0c6d1e87a5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1584382296087-ac00c7263710?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      ],
      'Accessories': [
        "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=690&q=80",
      ]
    };

    const categoryImages = images[productCategory as keyof typeof images];
    const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
    
    return {
      id: i + 1,
      name: `${productCategory} Item ${i + 1}`,
      price: parseFloat((19.99 + Math.random() * 50).toFixed(2)),
      image: randomImage,
      category: productCategory,
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9
    };
  });
};

const Shop = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = generateProducts(50);
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    if (categoryName) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [categoryName, products, searchQuery]);

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
    // In a real app, this would redirect to checkout with the product
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <BackButton className="mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {categoryName ? 
                  `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}` : 
                  searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
                onBuyNow={() => handleBuyNow(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search or browse our other categories.
              </p>
              <Button className="btn-pastel">View All Products</Button>
            </div>
          )}
        </div>
      </main>
      <StyleBot />
      <Footer />
    </div>
  );
};

export default Shop;
