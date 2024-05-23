import React from "react";
import { useMeHiredJobsQuery } from "../../redux/api/userApi";
import JobSkeleton from "../skeletonLoading/jobLoading";
import Empty from "../empty";
import HiredComp from "../hiredComp";

const Hired = () => {
  const { data, isLoadiing, isFetching, isError, error } =
    useMeHiredJobsQuery();
  console.log("hired", data);
  return (
    <div className="f-col gap ">
      {isFetching ? (
        Array.from({ length: 4 }).map((_, index) => (
          <>
            <JobSkeleton key={index} />
          </>
          //   <CardSkeletonLoading key={index} />
        ))
      ) : data?.data?.length < 1 ? (
        <Empty text="No hiring yet" />
      ) : (
        <>
          <div className="f-col lg:gap-2 md:gap-1.5 gap-1 pt-2">
            {data?.data?.map((hire) => (
              <HiredComp key={hire._id} hire={hire} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hired;
