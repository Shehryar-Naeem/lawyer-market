import React, { useEffect } from "react";
import { Images } from "../../assets/images";
import { Avatar } from "primereact/avatar";
import { FaLocationDot } from "react-icons/fa6";
import { CaptializeFirstLetter } from "../../utils/helper";
import Tag from "../tag";
import {
  useCompleteTheJobMutation,
  useCreateConversationMutation,
  useMarkHiringAsCompleteMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from "../loader";
import { Link, useNavigate } from "react-router-dom";

const HiredComp = ({ key, hire }) => {
  const navigate = useNavigate();
  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };
  // const [completeTheJob, { isLoading, isError, error, isSuccess }] =
  //   useCompleteTheJobMutation();
  const [markHiringAsComplete, { isLoading, isError, error, isSuccess }] =
  useMarkHiringAsCompleteMutation();
  console.log(isError, error);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, []);

  const MarkAsComplete = async () => {
    const response = await markHiringAsComplete(hire._id);
    if (response?.data?.success) {
      toast.success("marked the task as completed successfully");
    }
  };
  const [
    createConversation,
    {
      isLoading: isCreateConversation,
      isError: isConversationError,
      error: conversationError,
    },
  ] = useCreateConversationMutation();
  useEffect(() => {
    if (isConversationError) {
      toast.error(conversationError.data.message);
    }
  }, [isConversationError, conversationError]);
  const createConversatioHandler = async () => {
    const { data } = await createConversation({
      receiverId: hire?.lawyer._id,
    });
    if (data?.success) {
      toast.success(data.message);
      navigate(`/client-profile/chat/${data.conversation._id}`);
    }
  };

  return (
    <div className="general-pad border-b-1 border-gray-300 f-col gap" key={key}>
      <div className="flex md:flex-row flex-col md:items-center gap md:justify-between items-start justify-start">
        <Link
          to={`/user/${hire?.lawyer?._id}`}
          className="flex items-center gap"
        >
          <Avatar
            //   image={review?.user?.avatar.url}
            // image={bid?.lawyer?.avatar?.url || Images.userProfile}
            image={hire?.lawyer?.avatar?.url}
            className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 mr-0.5 object-cover cursor"
            imageAlt="user-profile"
            shape="circle"
            size="large"
            pt={customAvatar}
          />
          <div className="flex-col gap">
            <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
              {/* {review?.user?.name} */}
              {/* {bid?.lawyer?.name} */}
              {hire?.lawyer?.name}
            </span>
            <div className="flex gap-0.5 items-center">
              <span className="md:text-base text-sm">
                <FaLocationDot />
              </span>
              <p className="text-sm font-medium capitalize">
                {hire?.lawyer?.city}
              </p>
            </div>
          </div>
        </Link>
        {hire?.status === "pending" ? (
          <div className="flex gap md:items-center items-start">
            <span className="btn yellow-bg">pending</span>
          </div>
        ) : hire?.status === "accepted" ? (
          <div className="flex md:flex-row flex-col gap md:items-center items-start">
            <button className="gig-btn">reply</button>
            <span className="btn green-bg">Accepted</span>
          </div>
        ) : hire?.status === "rejected" ? (
          <span className="btn red-bg">Rejected</span>
        ) : hire?.status === "hired" ? (
          <div className="flex md:w-auto w-full gap md:flex-row flex-col">
            <button
              className="gig-btn md:w-auto w-full item-center"
              onClick={createConversatioHandler}
            >
              {isCreateConversation ? <Loader /> : "reply"}
            </button>
            <Link
              to={`/post-document/${hire?._id}`}
              className="btn md:w-auto w-full item-center gray-bg"
            >
              document
            </Link>
            <span className="btn md:w-auto w-full item-center green-bg">
              Hired
            </span>
            <button
              className="btn md:w-auto w-full item-center blue-bg"
              onClick={MarkAsComplete}
            >
              {isLoading ? <Loader /> : "complete it"}
            </button>
          </div>
        ) : (
          hire?.status === "completed" && (
            <span className="btn md:w-auto w-full item-center blue-bg">
              completed
            </span>
          )
        )}
      </div>
      {hire?.type === "job" &&
        (hire?.case ? (
          <>
            <h3 className="bid-detail-heading">Job Title:</h3>
            <h2 className="bid-title">
              {CaptializeFirstLetter(hire?.case?.title || null)}
            </h2>
            <h3 className="bid-detail-heading">Major issues</h3>
            <div className="flex flex-wrap gap">
              {hire?.case?.majorIssues?.map((issue, index) => (
                <Tag cat={issue} key={index} />
              ))}
            </div>
            {hire?.bid && (
              <>
                <h3 className="bid-detail-heading">Proposal:</h3>

                <p className="text-grey md:text-base sm:text-sm  font-medium tracking-wide ">
                  {hire?.bid?.proposal}
                  {/* {review?.comment} */}
                </p>
                <div className="flex gap items-center text-grey md:text-base sm:text-sm  font-medium">
                  <span className="font-bold text-black">Basic Price:</span>
                  <span>{hire?.bid?.pricing}</span>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div
              class="flex items-center p-4 mb-4 text-sm text-blue-800 lg:border-l-8 md:border-l-6 border-l-5 border-l-blue-800 small-btn-border-radius bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Info alert!</span> Related post can be
                deleted
              </div>
            </div>
          </>
        ))}

      {hire?.type === "gig" &&
        (hire?.gig ? (
          <>
            <h3 className="bid-detail-heading">Gig Title:</h3>
            <h2 className="bid-title">
              {CaptializeFirstLetter(hire?.gig?.title || null)}
            </h2>
            <h3 className="bid-detail-heading">Major Categories</h3>
            <div className="flex flex-wrap gap">
              {hire?.gig?.category?.map((issue, index) => (
                <Tag cat={issue} key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              class="flex items-center p-4 mb-4 text-sm text-blue-800 lg:border-l-8 md:border-l-6 border-l-5 border-l-blue-800 small-btn-border-radius bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Info alert!</span> Related gig can be
                deleted
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default HiredComp;
