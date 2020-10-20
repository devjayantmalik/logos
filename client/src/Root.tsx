import React from "react";
import Cart from "./components/Cart";
import LogosList from "./components/LogosList";

const Root = () => {
  return (
    <main>
      <section id="section-logos">
        <h1 className="title-centered">Buy a logo</h1>
        <LogosList />
      </section>
      <section id="section-cart">
        <Cart />
      </section>
    </main>
  );
};

export default Root;
