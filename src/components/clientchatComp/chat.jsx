import React from "react";
import { Images } from "../../assets/images";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useSocket } from "../../socket/socket";

const ClientChatComp = ({
  _id,
  index,
  setOpen,
  open,
  data,
  path,
  isOnline,
  notification,
}) => {
  console.log("data", notification);
  const { onlineUsers } = useSocket();
  return (
    <NavLink
      to={`/${path}/${_id}`}
      onClick={() => setOpen(!open)}
      key={index}
      className="chat-navlink"
    >
      <div className="w-[35px] h-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
        <img src={data?.otherMember?.avatar?.url} className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="f-col gap-0.5 w-full ">
        <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
          {data?.otherMember?.name}
        </span>
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-start items-start">
            {notification > 0 && (
              <span className="text-xs md:font-bold font-semibold capitalize">
                new message
              </span>
            )}
          </div>
          <div className="flex justify-end items-end">
            {isOnline && <div className="online-sign "></div>}
          </div>

          {/* <div className="online-sign"></div> */}
        </div>
      </div>
    </NavLink>
  );
};

export default ClientChatComp;
