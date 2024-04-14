import React from "react";

const ProfileInputComp = ({ lable, placeholder, type }) => {
  return (
    <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
      <label for={lable} class="input-lable">
        {lable}
      </label>
      <input
        type={type}
        id={lable}
        class="border border-primary text-primary placeholder-black  md:text-lg text-sm small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
        placeholder={placeholder}
      />
    </div>
  );
};

export default ProfileInputComp;
