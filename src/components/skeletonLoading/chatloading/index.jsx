import React from "react";
import Skeleton from "react-loading-skeleton";

const ChatLoading = ({index}) => {
  return (
    <div className=" w-full h-[43px] items-center bg-gray-300  md:rounded-sm rounded-xs "key={index}>
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default ChatLoading;
