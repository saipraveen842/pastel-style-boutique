
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className = '' }: BackButtonProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={goBack} 
      className={`rounded-full hover:bg-pastel-pink/10 ${className}`}
      aria-label="Go back"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
