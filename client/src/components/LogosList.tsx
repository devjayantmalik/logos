import React from "react";
import LogoCard from "./LogoCard";
import { useMutation, useQuery } from "@apollo/client";
import { getLogos, getCartItems } from "../graphql/queries";
import Loading from "./Loading";
import { addToCart } from "../graphql/mutations";

export interface ILogo {
  id: string;
  url: string;
  price: number;
}

const LogosList = () => {
  const { loading, error, data } = useQuery(getLogos);
  const [addItem] = useMutation(addToCart);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <div>Error Occured, check console for more details...</div>;
  }

  function handleAddItemClick(id: string) {
    // add item to cart
    addItem({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: getCartItems,
        },
      ],
    });
  }

  const logos = data.logos;

  return (
    <div id="logos">
      {logos.map((logo: ILogo) => (
        <LogoCard
          key={logo.id}
          image={logo.url}
          price={logo.price}
          onAddToCart={() => handleAddItemClick(logo.id)}
        />
      ))}
    </div>
  );
};

export default LogosList;
