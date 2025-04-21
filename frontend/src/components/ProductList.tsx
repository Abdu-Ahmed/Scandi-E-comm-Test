import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { CartItem } from './CartOverlay';
import ProductCard from './Product/ProductCard';

interface ProductListProps {
  activeCategory: string;
  addToCart: (item: CartItem) => void;
  openCartOverlay: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ activeCategory, addToCart, openCartOverlay }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: activeCategory === 'all' ? undefined : activeCategory },
  });

  if (loading) return <div data-testid="products-loading">Loading products...</div>;
  if (error) return <div data-testid="products-error">Error loading products: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-medium uppercase tracking-wider mb-10">
        {activeCategory}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.allProducts?.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            openCartOverlay={openCartOverlay}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;