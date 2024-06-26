import React, { useEffect, useRef, useState } from "react";
import { Images } from "../../assets/images/index";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { Badge } from "primereact/badge";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/reducer/userReducer";
import { switchProfileType } from "../../redux/reducer/profileSlice";
import { userApi } from "../../redux/api/userApi";
import { useSocket } from "../../socket/socket";
import { isIncludeInOnlineUsers } from "../../contants/helper";
import Footer from "../../components/Footer/Footer";
const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onlineUsers } = useSocket();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currentProfileType } = useSelector((state) => state.profile);
  const roles =
    isAuthenticated && user && user.roles?.map((role) => role.roleType);
  let isOnlyClient =
    isAuthenticated &&
    roles.includes("client") &&
    !roles.includes("lawyer") &&
    !roles.includes("admin");
  const menuRight = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let redirectUrl;

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
      icon: "pi pi-cog",
      template: itemRenderer,
      command: () => {
        navigate("/client-profile/create-lawyer-account");
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

  useEffect(() => {
    if (isAuthenticated) {
      const roles = user.roles.map((role) => role.roleType);
      if (roles.includes("admin")) {
        redirectUrl = "admin";
      } else if (roles.includes("lawyer")) {
        redirectUrl = "lawyer";
      } else if (roles.includes("client")) {
        redirectUrl = "client";
      }
      if (
        redirectUrl === "admin" ||
        roles.includes("lawyer") ||
        roles.includes("client")
      ) {
        dispatch(switchProfileType("lawyer"));
      } else if (redirectUrl === "lawyer") {
        dispatch(switchProfileType("lawyer"));
      } else if (redirectUrl === "client") {
        dispatch(switchProfileType("client"));
      }
    }
  }, [isAuthenticated, user]);
  const toggleUser = () => {
    if (currentProfileType === "lawyer") {
      dispatch(switchProfileType("client"));
      navigate("/client-profile");
    } else if (currentProfileType === "client") {
      const isLaywerIncluded = user.roles.some(
        (role) => role.roleType === "lawyer"
      );
      if (isLaywerIncluded) {
        dispatch(switchProfileType("lawyer"));
        navigate("/lawyer-profile");
      } else {
        toast.error("You don't have a lawyer profile");
      }
    }
  };
  return (
    <>
      <div>
        <header className="shadow-2xl z-[999] sticky top-0 w-full lg:p-ly-pad md:p-md-ly-pad sm:p-sm-ly-pad p-xl bg-white">
          <nav className="flex-between">
            <div className="ml-1 lg:w-brand-logo  md:w-md-brand-logo w-sm-brand-logo h lg:h-brand-logo md:h-md-brand-logo h-sm-brand-logo">
              <NavLink to="/">
                <img
                  src={Images.brandLogo}
                  alt="brand_logo"
                  className="w-full h-full object-fill"
                />
              </NavLink>
            </div>
            <div
              className={`${
                isMobileMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row gap items-center md:relative absolute md:w-auto w-full left-0 top-full md:bg-transparent transition-all bg-white md:px-0 px-2 md:pb-0 pb-4 md:shadow-none shadow-lg`}
            >
              <NavLink
                to={"/gigs"}
                className="nav-link"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                gigs
              </NavLink>
              <NavLink
                to={"/jobs"}
                className="nav-link"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                Jobs
              </NavLink>
            </div>
            <div className="flex items-center gap">
              {!isAuthenticated ? (
                <div className="item-center">
                  {/* <img
                  src={Images.profileLogo}
                  alt="profile_logo"
                  className="lg:w-avatar md:w-md-avatar w-sm-avatar lg:h-avatar md:h-md-avatar h-sm-avatar overflow-hidden border-2 border-solid border-slate-gray p-xl rounded-full mr-1 md:cursor-pointer"
                /> */}
                  <Link to={"/join-now"} className="gig-btn">
                    Join now
                  </Link>
                </div>
              ) : (
                <>
                  <div className="item-center gap">
                    {redirectUrl !== "admin" && isAuthenticated && (
                      <span
                        className="cursor-pointer md:text-sm text-xs hover:underline font-bold text-grey"
                        onClick={toggleUser}
                      >
                        Switch to
                        {currentProfileType === "lawyer"
                          ? " client "
                          : " lawyer "}
                        profile
                      </span>
                    )}

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
                  <Menu
                    autoZIndex
                    baseZIndex={9999999}
                    closeOnEscape={true}
                    pt={cusmtomeStyle}
                    unstyled={true}
                    popup
                    ref={menuRight}
                    id="popup_menu_left"
                    model={items}
                    popupAlignment="right"
                  />
                </>
              )}
              <button
                className="text-black focus:outline-none md:hidden mr-0.5"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </nav>
        </header>
        <div>
          <Outlet />
          {/* {isOnline && ( */}
          {isIncludeInOnlineUsers(onlineUsers, user?._id) && (
            <div className="bg-gray-200 md:p-1 m-2 md:mr-[30px] mr-[24px] p-0.8 flex gap-1 fixed right-0 bottom-0 rounded-lg items-center">
              <span className="online-sign"></span>
              <span className="md:text-lg leading-none text-base text-green-400  font-semibold capitalize">
                online
              </span>
            </div>
          )}

          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Header;
