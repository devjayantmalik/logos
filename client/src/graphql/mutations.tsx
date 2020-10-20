import { gql } from "@apollo/client";

export const addToCart = gql`
  mutation($id: ID!) {
    addToCart(id: $id) {
      id
      price
      url
    }
  }
`;

export const removeFromCart = gql`
  mutation($id: ID!) {
    removeFromCart(id: $id) {
      id
      price
      url
    }
  }
`;
