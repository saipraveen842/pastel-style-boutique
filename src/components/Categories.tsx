
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  path: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80",
    count: 124,
    path: "/category/dresses"
  },
  {
    id: 2,
    name: "Tops",
    image: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    count: 86,
    path: "/category/tops"
  },
  {
    id: 3,
    name: "Bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    count: 62,
    path: "/category/bottoms"
  },
  {
    id: 4,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    count: 45,
    path: "/category/accessories"
  }
];

const Categories = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Find exactly what you're looking for</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category.path)}
              className="relative group overflow-hidden rounded-xl pastel-shadow cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.count} Products</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
