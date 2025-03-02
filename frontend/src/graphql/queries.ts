import { gql } from '@apollo/client';

const getProductFields = `
  id
  name
  inStock
  gallery
  description
  prices {
    amount
    currency {
      label
      symbol
    }
  }
  category
  attributes {
    id
    name
    type
    items {
      id
      value
      displayValue
    }
  }
  __typename
`;

/**
 * Query to fetch categories from the backend.
 * The backend field "categories" is aliased to "allCategories".
 */
export const GET_CATEGORIES = gql`
  query GetCategories {
    allCategories: categories {
      name
    }
  }
`;

/**
 * Query to fetch products (optionally filtered by category).
 * The backend field "products" is aliased to "allProducts".
 */
export const GET_PRODUCTS = gql`
  query GetProducts($category: String) {
    allProducts: products(category: $category) {
      ${getProductFields}
    }
  }
`;

/**
 * Query to fetch a single product by its ID.
 * The backend field "product" is aliased to "productDetail".
 */
export const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($id: String!) {
    productDetail: product(id: $id) {
      ${getProductFields}
    }
  }
`;

/**
 * Combined query to fetch both categories and products.
 * Aliases are applied so the keys match what the frontend expects.
 */
export const GET_CATEGORIES_AND_PRODUCTS = gql`
  query GetCategoriesAndProducts($category: String) {
    allCategories: categories {
      name
    }
    allProducts: products(category: $category) {
      ${getProductFields}
    }
  }
`;
