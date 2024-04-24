import React from "react";
import { Images } from "../../assets/images";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ChatComp = ({ data, index,setOpen,open }) => {
  return (
    <Link
      to={`/lawyer-profile/chat/${data}`}
      onClick={() => setOpen(!open)}
      key={index}
      className="flex gap w-full items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-400"
    >
      <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
        <img src={Images.client} className="rounded-full" />
      </div>
      <div className="f-col gap-0.5 w-full ">
        <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
          name
        </span>
        <div className="flex w-full justify-between items-center">
          <span className="text-xs  md:font-bold font-semibold capitalize">
            3 message
          </span>
          <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
        </div>
      </div>
    </Link>
  );
};

export default ChatComp;
