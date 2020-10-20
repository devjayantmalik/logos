import React from "react";
import CartCard from "./CartCard";
import { useQuery, useMutation } from "@apollo/client";
import { getCartItems } from "../graphql/queries";
import Loading from "./Loading";
import { ILogo } from "./LogosList";
import { removeFromCart } from "../graphql/mutations";

interface ICartItem {
  logo: ILogo;
}

const Cart = () => {
  const { loading, error, data } = useQuery(getCartItems);
  const [removeItem] = useMutation(removeFromCart);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <div>Error Occured, please check console for more details...</div>;
  }

  const handleRemoveItemClick = (id: string): void => {
    // Remove item from cart
    removeItem({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: getCartItems,
        },
      ],
    });
  };

  const { cartItems } = data;

  let total_price = 0;
  cartItems.forEach((item: ICartItem) => {
    total_price += item.logo.price;
  });
  return (
    <div>
      <h1>Cart</h1>
      <p>Total Price: {total_price}</p>

      {cartItems.map(({ logo }: ICartItem) => (
        <CartCard
          key={logo.id}
          image={logo.url}
          price={logo.price}
          onRemove={() => handleRemoveItemClick(logo.id)}
        />
      ))}
    </div>
  );
};

export default Cart;
