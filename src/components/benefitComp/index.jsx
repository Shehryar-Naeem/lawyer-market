import React from "react";

const BenefitComp = ({ benefit, key }) => {
  return (
    <div
      class="bg-gray-200 rounded-md hover:bg-gray-300 w-full  md:cursor-pointer cursor-auto transition-all  shadow-sm  shadow-gray-100 p-6  flex flex-col items-center justify-center lg:gap-2 md:gap-1 gap-0.8"
      key={key}
    >
      <h3 class="text-black text-2xl px-[40px] font-bold text-center leading-none">
        {benefit.title}
      </h3>
      <p className="md:text-base text-sm font-medium text-gray-500 tracking-wide leading-tigh">
        {benefit.description}
      </p>
      {/* <button
        class="mt-auto w-full md:text-base text-sm font-black text-white bg-transparent rounded border border-white px-6 py-2 transition duration-300"
        type="button"
      >
        Find a Job
      </button> */}
    </div>
  );
};

export default BenefitComp;
