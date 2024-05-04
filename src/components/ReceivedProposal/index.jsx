import React, { useEffect } from "react";
import { Images } from "../../assets/images";
import { Avatar } from "primereact/avatar";
import {
  useAcceptBidMutation,
  useCreateConversationMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReceivedProposal = ({ bid, key }) => {
  const navigate = useNavigate();
  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };

  const [acceptBid, { isError, isLoading, error }] = useAcceptBidMutation();
  const [
    createConversation,
    {
      isLoading: isCreateConversation,
      isError: isConversationError,
      error: conversationError,
    },
  ] = useCreateConversationMutation();
  const createConversatioHandler = async () => {
    const { data } = await createConversation({ receiverId: bid?.lawyer?._id });
    if (data?.success) {
      toast.success(data.message);
      navigate(`/client-profile/chat/${data.conversation._id}`);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isLoading) {
      toast.loading("loading...");
    }
    if (isConversationError) {
      toast.error(conversationError?.data?.message);
    }
  }, [isError, error]);
  const acceptIt = async () => {
    const data = {
      status: "accepted",
    };
    const response = await acceptBid({
      id: bid?._id,
      data,
    });
    if (response?.data?.success) {
      toast.success("Bid accepted");
    }
  };

  const rejectIt = async () => {
    const data = {
      status: "rejected",
    };
    const response = await acceptBid({
      id: bid?._id,
      data,
    });
    if (response?.data?.success) {
      toast.success("Bid rejected successfully");
    }
  };

  return (
    <div className="pad-y border-b border-gray-400  f-col gap" key={key}>
      <div className="flex md:flex-row flex-col md:items-center gap md:justify-between items-start justify-start" >
        <div className="flex items-center gap">
          <Avatar
            //   image={review?.user?.avatar.url}
            image={bid?.lawyer?.avatar?.url || Images.userProfile}
            className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 mr-0.5 object-cover cursor"
            imageAlt="user-profile"
            shape="circle"
            size="large"
            pt={customAvatar}
          />
          <div className="flex-col gap">
            <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
              {/* {review?.user?.name} */}
              {bid?.lawyer?.name}
            </span>
            {/* <div className="flex gap justify-between md:w-[200px] w-auto">
            <div className="flex md:gap-xs gap-[1px] items-center ">
              <span className="md:text-base text-sm text-grey ">
                <FaStar />
              </span>
              <b className="md:text-base text-sm text-grey md:font-extrabold font-bold">
                {review?.rating}
              </b>
              <span className="md:text-base text-sm text-grey md:font-semibold font-medium">
                (221)
              </span>
            </div>
            <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
              experience
            </span>
          </div> */}
          </div>
        </div>
        {bid?.status === "pending" ? (
          <div className="flex gap md:items-center items-start">
            <button
              className="btn bg-green-500 hover:bg-green-400"
              onClick={acceptIt}
            >
              Accept
            </button>
            <button
        
              className="btn bg-red-500 hover:bg-red-400"
              onClick={rejectIt}
            >
              Reject
            </button>
          </div>
        ) : bid?.status === "accepted" ? (
          <div className="flex md:flex-row flex-col gap md:items-center items-start">
            <button className="gig-btn" onClick={createConversatioHandler}>
              {isCreateConversation ? "loading..." : "reply"}
            </button>
            <span className="btn bg-green-500 hover:bg-green-400">
              Accepted
            </span>
          </div>
        ) : bid?.status === "rejected" ? (
          <span className="btn bg-red-500 hover:bg-red-400">Rejected</span>
        ) : null}
      </div>
      <p className="text-grey md:text-base sm:text-sm  font-medium tracking-wide ">
        {bid?.proposal}
        {/* {review?.comment} */}
      </p>
      <div className="flex gap items-center text-grey md:text-base sm:text-sm  font-medium">
        <span className="font-bold">Basic Price:</span>
        <span>{bid?.pricing}</span>
      </div>
    </div>
  );
};

export default ReceivedProposal;
