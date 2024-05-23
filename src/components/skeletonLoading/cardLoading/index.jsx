import React from "react";

import Skeleton from "react-loading-skeleton";
import GigCard from "../../card";
const CardSkeletonLoading = () => {
  return (
    <>
      <div className="f-col md:gap-1 gap-sm justify-start md:w-full w-[200px]">
        <div className="card-h">
          <div className="h-full">
            <Skeleton className="w-full h-full md:rounded-sm rounded-xs" />
          </div>
        </div>
        <div className="f-col md:gap-1 sm:gap-sm gap-xs">
          <div className="flex md:gap-1 sm:gap-sm gap-xs items-center">
            <Skeleton
              circle
              className="lg:w-sm-img md:w-xs-img lg:h-sm-img md:h-xs-img w-[30px] h-[30px] p-0"
            />
            <div className="w-full">
              <Skeleton className="lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm p-0" />
            </div>
          </div>
          <Skeleton className="w-3/4 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm p-0" />
          <Skeleton className="w-1/2 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm p-0" />
          <Skeleton className="w-1/4 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm p-0" />
        </div>
      </div>
      {/* <GigCard/> */}
    </>
  );
};

export default CardSkeletonLoading;
