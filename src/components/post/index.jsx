import React, { useEffect } from "react";
import { CaptializeFirstLetter } from "../../utils/helper";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { RiFolderReceivedFill } from "react-icons/ri";
import { Avatar } from "primereact/avatar";
import Tag from "../tag";
import {
  useDeleteJobMutation,
  useStopReceivingRuquestMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from "../loader";
const customAvatar = {
  image: "h-full w-full rounded-full object-cover",
};
const Post = ({
  showSenderBtn,
  notShowLink,
  isProposal,
  post,
  postBids,
  mangeBtns,
  isDocument,
}) => {
  // console.log(post);
  const [
    stopReceivingRuquest,
    {
      isLoading: stopReceivingLoading,
      isSuccess: stopReceivingSuccess,
      isError: stopReceivingError,
      error: stopReceivingErrorData,
    },
  ] = useStopReceivingRuquestMutation();
  const [
    deleteJob,
    {
      isLoading: deleteJobLoading,
      isSuccess: deleteJobSuccess,
      isError: deleteJobError,
      error: deleteJobErrorData,
    },
  ] = useDeleteJobMutation();
  // const arry = CaptializeFirstLetter(post?.description).split(" ");
  // const maxWords = 20;

  // const displayWord = arry.length <= maxWords ? arry : arry.slice(0, maxWords);
  // console.log(displayWord);
  useEffect(() => {
    if (stopReceivingError) {
      toast.error(stopReceivingErrorData.data.message);
    }
    if (deleteJobError) {
      toast.error(deleteJobErrorData.error.data.message);
    }
  }, [
    stopReceivingError,
    stopReceivingErrorData,
    deleteJobError,
    deleteJobErrorData,
  ]);

  const handleStopreceivingRequest = async () => {
    const response = await stopReceivingRuquest({ id: post?._id });
    if (response?.data?.success) {
      toast.success("You have successfully stopped receiving bids");
    }
  };

  const deleteHandler = async () => {
    const response = await deleteJob(post?._id);

    if (response?.data?.success) {
      toast.success("Job deleted successfully");
    }
  };

  return (
    <div className="general-pad border-b-1 border-gray-300 f-col md:gap-3 gap-2">
      <div className="flex items-center gap">
        <Avatar
          image={post?.user?.avatar?.url}
          className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 mr-0.5 object-cover cursor"
          imageAlt="user-profile"
          shape="circle"
          size="large"
          pt={customAvatar}
        />
        <div className="flex-col gap">
          <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
            {post?.user?.name}
          </span>
          {post?.user && (
            <div className="flex gap-0.5 items-center">
              <span className="md:text-base text-sm">
                <FaLocationDot />
              </span>
              <p className="text-sm font-medium capitalize">
                {post?.user?.city}
              </p>
            </div>
          )}
        </div>
      </div>
      {!notShowLink ? (
        <>
          <Link
            className="heading hover:underline"
            to={`/post-detail/${post?._id}`}
          >
            {CaptializeFirstLetter(post?.title)}
          </Link>
        </>
      ) : (
        <h2 className="heading">{CaptializeFirstLetter(post?.title)}</h2>
      )}
      <div className="f-col md:gap-3 gap-2">
        <p className="para">
          {CaptializeFirstLetter(post?.description)}
          {/* {displayWord.join(" ")}
          {arry.length > maxWords && (
            <>
              &nbsp;
              <Link
                to={`/post/23`}
                className="text-xs text-black font-bold hover:underline"
              >
                show more
              </Link>
            </>
          )} */}
        </p>
        {!isDocument && (
          <>
            <div className="md:flex flex-wrap gap inline-flex">
              <div className="flex gap-0.5 items-center">
                <span className="md:text-base text-sm">
                  <IoPersonSharp />
                </span>
                <p className="text-sm  md:font-medium font-normal">
                  <span className="md:font-bold font-medium capitalize">
                    category:
                  </span>{" "}
                  {post?.category}
                </p>
              </div>
              <div className="flex gap-0.5 items-center">
                <span className="md:text-base text-sm">
                  <FaEye />
                </span>
                <p className="md:text-sm  md:font-medium font-normal">
                  <span className="md:font-bold font-medium capitalize">
                    Year of Experience:
                  </span>{" "}
                  {post?.experience}
                </p>
              </div>
              <div className="flex gap-0.5 items-center">
                <span className="md:text-base text-sm">
                  <FaLocationDot />
                </span>
                <p className="text-sm md:font-medium font-normal">
                  <span className="md:font-bold font-medium capitalize">
                    Location:
                  </span>{" "}
                  {post?.location}
                </p>
              </div>
              <div className="flex gap-0.5 items-center">
                <span className="md:text-base text-sm">
                  <IoMdPricetag />
                </span>
                <p className="text-sm md:font-medium font-normal">
                  <span className="md:font-bold font-medium capitalize">
                    Price:
                  </span>{" "}
                  {post?.budget} Rupees Only
                </p>
              </div>
              {isProposal && (
                <div className="flex gap-0.5 items-center">
                  <span className="md:text-base  text-sm">
                    <RiFolderReceivedFill />
                  </span>
                  <p className="text-sm md:font-medium font-normal">
                    <span className="md:font-bold font-medium capitalize">
                      received proposal:
                    </span>{" "}
                    {postBids}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap">
              {post?.majorIssues?.map((issue, index) => (
                <Tag cat={issue} key={index} />
              ))}
            </div>
          </>
        )}
        {mangeBtns && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-0.8 gap-0.5">
            <button
              className="btn black-bg item-center"
              onClick={handleStopreceivingRequest}
            >
              {stopReceivingLoading ? <Loader /> : "Stop Accept bids"}
            </button>
            <Link
              className="btn gray-bg text-center item-center"
              to={`/post-detail/${post?._id}`}
            >
              View Job
            </Link>
            <Link
              className="btn blue-bg item-center"
              to={`/edit-job/${post?._id}`}
            >
              Edit Job
            </Link>

            <button className="btn red-bg item-center" onClick={deleteHandler}>
              {deleteJobLoading ? <Loader /> : "Delete Job"}
            </button>
          </div>
        )}
        {showSenderBtn && (
          <div className="flex items-start">
            <Link
              to={`/lawyer/send-proposal/${post?._id}`}
              className="btn black-bg"
            >
              send a reqeust
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
