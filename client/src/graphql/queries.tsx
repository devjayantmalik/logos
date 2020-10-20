import { gql } from "@apollo/client";

export const getLogos = gql`
  {
    logos {
      id
      price
      url
    }
  }
`;

export const getCartItems = gql`
  {
    cartItems {
      logo {
        id
        url
        price
      }
    }
  }
`;
