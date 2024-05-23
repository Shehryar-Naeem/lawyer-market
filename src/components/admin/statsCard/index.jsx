import React from "react";

const StatsCard = ({ text, Icon, num }) => {
  return (
    <div className="lg:p-2 md:p-1.5 p-1 h-[130px] md:shadow-md shadow-sm bg-white flex  items-center justify-center lg:gap-2 md:gap-1.5 gap-1">
      <div className="general-pad bg-gray-100 text-gray-500 item-center rounded-full lg:text-[40px] md:text-[30px] text-xl = ">
        <Icon />
      </div>
      <div className="f-col gap items-center justify-center">
        <h3 className="lg:text-3xl text-center md:text-2xl text-xl md:font-bold sm:font-semibold text-gray-600 capitalize" >
          {text}
        </h3>
        <h5 className="lg:text-2xl text-center  md:text-xl text-lg md:font-semibold font-medium text-black capitalize">
          {num}
        </h5>
      </div>
    </div>
  );
};

export default StatsCard;
