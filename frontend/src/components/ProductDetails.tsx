import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { GET_SINGLE_PRODUCT } from '../graphql/queries';
import { CartItem } from './CartOverlay';
import ImageGallery from './Product/ImageGallery';
import AttributeSelector from './Product/AttributeSelector';

interface Price {
  amount: number;
  currency: {
    label: string;
    symbol: string;
  } | null;
}

interface AttributeItem {
  id: string;
  displayValue: string;
  value: string;
}

interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  brand: string;
  attributes: Attribute[];
  prices: Price[];
}

interface ProductDetailsProps {
  addToCart: (item: CartItem) => void;
  openCartOverlay: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart, openCartOverlay }) => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ productDetail: Product }>(GET_SINGLE_PRODUCT, {
    variables: { id },
  });
  
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  if (loading) return <p className="text-center py-10 text-xl">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;
  if (!data?.productDetail) return <p className="text-center py-10">Product not found</p>;

  const product = data.productDetail;
  const filteredGallery = product.gallery?.filter(url => url?.trim()) || [];
  const allAttributesSelected = product.attributes
    ? product.attributes.every(attr => selectedOptions[attr.name] !== undefined)
    : true;

  const handleSelectOption = (attributeName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [attributeName]: value }));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.prices[0]?.amount || 0,
      image: filteredGallery[0] || '/placeholder.jpg',
      quantity: 1,
      selectedOptions,
      attributes: product.attributes || [],
    });
    openCartOverlay();
  };

  return (
    <main className="flex flex-col mt-24 md:flex-row gap-8 px-4">
      {/* Image Gallery Section */}
      <div className="md:w-2/3">
        <ImageGallery images={product.gallery} productName={product.name} />
      </div>

      {/* Product Info Section */}
      <div className="md:w-1/3">
        <h1 className="text-2xl font-light mb-4">{product.name}</h1>
        
        <div className="text-lg font-bold mb-6">
          {product.prices[0]?.currency && (
            `${product.prices[0].currency.symbol}${product.prices[0].amount.toFixed(2)}`
          )}
        </div>

        {product.attributes?.map((attr) => (
          <AttributeSelector
            key={attr.id}
            attribute={attr}
            selectedValue={selectedOptions[attr.name]}
            onChange={handleSelectOption}
          />
        ))}

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || !allAttributesSelected}
          className={`w-full py-3 mb-6 font-medium transition-colors ${
            !product.inStock || !allAttributesSelected
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-green-600'
          }`}
          data-testid="add-to-cart"
        >
          {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
        </button>

        <div className="prose max-w-none text-sm" data-testid="product-description">
          {parse(product.description)}
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;