import React from 'react';
import PlaceOrderBtn from './Buttons/PlaceOrderBtn';
import CartItem from './Cart/CartItem';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedOptions: Record<string, string>;
  attributes: {
    id: string;
    name: string;
    type: string;
    items: {
      id: string;
      displayValue: string;
      value: string;
    }[];
  }[];
}

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  placeOrder: (cartItems: CartItem[]) => Promise<boolean>;
}

const CartOverlay: React.FC<CartOverlayProps> = ({
  isOpen,
  onClose,
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  placeOrder,
}) => {
  if (!isOpen) return null;

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = async () => {
    const success = await placeOrder(cartItems);
    if (success) {
      onClose(); // close the cart overlay after a successful order
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-25 z-40"
        onClick={onClose}
        data-testid="cart-overlay"
      />

      <div className="fixed z-50 bg-white shadow-lg -right-3.5 top-20 w-80 py-6 px-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <h2 className="mb-6">
          <span className="font-bold">My Bag</span>
          {totalItems > 0 && `, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
        </h2>

        {totalItems === 0 ? (
          <p className="mt-2 text-gray-500">Your bag is empty.</p>
        ) : (
          <>
            <div className="py-4 space-y-8 overflow-y-auto max-h-80">
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  index={index}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </div>

            <div className="pt-4 mt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Total</h3>
                <div className="font-bold" data-testid="cart-total">
                  ${cartTotal.toFixed(2)}
                </div>
              </div>

              <PlaceOrderBtn 
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;
