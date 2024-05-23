import React, { useEffect } from "react";
import { useGetMeBidsQuery } from "../../../redux/api/userApi";
import JobSkeleton from "../../skeletonLoading/jobLoading";
import Empty from "../../empty";
import Post from "../../post";
import toast from "react-hot-toast";
import BidComp from "../../bidComp";

const Bid = () => {
  const { currentData, isLoading, error, isError } = useGetMeBidsQuery();
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
      ) : currentData?.data?.length < 1 ? (
        <Empty text="No bid yet" />
      ) : (
        <>
          <div className="f-col lg:gap-2  md:gap-1.5 gap-1 pt-2 ">
            {currentData?.data?.map((bid) => (
              <BidComp key={bid._id} bid={bid} />
            ))}
          </div>
        </>
        // currentData?.data?.map((post) => <Post key={post._id} post={post} />)
      )}
      {/* <Post /> */}
    </div>
  );
};

export default Bid;
