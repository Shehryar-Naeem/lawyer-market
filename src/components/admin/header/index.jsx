import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { Images } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userNotExist } from "../../../redux/reducer/userReducer";
import axios from "axios";
import { userApi } from "../../../redux/api/userApi";

const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const roles =
    isAuthenticated && user && user.roles?.map((role) => role.roleType);

  let isOnlyClient =
    isAuthenticated &&
    roles.includes("client") &&
    !roles.includes("lawyer") &&
    !roles.includes("admin");
  let isAdmin = isAuthenticated && roles.includes("admin");

  const menuRight = useRef(null);
  const itemRenderer = (item) => (
    <div
      className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
      onClick={item.command || null}
    >
      <span
        className={`${item.icon} xl:text-xl lg:text-lg text-base item-center`}
      />
      <span className="mx-2 md:font-bold font-semibold md:text-base text-sm ">
        {item.label}
      </span>
    </div>
  );
  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };
  const items = [
    {
      template: () => {
        return (
          <div
            className="md:cursor-pointer flex items-center md:p-2 sm:p-1 p-xl border-b-2 border-solid border-gray-200 md:hover:bg-gray-100"
            onClick={() =>
              navigate(isOnlyClient ? "/client-profile" : "/lawyer-profile")
            }
          >
            <div className="item-center">
              <Avatar
                image={user?.avatar?.url}
                className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full mr-1 object-cover cursor"
                imageAlt="user-profile"
                shape="circle"
                size="large"
                pt={customAvatar}
                onClick={(event) => menuRight.current.toggle(event)}
                aria-controls="popup_menu_left"
                aria-haspopup
              />
            </div>
            <div className="flex-col leading-none justify-center">
              <h3 className="md:text-base text-sm text-black capitalize md:font-bold font-medium">
                {user && user?.name}
              </h3>
              <p className="md:text-sm text-xs text-gray-400 lowercase md:font-bold font-medium">
                {user && user?.email}
              </p>
            </div>
          </div>
        );
      },
    },
    !isOnlyClient && {
      label: "Settings",
      icon: "pi pi-cog",
      template: itemRenderer,
      command: () => {
        navigate("/settings/profile");
      },
    },
    isOnlyClient && {
      label: "create lawyer account",
      icon: "pi pi-user",
      template: itemRenderer,
      command: () => {
        navigate("/client-profile/create-lawyer-account");
      },
    },
    isAdmin && {
      label: "Admin",
      icon: "pi pi-user-edit",
      template: itemRenderer,
      command: () => {
        navigate("/dashboard/admin/home");
      },
    },

    {
      label: "Logout",
      icon: "pi pi-sign-out",

      template: itemRenderer,
      command: async () => {
        try {
          const { data } = await axios.get(`/api/user/logout`, {
            withCredentials: true,
          });
          dispatch(userApi.util.resetApiState());
          dispatch(userNotExist());

          toast.success(data.message);
          navigate("/join-now");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
          dispatch(userNotExist());
          navigate("/join-now");
        }
      },
    },
  ];

  const cusmtomeStyle = {
    root: classNames(
      "border-1 border-solid border-slate-gray lg:rounded-md md:rounded-sm rounded-xs md:mt-1 mt-1  shadow-2xl overflow-hidden bg-white "
    ),
    menu: {
      className: classNames("m-0 p-0 list-none", "outline-none"),
    },
    submenuheader: classNames(
      "text-black md:text-base text-sm font-bold md:py-1 py-0.5 md:px-4 px-2 border-b-1 border-solid border-slate-gray "
    ),
  };
  return (
    <header className="flex w-full md:shadow-md shadow-sm bg-white ">
      <div className="flex flex-grow  items-center lg:justify-end justify-between md:p-1.5 p-1 ">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-xxs border  bg-white p-0.8  lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link> */}
        </div>
        <div className="flex justify-end items-center">
          <Avatar
            image={user?.avatar?.url}
            className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full mr-1 object-cover cursor"
            imageAlt="user-profile"
            shape="circle"
            size="large"
            pt={customAvatar}
            onClick={(event) => menuRight.current.toggle(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
          />

          <Menu
            autoZIndex
            baseZIndex={9999999}
            closeOnEscape={true}
            // pt={cusmtomeStyle}
            // unstyled={true}
            className="w-auto mt-1"

            popup
            ref={menuRight}
            id="popup_menu_left"
            model={items}
            popupAlignment="right"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
