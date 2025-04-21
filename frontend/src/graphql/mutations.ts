import { gql } from '@apollo/client';

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $productId: ID!,
    $quantity: Int!,
    $attributes: [AttributeValueInput!]
  ) {
    createOrder(productId: $productId, quantity: $quantity, attributes: $attributes) {
      id
      productId
      quantity
      attributes {
        name
        value
      }
      product {
        id
        name
      }
    }
  }
`;
