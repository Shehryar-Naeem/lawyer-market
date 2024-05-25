import React from "react";
import { Images } from "../../../assets/images";

const UserInfoData = ({ currentData }) => {
  return (
    <div className="md:col-span-2 col-span-6 flex flex-col lg:gap-3 md:gap-2 gap-1">
      <div className="w-full flex  gap-1 flex-col bg-white shadow-2xl lg:p-2 md:p-1 p-0.5 h-full">
        <div className="f-col gap w-full ">
          <div className="item-center">
            <div className="lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[70px] h-[70px]">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden shadow-2xl relative"
              >
                <img src={currentData?.user?.avatar?.url} alt="profile" />
              </label>
            </div>
          </div>
          <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
            <label htmlFor={"name"} className="input-lable">
              name:
            </label>
            <span className="md:text-base text-sm font-medium ">
              {currentData?.user?.name}
            </span>
          </div>
          <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
            <label htmlFor={"name"} className="input-lable">
              email:
            </label>
            <span className="md:text-base text-sm font-medium ">
              {currentData?.user?.email}
            </span>
          </div>
          <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
            <label htmlFor={"name"} className="input-lable">
              city:
            </label>
            <span className="md:text-base text-sm font-medium ">
              {currentData?.user?.city}
            </span>
          </div>
          <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
            <label htmlFor={"name"} className="input-lable">
              gender:
            </label>
            <span className="md:text-base text-sm font-medium ">
              {currentData?.user?.gender}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoData;
