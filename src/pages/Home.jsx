import React from "react";
import Slider from "../components/Slider";
import LatestBooks from "../components/LatestBooks";
import Coverage from "../components/Coverage";
import WhyChoose from "../components/WhyChoose";

const Home = () => {
  return (
    <div>
      <Slider />
      <LatestBooks />
      <Coverage />
      <WhyChoose />
    </div>
  );
};

export default Home;
