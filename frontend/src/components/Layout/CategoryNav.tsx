import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../graphql/queries';

interface Category {
  id: string;
  name: string;
}

interface CategoryNavProps {
  activeCategory: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory }) => {
  const { loading, error, data } = useQuery<{ allCategories: Category[] }>(GET_CATEGORIES);

  if (loading) return <div data-testid="category-nav-loading">Loading...</div>;
  if (error) return <div data-testid="category-nav-error">Error loading categories.</div>;

  const categories = data?.allCategories || [];

  // Add "all" category if it doesn't exist
  const allCategoriesWithAll = categories.find(cat => cat.name.toLowerCase() === 'all') 
    ? categories 
    : [{ id: 'all-category', name: 'all' }, ...categories];

  return (
    <nav className="z-10">
      <ul className="flex gap-6">
        {allCategoriesWithAll.map((category) => {
          const isActive = category.name.toLowerCase() === activeCategory.toLowerCase();
          const path = category.name.toLowerCase() === 'all' ? '/all' : `/${category.name.toLowerCase()}`;

          return (
            <li key={category.id || `category-${category.name}`}>
              <Link
                to={path}
                data-testid={isActive ? 'active-category-link' : 'category-link'}
                className={`block pb-4 border-b-2 uppercase tracking-wider ${
                  isActive 
                    ? 'border-primary text-primary font-medium' 
                    : 'border-transparent hover:text-primary'
                }`}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryNav;