import React, { useEffect } from "react";
import PageHeading from "../../components/pageHeading";
// import Post from "../../components/post";
import ReceivedProposal from "../../components/ReceivedProposal";
import { useParams } from "react-router-dom";
import {
  useGetAllPostBidsQuery,
  useGetJobByIdQuery,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Post from "../../components/post";
import JobSkeleton from "../../components/skeletonLoading/jobLoading";
import Empty from "../../components/empty";

const PostDetail = () => {
  const { id } = useParams();
  const { data, isError, isFetching, error } = useGetJobByIdQuery(id);
  const {
    data: getPostbids,
    isError: isPostBidError,
    isFetching: isPostBidFetching,
    error: postBidError,
  } = useGetAllPostBidsQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred");
    }
    if (isPostBidError) {
      toast.error(postBidError?.data?.message || "An error occurred");
    }
  }, [isError, error, isPostBidError, postBidError]);

  return (
    <div className="page-container">
      <div className="container f-col general-pad gap-3">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <PageHeading text="About job" />
        </div>
        <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
          {isFetching ? (
            <JobSkeleton />
          ) : (
            <Post
              post={data?.data}
              isProposal={true}
              postBids={getPostbids?.data.length}
            />
          )}
        </div>

        <PageHeading text="Received proposals" />
        <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
          <div className="f-col gap-2">
            {isPostBidFetching ? (
              Array.from({ length: 4 }).map((_, index) => (
                <>
                  <JobSkeleton key={index} />
                </>
              ))
            ) : getPostbids?.data?.length < 1 ? (
              <>
                <Empty text="No proposal received yet" />
              </>
            ) : (
              <>
                {getPostbids?.data?.map((bid) => (
                  <ReceivedProposal key={bid.id} bid={bid} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
