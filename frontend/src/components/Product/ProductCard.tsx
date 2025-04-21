import React from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '../.';
import { CartItem } from '../CartOverlay';

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: {
    amount: number;
    currency: {
      symbol: string;
    };
  }[];
  brand: string;
  attributes: {
    name: string;
    items: {
      value: string;
    }[];
  }[];
}

interface ProductCardProps {
  product: Product;
  addToCart: (item: CartItem) => void;
  openCartOverlay: () => void;
}

const toKebabCase = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

// Transform the product's attributes to the required CartItem type
const transformAttributes = (
  attributes: Product['attributes']
): {
  id: string;
  name: string;
  type: string;
  items: {
    id: string;
    displayValue: string;
    value: string;
  }[];
}[] => {
  return attributes.map(attr => ({
    id: attr.name.toLowerCase().replace(/\s+/g, '-'),
    name: attr.name,
    // Set the correct type for color attributes
    type: attr.name.toLowerCase() === 'color' ? 'swatch' : 'default',
    items: attr.items.map((item, index) => ({
      id: `${attr.name}-${index}`,
      displayValue: item.value,
      value: item.value,
    })),
  }));
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
  openCartOverlay,
}) => {
  const testId = `product-${toKebabCase(product.name)}`;
  const price = product.prices?.[0] || { amount: 0, currency: { symbol: '$' } };
  const gallery = product.gallery?.filter((url: string) => url?.trim()) || [];

  // Set default selected options (taking the first value of each attribute)
  const defaultAttributes = product.attributes?.reduce((acc: any, attr: any) => {
    if (attr.items?.length) acc[attr.name] = attr.items[0].value;
    return acc;
  }, {});

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: price.amount,
      image: gallery[0] || '',
      quantity: 1,
      selectedOptions: defaultAttributes,
      attributes: transformAttributes(product.attributes),
    });
    openCartOverlay();
  };

  return (
    <div
      data-testid={testId}
      className="bg-white rounded-lg shadow hover:shadow-xl p-4 relative group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          {gallery[0] && (
            <img
              src={gallery[0]}
              alt={product.name}
              className="w-full h-56 object-cover rounded-md"
            />
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
              <span className="text-white text-xl uppercase">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">
            {price.currency.symbol}{(price.amount || 0).toFixed(2)}
          </p>
          <p className="text-gray-500">{product.brand}</p>
        </div>
      </Link>

      {product.inStock && (
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-primary hover:bg-green-600 text-white p-3 rounded-full transition opacity-0 group-hover:opacity-100"
          data-testid={`quick-shop-${toKebabCase(product.name)}`}
        >
          <Cart className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
