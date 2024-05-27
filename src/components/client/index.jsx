import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../post";
import { useGetMeJobsQuery } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import JobSkeleton from "../skeletonLoading/jobLoading";
import Empty from "../empty";

const ClientPosts = () => {
  const { data, isLoadiing, isFetching, isError, error } = useGetMeJobsQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  return (
    <div className="f-col gap ">
      <div className="flex items-center justify-end">
        <Link to={"/client/create-job"} className="gig-btn">
          create job
        </Link>
      </div>
      <div className="f-col lg:gap-2 md:gap-1.5 gap-1 pt-2">
        {isFetching ? (
          Array.from({ length: 4 }).map((_, index) => (
            <>
              <JobSkeleton key={index} />
            </>
            //   <CardSkeletonLoading key={index} />
          ))
        ) : data?.data?.length < 1 ? (
          <Empty text="No job yet" />
        ) : (
          data?.data?.map((post) => (
            <Post key={post._id} post={post} mangeBtns={true} />
          ))
        )}
        {/* <Post /> */}
      </div>
    </div>
  );
};

export default ClientPosts;
