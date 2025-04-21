import React from 'react';
import { Cart } from './..';

interface CartButtonProps {
  onClick: () => void;
  itemCount: number;
  disabled?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, itemCount, disabled = false }) => {
  const isEmpty = itemCount === 0;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || isEmpty}
      data-testid="cart-btn"
      className={`relative p-2 transition-all duration-200 ${
        disabled ? 'cursor-not-allowed opacity-60' : 
        isEmpty ? 'cursor-not-allowed opacity-75 hover:opacity-90' : 
        'text-black hover:text-gray-600 transition-colors'
      }`}
      aria-label={disabled ? "Cart disabled" : isEmpty ? "Cart empty" : "Open Cart"}
    >
      <Cart 
        className="h-6 w-6" 
        color={disabled ? 'hsl(216, 8%, 60%)' : isEmpty ? 'hsl(216, 8%, 40%)' : 'hsl(216, 8%, 12%)'}
      />
      {itemCount > 0 && !disabled && (
        <div
          className="absolute -top-1 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          data-testid="cart-count-bubble"
        >
          {itemCount}
        </div>
      )}
    </button>
  );
};

export default CartButton;