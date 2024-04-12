import React, { useState } from "react";
import Stepper from "../../../components/Stepper";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import BlackBtn from "../../../components/BlackBtn";
import {
  additionalServices,
  lawyerCategories,
  lawyerServices,
} from "../../../data";
import PageHeading from "../../../components/pageHeading";
import { LuPencilLine } from "react-icons/lu";
import { Images } from "../../../assets/images";
import { useGigstepThreeMutation } from "../../../redux/api/userApi";

const GigStepThree = () => {
   
  const [gigstepThree,{error,isError,isLoading}]= useGigstepThreeMutation()

  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <div className="bg-white md:shadow-lg shadow-md lg:p-4xl md:p-3xl p-3xl">
            <Stepper step={2} />
          </div>
          <PageHeading text="gallery" />
          <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
            <h3 className="lg:text-2xl md:text-xl text-lg capitalize font-extrabold ">
              your services gallery
            </h3>
            <div className="max-w-[500px] m-auto w-full general-pad md:shadow-lg shadow-md ">
              <label
                htmlFor="gallery-images"
                className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  overflow-hidden relative small-btn-border-radius lg:p-2 md:p-1 p-0.10"
              >
                <img
                  src={Images.upload}
                  className="lg:w-[100px] md:w-[80px] w-[60px] "
                />
                <p className="lg:text-lg md:text-base text-sm text-center capitalize md:font-extrabold font-bold">
                  upload your services in a gallery or{" "}
                  <span className="md:font-black">browse</span>
                </p>
                <input id="gallery-images" type="file" className="hidden" />
              </label>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-1 md:gap-0.10 gap-0.8 ">
                <div className="shadow-xl general-pad small-btn-border-radius w-full h-full block">
                </div>
                <div className="shadow-xl general-pad small-btn-border-radius w-full h-full block">
                </div>
                <div className="shadow-xl general-pad small-btn-border-radius w-full h-full block">
                </div>
                <div className="shadow-xl general-pad small-btn-border-radius w-full h-full block">
                </div>
                <div className="shadow-xl general-pad small-btn-border-radius w-full h-full block">
                </div>
            </div>
            <div className="flex items-end justify-end">
              <button type="submit" className="gig-btn">
                save and continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigStepThree;
