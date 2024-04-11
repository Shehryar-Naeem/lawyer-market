import React from "react";

const PageHeading = ({ text }) => {
  return (
    <div className="item-center">
      <h2 className="shadow-2xl bg-gradient md:py-0.5 md:px-3 py-lg px-2 capitalize md:font-black font-bold md:text-xl text-lg">{text}</h2>
    </div>
  );
};

export default PageHeading;
