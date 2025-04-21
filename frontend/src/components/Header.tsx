import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '.';
import CategoryNav from './Layout/CategoryNav';
import CartButton from './Buttons/CartButton';

interface HeaderProps {
  toggleCart: () => void;
  cartItemCount: number;
  activeCategory: string;
  isCartDisabled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleCart, 
  cartItemCount, 
  activeCategory, 
  isCartDisabled = false 
}) => {
  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Category Navigation */}
        <CategoryNav activeCategory={activeCategory} />

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" data-testid="logo-link">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Cart Button */}
        <div className="relative z-10">
          <CartButton 
            onClick={toggleCart} 
            itemCount={cartItemCount} 
            disabled={isCartDisabled}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;