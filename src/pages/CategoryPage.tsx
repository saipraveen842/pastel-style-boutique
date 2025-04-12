
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Shop from './Shop';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Validate if the category is valid
  const validCategories = ['dresses', 'tops', 'bottoms', 'accessories', 'new-arrivals', 'sale'];
  
  if (!categoryName || !validCategories.includes(categoryName.toLowerCase())) {
    return <Navigate to="/shop" replace />;
  }
  
  return <Shop />;
};

export default CategoryPage;
