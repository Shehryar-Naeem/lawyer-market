import React from "react";

const LandingHeading = ({ text }) => {
  return (
    <h1 data-aos="fade-up" className=" my-4 border-l-8 border-primary/50 py-2 pl-2 lg:text-[30px] md:text-2xl text-xl md:font-bold font-semibold capitalize">
      {text}
    </h1>
  );
};

export default LandingHeading;
