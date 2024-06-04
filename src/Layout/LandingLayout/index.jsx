import React, { useEffect, useRef, useState } from "react";
import { Images } from "../../assets/images";
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
import { RxCrossCircled } from "react-icons/rx";
const LandingLayout = ({ isFooter }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onlineUsers } = useSocket();

  const [menu, setMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currentProfileType } = useSelector((state) => state.profile);
  const roles =
    isAuthenticated && user && user?.roles?.map((role) => role.roleType);
  let isOnlyClient =
    isAuthenticated &&
    roles?.includes("client") &&
    !roles?.includes("lawyer") &&
    !roles?.includes("admin");
  let isAdmin = isAuthenticated && roles?.includes("admin");
  const isLawyerInclude = isAuthenticated && roles?.includes("lawyer");
  const menuRight = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef();
  const dropdown = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const itemRenderer = (item) => (
    <div
      className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
      onClick={item.command || null}
      aria-hidden="true"
      onHide={() => setMenu(!menu)}
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
    image: "h-full w-full rounded-full object-cover z-9",
  };
  const items = [
    {
      template: () => {
        return (
          <div
            className="md:cursor-pointer flex items-center md:p-2 sm:p-1 p-xl border-b-2 border-solid border-gray-200 md:hover:bg-gray-100"
            onClick={() => {
              navigate(isOnlyClient ? "/client-profile" : "/lawyer-profile");
            }}
            aria-hidden="popup_menu_right"
          >
            <div className="item-center">
              <Avatar
                image={user?.avatar?.url}
                className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full mr-1 object-cover cursor"
                imageAlt="user-profile"
                shape="circle"
                size="large"
                pt={customAvatar}
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
    isOnlyClient &&
      !isLawyerInclude && {
        label: "Settings",
        icon: "pi pi-cog",
        template: itemRenderer,
        command: () => {
          navigate("/settings/client-profile");
        },
      },

    isOnlyClient &&
      !isLawyerInclude && {
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
      "border-1 border-solid  border-slate-gray   lg:rounded-md md:rounded-sm rounded-xs md:mt-1 mt-[4px]  shadow-2xl overflow-hidden bg-white "
    ),
    menu: {
      className: classNames("m-0 p-0 list-none", "outline-none"),
    },
    submenuheader: classNames(
      "text-black md:text-base text-sm font-bold md:py-1 py-0.5 md:px-4 px-2 border-b-1 border-solid border-slate-gray "
    ),
  };

  useEffect(() => {
    let redirectUrl = "";
    if (isAuthenticated) {
      const roles = user?.roles?.map((role) => role.roleType);
      if (roles?.includes("admin")) {
        redirectUrl = "admin";
      } else if (roles?.includes("lawyer")) {
        redirectUrl = "lawyer";
      } else if (roles?.includes("client")) {
        redirectUrl = "client";
      }

      if (
        redirectUrl === "admin" ||
        roles?.includes("lawyer") ||
        roles?.includes("client")
      ) {
        dispatch(switchProfileType("lawyer"));
      } else if (redirectUrl === "lawyer") {
        dispatch(switchProfileType("lawyer"));
      } else if (redirectUrl === "client") {
        dispatch(switchProfileType("client"));
      }
    }
  }, [isAuthenticated, user, dispatch]);
  const toggleUser = () => {
    if (currentProfileType === "lawyer") {
      dispatch(switchProfileType("client"));
      navigate("/client-profile");
    } else if (currentProfileType === "client") {
      const isLaywerIncluded = user?.roles?.some(
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
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`/api/user/logout`, {
        withCredentials: true,
      });
      dispatch(userApi.util.resetApiState());
      dispatch(userNotExist());

      toast.success(data.message);
      navigate("/join-now");
      setDropdownOpen(!dropdownOpen);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      dispatch(userNotExist());
      navigate("/join-now");
    }
  };
  return (
    <>
      <div className="relative">
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
              // className={`${
              //   isMobileMenuOpen ? "flex" : "hidden"
              // } md:flex flex-col md:flex-row gap items-center md:relative absolute md:w-auto w-full left-0 top-full md:bg-transparent transition-all bg-white md:px-0 px-2 md:pb-0 pb-4 md:shadow-none shadow-lg`}
              className={`${
                isMobileMenuOpen ? "" : "md:translate-x-0 -translate-x-full"
              } flex md:items-center gap-1.5 md:relative fixed z-[9999] md:flex-row flex-col left-0 md:h-auto h-full top-0 md:w-auto w-full overflow-auto md:p-0 p-3 md:bg-transparent bg-white transition-all`}
            >
              <NavLink
                to={"/gigs"}
                className="nav-link"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                Gigs
              </NavLink>
              <NavLink
                to={"/jobs"}
                className="nav-link"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                Jobs
              </NavLink>
              <div
                className="md:hidden block absolute right-0 top-0 m-[25px] cursor-pointer text-xl"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                <RxCrossCircled />
              </div>
            </div>
            <div className="flex items-center gap-0.8">
              {!isAuthenticated ? (
                <div className="item-center">
                  {/* <img
                  src={Images.profileLogo}
                  alt="profile_logo"
                  className="lg:w-avatar md:w-md-avatar w-sm-avatar lg:h-avatar md:h-md-avatar h-sm-avatar overflow-hidden border-2 border-solid border-slate-gray p-xl rounded-full mr-1 md:cursor-pointer"
                /> */}
                  <Link to={"/join-now"} className="btn black-bg">
                    sign up
                  </Link>
                </div>
              ) : (
                <>
                  <div className="item-center gap">
                    {isAuthenticated && (
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

                    <div className="relative">
                      {/* <Avatar
                        image={user?.avatar?.url}
                        className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 object-cover cursor relative"
                        imageAlt="user-profile"
                        shape="circle"
                        size="large"
                        // id="popup_menu_right"
                        pt={customAvatar}
                        // onClick={(event) => {
                        //   menuRight.current.toggle(event);
                        // }}
                        // aria-controls="popup_menu_right"
                        // aria-haspopup
                        ref={trigger}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      /> */}
                      <img
                        src={user?.avatar?.url}
                        alt="profile_logo"
                        className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 object-cover cursor relative"
                        ref={trigger}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      />
                      <div
                        ref={dropdown}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setDropdownOpen(false)}
                        className={`absolute right-0 md:mt-4 mt-0.8 flex w-auto flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                          dropdownOpen === true ? "block" : "hidden"
                        }`}
                      >
                        <ul className="flex flex-col border-b border-stroke py-7.5 dark:border-strokedark">
                          <li>
                            <Link
                              className="md:cursor-pointer flex items-center md:p-2 sm:p-1 p-xl border-b-2 border-solid border-gray-200 md:hover:bg-gray-100"
                              // onClick={() => {
                              //   navigate(
                              //     isOnlyClient
                              //       ? "/client-profile"
                              //       : "/lawyer-profile"
                              //   );
                              // }}
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              to={
                                isOnlyClient
                                  ? "/client-profile"
                                  : "/lawyer-profile"
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
                            </Link>
                          </li>
                          {isLawyerInclude && (
                            <li>
                              <Link
                                className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
                                to={"/settings/profile"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <span
                                  className={`pi pi-cog xl:text-xl lg:text-lg text-base item-center`}
                                />
                                <span className="mx-2 md:font-bold font-semibold md:text-base text-sm ">
                                  Settings
                                </span>
                              </Link>
                            </li>
                          )}
                          {(isOnlyClient || !isLawyerInclude) && (
                            <li>
                              <Link
                                className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
                                to={"/settings/client-profile"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <span
                                  className={`pi pi-cog xl:text-xl lg:text-lg text-base item-center`}
                                />
                                <span className="mx-2 md:font-bold font-semibold md:text-base text-sm ">
                                  Settings
                                </span>
                              </Link>
                            </li>
                          )}
                          {(isOnlyClient || !isLawyerInclude) && (
                            <li>
                              <Link
                                className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
                                to={"/client-profile/create-lawyer-account"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <span
                                  className={`pi pi-user xl:text-xl lg:text-lg text-base item-center`}
                                />
                                <span className="mx-2 md:font-bold font-semibold md:text-base text-sm ">
                                  create lawyer account
                                </span>
                              </Link>
                            </li>
                          )}
                          {isAdmin && (
                            <li>
                              <Link
                                className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
                                to={"/dashboard/admin/home"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <span
                                  className={`pi pi-user-edit xl:text-xl lg:text-lg text-base item-center`}
                                />
                                <span className="mx-2 md:font-bold font-semibold md:text-base text-sm ">
                                  Admin
                                </span>
                              </Link>
                            </li>
                          )}
                        </ul>
                        <div>
                          <div
                            className="flex items-center md:gap-1 gap-sm md:px-2 px-md-ly-pad md:py-1 sm:py-sm-ly-pad py-4xl  hover:bg-gray-100 md:cursor-pointer"
                            to={"/dashboard/admin/home"}
                            onClick={logoutHandler}
                          >
                            <span
                              className={`pi pi-sign-out xl:text-xl lg:text-lg text-base item-center`}
                            />
                            <span className="mx-2 md:font-bold font-semibold md:text-base text-sm ">
                              Logout
                            </span>
                          </div>
                        </div>
                        {/* <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                              fill=""
                            />
                            <path
                              d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                              fill=""
                            />
                          </svg>
                          Log Out
                        </button> */}
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <Menu
                      // autoZIndex
                      // baseZIndex={9999999}
                      appendTo={document.body || "self"}
                      closeOnEscape={true}
                      // pt={cusmtomeStyle}
                      className="w-auto mt-1"
                      // unstyled={true}
                      popup={true}
                      ref={menuRight}
                      aria-hidden={!menu}
                      id="popup_menu_right"
                      model={items}
                      popupAlignment="right"
                    />
                  </div> */}
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
          <div>
            <Outlet />
            {/* {isOnline && ( */}
            {isIncludeInOnlineUsers(onlineUsers, user?._id) && (
              <div className="bg-gray-200 md:p-1 m-2 md:mr-[30px] mr-[24px] p-0.8 flex gap-1 fixed left-0  z-[9999] bottom-0 rounded-lg items-center">
                <span className="online-sign"></span>
                <span className="md:text-lg leading-none text-base text-green-400  font-semibold capitalize">
                  online
                </span>
              </div>
            )}

            {/* )} */}
          </div>
        </div>

        {isFooter && <Footer />}
      </div>
    </>
  );
};

export default LandingLayout;
