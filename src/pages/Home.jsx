import React from "react";
import Slider from "../components/Slider";
import LatestBooks from "../components/LatestBooks";
import Coverage from "../components/Coverage";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import WhatWeProvide from "../components/WhatWeProvide";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Slider />
      <LatestBooks />
      <Coverage />
      <WhyChoose />
      <HowItWorks />
      <WhatWeProvide />
      < Testimonials />
      < Newsletter />
    </div>
  );
};

export default Home;
