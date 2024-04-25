import React from "react";
import Skeleton from "react-loading-skeleton";

const GigDetailLoading = () => {
  return (
      <Skeleton className="w-full h-full lg:rounded-2xl md:rounded-xl sm:rounded-lg rounded-md" />
  );
};

export default GigDetailLoading;
