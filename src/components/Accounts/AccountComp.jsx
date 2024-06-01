import React, { useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { Images } from "../../assets/images";
import {
  useDeleteMeRolesMutation,
  useGetUserQuery,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../utils/helper";

const AccountComp = ({ role, key }) => {
  const [deleteMeRoles, { isLoading, isError, error }] =
    useDeleteMeRolesMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData, error: userError, refetch } = useGetUserQuery();

  const loadingRef = useRef(null);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  useEffect(() => {
    if (isLoading && !loadingRef.current) {
      loadingRef.current = toast.loading("Loading...");
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && loadingRef.current) {
      toast.dismiss(loadingRef.current);
      loadingRef.current = null;
    }
  }, [isLoading]);

  const handleDelete = async (id, role) => {
    try {
      const data = {
        role: role,
      };
      const response = await deleteMeRoles(data);
      refetch();
      if (response?.data?.success) {
        toast.success(response?.data?.message);

        dispatch(userExist(userData?.user));
        const roles =
          userData?.user && userData?.user?.roles.map((role) => role.roleType);

        if (roles?.includes("admin")) {
          navigate("/dashboard/admin/home", { replace: true });
        } else if (roles?.includes("lawyer")) {
          navigate("/lawyer-profile", { replace: true });
        } else if (roles?.includes("client")) {
          navigate("/client-profile", { replace: true });
        } else {
          navigate("/join-now", { replace: true });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* {role?.roleType === "lawyer" && (
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
          <button className="delete-btn" onClick={() => console.log("delete")}>
            <MdDelete />
          </button>
        </div>
      )}
      {role?.roleType === "client" && (
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
          <button className="delete-btn" onClick={() => console.log("delete")}>
            <MdDelete />
          </button>
        </div>
      )}
      {role?.roleType === "admin" && (
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
          <button className="delete-btn" onClick={() => console.log("delete")}>
            <MdDelete />
          </button>
        </div>
      )} */}

      {
        <div className="flex justify-between gap  md:pb-0.5 pb-[3px] border-b border-gray-400 ">
          <div className="flex md:gap-1 gap-0.8 items-center">
            {role?.roleType === "client" ? (
              <img
                alt="logo"
                src={Images.client}
                className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
              />
            ) : role?.roleType === "lawyer" ? (
              <img
                alt="logo"
                src={Images.lawyer}
                className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
              />
            ) : role?.roleType === "admin" ? (
              <span className="pi pi-user-edit lg:text-[30px] md:text-[25px] text-[20px]" />
            ) : (
              ""
            )}
            <div className="f-col gap">
              <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold ">
                {role?.roleType}
              </p>
              <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold text-wrap break-all">
                {role?._id}
              </p>
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={() => handleDelete(role?._id, role?.roleType)}
          >
            <MdDelete />
          </button>
        </div>
      }
    </>
  );
};

export default AccountComp;
