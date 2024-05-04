import React from "react";

const BannerPic = ({ img }) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
  };
  return (
    <div data-aos="zoom-in" className="h-[400px] w-full landing-pad-x landing-pad-y" style={bgImage}></div>
  );
};

export default BannerPic;
