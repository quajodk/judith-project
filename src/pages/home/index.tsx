import React from "react";
import HeroBg from "../../components/HeroBg";
import ProductList from "../../components/ProductList";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <HeroBg />
      <ProductList />
    </div>
  );
};

export default HomePage;
