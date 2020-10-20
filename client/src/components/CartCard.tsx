import React from "react";

export interface ICartCardProps {
  image: string;
  price: number;
  onRemove: () => void;
}

const CartCard: React.FC<ICartCardProps> = ({ image, price, onRemove }) => {
  return (
    <article id="card-cart">
      <img src={image} alt="cart item logo" />

      <div>
        <p className="label">Rs. {price}</p>
        <button onClick={onRemove}>Remove</button>
      </div>
    </article>
  );
};

export default CartCard;
