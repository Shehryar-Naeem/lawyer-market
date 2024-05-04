import React from "react";
import { MdOutlineNotInterested } from "react-icons/md";

const Empty = ({ text }) => {
  return (
    <div className="h-[200px] item-center capitalize f-col gap">
      <p className="lg:text-8xl md:text-7xl text-6xl lg:font-extrabold md:font-bold font-semibold text-gray-500">
        <MdOutlineNotInterested />
      </p>
      <p className="lg:text-2xl md:text-xl text-lg md:font-black font-bold text-gray-400">
        {text}
      </p>
    </div>
  );
};

export default Empty;
