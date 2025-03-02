import React from 'react';
import ActionBtn from './../Buttons/ActionBtn';
import AttributeSelector from './../Product/AttributeSelector';
import { CartItem as CartItemType } from './../CartOverlay';

interface CartItemComponentProps {
  item: CartItemType;
  index: number;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
}

const CartItem: React.FC<CartItemComponentProps> = ({
  item,
  index,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex justify-between">
      <div className="w-3/6 space-y-2">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-text">${item.price.toFixed(2)}</p>

        {item.attributes?.map((attr) => (
          <AttributeSelector
            key={attr.id}
            attribute={attr}
            selectedValue={item.selectedOptions[attr.name]}
            compact={true}
            onChange={() => {}}
            disabled={true}   
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between w-1/6">
        <ActionBtn
          text="+" 
          onClick={() => increaseQuantity(index)}
          data="cart-item-amount-increase"
        />
        <span data-testid="cart-item-amount" className="my-1">
          {item.quantity}
        </span>
        <ActionBtn
          text="-"
          onClick={() => decreaseQuantity(index)}
          data="cart-item-amount-decrease"
        />
      </div>

      <div className="w-2/6">
        <img
          src={item.image || '/placeholder-image.jpg'}
          alt={item.name}
          className="object-contain w-full h-24"
        />
      </div>
    </div>
  );
};

export default CartItem;
