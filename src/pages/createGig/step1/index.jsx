import React, { useState } from "react";
import Stepper from "../../../components/Stepper";

const GigStepOne = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-1 md:gap-0.10 gap-0.8">
          <div className="bg-white shadow-xl lg:p-4xl md:p-3xl p-3xl">
            <Stepper />
          </div>
          <div className="f-col bg-white shadow-xl lg:p-4xl md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
            <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-0.10 md:gap-0.8 gap-sm">
              <div className="w-full lg:gap-0.10 md:gap-0.8 gap-sm f-col">
                <label className="text-black lg:text-xl md:text-lg text-base lg:font-black md:font-extrabold font-bold">
                  Gig Title
                </label>
                <textarea
                  type="text"
                  name="name"
                  rows={2}
                  id="name"
                  className="bg-gray-50 border  text-gray-900 small-btn-border-radius focus:ring-primary focus:border-primary block md:text-base text-sm md:font-semibold font-normal w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="w-full  ">
                <h3 className="capitalize text-gray-500 text-center md:text-lg text-base  md:font-bold font-medium">
                  Example title
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigStepOne;
