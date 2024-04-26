import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserModel from "../../components/updateUser";
import {
  useGetUserQuery,
  useLawyerPrfofileQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";

import { NavLink, Outlet } from "react-router-dom";
import AlertMessage from "../../components/alertMessage";
import { Images } from "../../assets/images";

import ProfileData from "../../components/userProfile/ProfileData";
import { Create } from "@mui/icons-material";

const CreateLawyerAccount = () => {
  const {
    data: userData,
    isLoading: userLoading,
    isSuccess: userSuccess,
    isError: userIsError,
    error: userError,
    refetch,
  } = useGetUserQuery();
  const { data: lawyerData, isLoading: isLawyerLoading } =
    useLawyerPrfofileQuery();

  const [modal, setModal] = useState(false);
  const [updateUser, { error, data, isSuccess, isLoading }] =
    useUpdateUserMutation();
  const [infoAlet, setInfoAlert] = useState(false);
  const diaptch = useDispatch();
  useEffect(() => {
    // if (userSuccess) {
    //   diaptch(userExist(userData?.user));
    // }
    if (userIsError) {
      toast.error(userError.data?.message);
    }
    if (userData?.isProfileComplete || lawyerData?.message) {
      setInfoAlert(true);
    }
    if (isSuccess) {
      toast.success(data?.message);
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
          <div className="page-container">
            <div className="container f-col gap-1 m-auto layout-pad">
              {infoAlet && (
                <AlertMessage
                  content={content}
                  severity="info"
                  icon={Images.info}
                />
              )}
              <div className="grid lg:gap-3 md:gap-2 gap-1 grid-cols-6">
                <ProfileData
                  userData={userData}
                  modal={modal}
                  setModal={setModal}
                />
                <div className="md:col-span-4 col-span-6 flex flex-col md:gap-1 gap-sm">
                  <div className="h-full w-full flex gap-1 flex-col bg-white shadow-2xl lg:p-2 md:p-1 p-0.5">
                    <div className="flex w-full overflow-auto">
                      <NavLink
                        to={"/client-profile/create-lawyer-account"}
                        end
                        className={"underline-tab"}
                      >
                        Create lawyer Account
                      </NavLink>
                    </div>

                    <div className="h-full">
                      <Outlet />
                    </div>
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
          name={userData?.user?.name}
          email={userData?.user?.email}
          updateUser={updateUser}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default CreateLawyerAccount;
