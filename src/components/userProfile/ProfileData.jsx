import React from "react";
import ProfileComp from "../profileComp";
import DesComp from "../descComp";
import { CiEdit } from "react-icons/ci";
import ImageUploader from "../imageUploader";
import GenderComp from "../genderComp";
import City from "../city";
import PostalCode from "../postalCode";

const ProfileData = ({ userData, setModal, modal }) => {
  return (
    <div className="md:col-span-2 col-span-6 flex flex-col lg:gap-3 md:gap-2 gap-1 ">
      <div className="block_container">
        <ImageUploader avatar={userData?.user?.avatar?.url} />
        <div className="item-center flex-col">
          <div className="item-center gap-sm">
            <span className="lg:text-lg md:text-base text-sm text-black text-center capitalize font-bold">
              {userData?.user?.name}
            </span>
            <div onClick={() => setModal(!modal)}>
              <CiEdit className="icon" />
            </div>
          </div>
          <p className="lg:text-lg md:text-base text-sm text-black-50 lowercase font-medium break-all text-center">
            {userData?.user?.email}
          </p>
        </div>
      </div>
      <div className="block_container">
        <ProfileComp
          label={"your self"}
          data={userData?.user?.yourSelf}
          tooltip={"Edit your self"}
          Comp={DesComp}
        />
        <ProfileComp
          label={"gender"}
          data={userData?.user?.gender}
          tooltip={"Edit your gender"}
          Comp={GenderComp}
        />
        {/* <ProfileComp label={"DOB"} data={userData?.dob} Comp={DateSetter} /> */}
        {/* <ProfileComp label={"age"} data={userData?.age} /> */}
        <ProfileComp label={"city"} data={userData?.user?.city} Comp={City} />
        <ProfileComp
          label={"postal code "}
          data={userData?.user?.postalCode}
          Comp={PostalCode}
        />
      </div>
    </div>
  );
};

export default ProfileData;
