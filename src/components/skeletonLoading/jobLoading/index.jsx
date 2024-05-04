import React from "react";
import Skeleton from "react-loading-skeleton";

const JobSkeleton = () => {
  return (
    <div className="w-full general-pad h-full border-b-1 f-col md:gap-[20px] gap-1 border-gray-400">
      <div className="w-full h-[20px]">
        <Skeleton />
      </div>
      <div className="w-10/12 h-[20px]">
        <Skeleton />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap">
        <div className="h-[15px] w-full ">
          <Skeleton />
        </div>
        <div className="h-[15px] w-full ">
          <Skeleton />
        </div>
        <div className="h-[15px] w-full ">
          <Skeleton />
        </div>
        <div className="h-[15px] w-full ">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default JobSkeleton;
