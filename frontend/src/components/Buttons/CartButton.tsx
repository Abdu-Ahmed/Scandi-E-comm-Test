import React from 'react';
import { Cart } from './..';

interface CartButtonProps {
  onClick: () => void;
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, itemCount }) => {
  return (
    <button
      onClick={onClick}
      data-testid="cart-btn"
      className="relative text-black hover:text-gray-600 transition-colors p-2"
      aria-label="Open Cart"
    >
      <Cart className="h-6 w-6" color='hsl(216, 8%, 12%)' />
      {itemCount > 0 && (
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
