import React from "react";

const ProfileInputComp = ({ lable, placeholder, type, register, name }) => {
  return (
    <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
      <label htmlFor={name} class="input-lable">
        {lable}
      </label>
      <input
        type={type}
        id={name}
        className="profile-input"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default ProfileInputComp;
