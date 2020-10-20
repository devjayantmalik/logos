import React from "react";

export interface ILogoCardProps {
  image: string;
  price: number;
  onAddToCart: () => void;
}

const LogoCard: React.FC<ILogoCardProps> = ({ image, price, onAddToCart }) => {
  return (
    <article id="card-logo">
      <img src={image} alt="logo" />

      <div>
        <p className="label">Rs {price}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
      </div>
    </article>
  );
};

export default LogoCard;
