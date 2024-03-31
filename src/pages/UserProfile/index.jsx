import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import UserModel from "../../components/updateUser";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import ProfileComp from "../../components/profileComp";
import DesComp from "../../components/descComp";
import GenderComp from "../../components/genderComp";
import DateSetter from "../../components/datePicker";
import PostalCode from "../../components/postalCode";
import City from "../../components/city";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LawyerDetail from "../../components/Lawyer/details";
import Gigs from "../../components/Lawyer/gigs";
import Bid from "../../components/Lawyer/bids";
import Chat from "../../components/Lawyer/chats";
import { NavLink, Outlet } from "react-router-dom";
import AlertMessage from "../../components/alertMessage";
import { Images } from "../../assets/images";
import { Image } from "antd";

const UserProfile = () => {
  const {
    data: userData,
    isLoading: userLoading,
    isSuccess: userSuccess,
    isError: userIsError,
    error: userError,
  } = useGetUserQuery();

  const [modal, setModal] = useState(false);
  const [updateUser, { error, data, isSuccess }] = useUpdateUserMutation();
  const [infoAlet, setInfoAlert] = useState(false);
  const diaptch = useDispatch();
  useEffect(() => {
    if (userSuccess) {
      toast.success(userData?.message);
      setModal(false);
      diaptch(userExist(userData?.user));
    }
    if (userIsError) {
      toast.error(userError.data?.message);
    }
    if (userData.isProfileComplete) {
      setInfoAlert(true);
    }
  }, [isSuccess, diaptch, error, data]);
  const content = (
    <div className="flex-between">
      <div className="flex md:gap-1 gap-0.8 items-center">
        <img
          alt="logo"
          src={Images.info}
          className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
        />
        <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold ">
          complete your profile.
        </p>
      </div>
      <div>
        <img
          src={Images.close}
          alt="close"
          className="md:w-md-icon-width w-sm-icon-width md:h-md-icon-height h-sm-icon-height cursor"
          onClick={() => setInfoAlert(false)}
        />
      </div>
    </div>
  );
  return (
    <>
      {userLoading ? (
        <p>loading</p>
      ) : (
        <>
          <div className="bg-gray-100 h-full">
            <div className="container f-col gap-1 m-auto layout-pad">
              {infoAlet && (
                <AlertMessage
                  content={content}
                  severity="info"
                  icon={Images.info}
                />
              )}
              <div className="grid lg:gap-3 md:gap-2 sm:gap-1 gap-sm md:grid-cols-5 grid-cols-6 ">
                <div className="md:col-span-2 col-span-6 flex flex-col md:gap-1 gap-sm">
                  <div className="block_container">
                    <ImageUploader />
                    <div className="item-center flex-col">
                      <div className="item-center gap-sm">
                        <span className="lg:text-lg md:text-base text-sm text-black text-center capitalize font-bold">
                          {userData?.name}
                        </span>
                        <div onClick={() => setModal(!modal)}>
                          <CiEdit className="icon" />
                        </div>
                      </div>
                      <p className="lg:text-lg md:text-base text-sm text-black-50 lowercase font-medium break-all text-center">
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                  <div className="block_container">
                    <ProfileComp
                      label={"your self"}
                      data={userData?.yourSelf}
                      tooltip={"Edit your self"}
                      Comp={DesComp}
                    />
                    <ProfileComp
                      label={"gender"}
                      data={userData?.gender}
                      tooltip={"Edit your gender"}
                      Comp={GenderComp}
                    />
                    {/* <ProfileComp label={"DOB"} data={userData?.dob} Comp={DateSetter} /> */}
                    {/* <ProfileComp label={"age"} data={userData?.age} /> */}
                    <ProfileComp
                      label={"city"}
                      data={userData?.city}
                      Comp={City}
                    />
                    <ProfileComp
                      label={"postal code "}
                      data={userData?.postalCode}
                      Comp={PostalCode}
                    />
                  </div>
                </div>
                <div className="md:col-span-3 col-span-6 flex flex-col md:gap-1 gap-sm">
                  <div className="h-full w-full flex gap-1 flex-col bg-white shadow-2xl lg:p-2 md:p-1 p-0.5">
                    <div className="flex w-full overflow-auto">
                      <NavLink
                        to={"/user-profile"}
                        end
                        className={"underline-tab"}
                      >
                        lawyer info
                      </NavLink>
                      <NavLink
                        to={"/user-profile/gigs"}
                        className={"underline-tab"}
                        end
                      >
                        gigs
                      </NavLink>
                      <NavLink
                        to={"/user-profile/bids"}
                        className={"underline-tab"}
                        end
                      >
                        bids
                      </NavLink>
                      <NavLink
                        to={"/user-profile/chat"}
                        className={"underline-tab"}
                        end
                      >
                        chat
                      </NavLink>
                    </div>

                    <div>
                      <Outlet />
                    </div>
                    {/* <TabPanel>
                    <Outlet />
                  </TabPanel>
                  <TabPanel>
                    <Gigs />
                  </TabPanel>
                  <TabPanel>
                    <Bid />
                  </TabPanel>
                  <TabPanel>
                    <Chat />
                  </TabPanel> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {modal && (
        <UserModel
          modal={modal}
          setModal={setModal}
          name={userData?.name}
          email={userData?.email}
          updateUser={updateUser}
        />
      )}
    </>
  );
};

export default UserProfile;
