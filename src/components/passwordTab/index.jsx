import React from "react";
import ProfileInputComp from "../ProfileInputComp";

const PasswordTab = () => {
  return (
    <div className="w-full h-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8 md:border-2 border-1 border-solid border-gray-400 general-pad md:rounded-xs rounded-xxs">
      <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
        update your password
      </h3>
      <div className="f-col gap h-full">
        <ProfileInputComp
          lable="old password"
          placeholder="Enter your old password"
          type="password"
        />
        <ProfileInputComp
          lable="new password"
          placeholder="Enter your new password"
          type="password"
        />
        <ProfileInputComp
          lable="confirm password"
          placeholder="Enter your confirm password"
          type="password"
        />
      </div>
      <button className="gig-btn">update</button>
    </div>
  );
};

export default PasswordTab;
