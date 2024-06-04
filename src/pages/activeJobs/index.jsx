import React, { useEffect } from "react";

import JobSkeleton from "../../components/skeletonLoading/jobLoading";
import Empty from "../../components/empty";

import toast from "react-hot-toast";

import {
  useGetLawyerHiringsQuery,
  useGetMeHiredJobsQuery,
} from "../../redux/api/userApi";
import ActivehiredJob from "../../components/ActiveHiredJob";

const ActiveJobs = () => {
  // const { currentData, isLoading, error, isError } = useGetMeHiredJobsQuery();
  const { currentData, isLoading, error, isError } = useGetLawyerHiringsQuery();
  console.log("currentData", currentData);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  return (
    <div className="f-col gap">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <>
            <JobSkeleton key={index} />
          </>
          //   <CardSkeletonLoading key={index} />
        ))
      ) : currentData?.hiring?.length < 1 ? (
        <Empty text="No active job yet" />
      ) : (
        <>
          <div className="f-col lg:gap-2  md:gap-1.5 gap-1 pt-2 ">
            {currentData?.hiring?.map((job) => (
              <ActivehiredJob key={job._id} job={job} />
            ))}
          </div>
        </>
        // currentData?.data?.map((post) => <Post key={post._id} post={post} />)
      )}
      {/* <Post /> */}
    </div>
  );
};

export default ActiveJobs;
