import React from "react";
import CarouselHeader from "../../components/main/CarouselHeader";
import MainCategories from "../../components/main/MainCategories";
import SellingProposition from "../../components/main/SellingProposition";
import SubCategory from "../../components/main/SubCategory";
import Testtimonials from "../../components/main/Testtimonials";
import Trusted from "../../components/main/Trusted";

const Home = () => {
  return (
    <div className="pageHome">
      <CarouselHeader />
      <Trusted />
      <SubCategory />
      <SellingProposition />
      <Testtimonials />
      <MainCategories />
    </div>
  );
};

export default Home;
