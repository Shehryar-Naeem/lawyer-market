import React from "react";
import { MdDelete } from "react-icons/md";
import { Images } from "../../assets/images";

const AccountComp = ({ role, key }) => {
  return (
    <>
      {role?.roleType === "lawyer" && (
        <div className="flex-between">
          <div className="flex md:gap-1 gap-0.8 items-center">
            <img
              alt="logo"
              src={Images.lawyer}
              className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
            />
            <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold ">
              {role?.roleType}
            </p>
          </div>
          <button
            className="flex items-center justify-center bg-primary hover:bg-slate-600 md:text-base text-sm text-white rounded-full md:h-8 md:w-8 h-6 w-6"
            onClick={() => console.log("delete")}
          >
            <MdDelete />
          </button>
        </div>
      )}
      {
        role?.roleType === "client" && (
          <div className="flex-between">
            <div className="flex md:gap-1 gap-0.8 items-center">
              <img
                alt="logo"
                src={Images.ProfilImg}
                className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
              />
              <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold ">
               {role?.roleType}
              </p>
            </div>
            <button
              className="flex items-center  justify-center md:text-base text-sm bg-primary hover:bg-slate-600 text-white rounded-full md:h-8 md:w-8 h-6 w-6"
              onClick={() => console.log("delete")}
            >
              <MdDelete />
            </button>
          </div>
        )
      }
      {
        role?.roleType === "admin" && (
          <div className="flex-between">
            <div className="flex md:gap-1 gap-0.8 items-center">
              <img
                alt="logo"
                src={Images.client}
                className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
              />
              <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold ">
               {role?.roleType}
              </p>
            </div>
            <button
              className="flex items-center justify-center md:text-base text-sm bg-primary hover:bg-slate-600 text-white rounded-full md:h-8 md:w-8 h-6 w-6"
              onClick={() => console.log("delete")}
            >
              <MdDelete />
            </button>
          </div>
        )
      }
    </>
  );
};

export default AccountComp;
