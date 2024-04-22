import React, { useEffect, useRef } from "react";
import { Images } from "../../../assets/images";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { Badge } from "primereact/badge";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { userNotExist } from "../../../redux/reducer/userReducer";
import { switchProfileType } from "../../../redux/reducer/profileSlice";
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currentProfileType } = useSelector((state) => state.profile);
  console.log(currentProfileType);
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
            onClick={() => navigate("/lawyer-profile")}
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
    {
      label: "Settings",
      icon: "pi pi-cog",
      template: itemRenderer,
      command: () => {
        navigate("/settings/profile");
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

          dispatch(userNotExist());

          toast.success(data.message);
          navigate("/");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
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

      if (redirectUrl === "lawyer") {
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
    <header className="shadow-2xl z-9 sticky top-0 w-full lg:p-ly-pad md:p-md-ly-pad sm:p-sm-ly-pad p-xl bg-white">
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
        <nav className="item-center">
          <ul className="flex gap">
            <li className="lg:text-lg  hover:underline md:text-base text-sm capitalize md:font-bold font-semibold">
              <NavLink to={"/gigs"}>gigs</NavLink>
            </li>
          </ul>
        </nav>
        {!isAuthenticated ? (
          <div className="item-center">
            <img
              src={Images.profileLogo}
              className="lg:w-avatar md:w-md-avatar w-sm-avatar lg:h-avatar md:h-md-avatar h-sm-avatar overflow-hidden border-2 border-solid border-slate-gray p-xl rounded-full mr-1 md:cursor-pointer"
            />
          </div>
        ) : (
          <>
            <div className="item-center gap">
              {redirectUrl !== "admin" && (
                <span
                  className="md:w-auto w-[60px] cursor-pointer md:text-sm text-xs hover:underline font-bold text-grey"
                  onClick={toggleUser}
                >
                  Switch to
                  {currentProfileType === "lawyer" ? " client " : " lawyer "}
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
      </nav>
    </header>
  );
};

export default Header;
