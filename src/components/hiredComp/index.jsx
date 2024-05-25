import React, { useEffect } from "react";
import { Images } from "../../assets/images";
import { Avatar } from "primereact/avatar";
import { FaLocationDot } from "react-icons/fa6";
import { CaptializeFirstLetter } from "../../utils/helper";
import Tag from "../tag";
import { useCompleteTheJobMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from "../loader";
import { Link } from "react-router-dom";

const HiredComp = ({ key, hire }) => {
  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };
  const [completeTheJob, { isLoading, isError, error, isSuccess }] =
    useCompleteTheJobMutation();
  console.log(isError, error);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, []);

  const MarkAsComplete = async () => {
    const response = await completeTheJob(hire._id);
    if (response?.data?.success) {
      toast.success("marked the task as completed successfully");
    }
  };

  return (
    <div className="general-pad border-b-1 border-gray-300 f-col gap" key={key}>
      <div className="flex md:flex-row flex-col md:items-center gap md:justify-between items-start justify-start">
        <Link to={`/user/${hire?.hiredLawyer._id}`} className="flex items-center gap">
          <Avatar
            //   image={review?.user?.avatar.url}
            // image={bid?.lawyer?.avatar?.url || Images.userProfile}
            image={hire?.hiredLawyer?.avatar?.url}
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
              {hire?.hiredLawyer?.name}
            </span>
            <div className="flex gap-0.5 items-center">
              <span className="md:text-base text-sm">
                <FaLocationDot />
              </span>
              <p className="text-sm font-medium">{hire?.hiredLawyer?.city}</p>
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
      <h3 className="bid-detail-heading">Job Title:</h3>
      <h2 className="bid-title">
        {CaptializeFirstLetter(hire?.title || null)}
      </h2>
      <h3 className="bid-detail-heading">Major issues</h3>
      <div className="flex flex-wrap gap">
        {hire?.majorIssues?.map((issue, index) => (
          <Tag cat={issue} key={index} />
        ))}
      </div>
      <h3 className="bid-detail-heading">Proposal:</h3>

      <p className="text-grey md:text-base sm:text-sm  font-medium tracking-wide ">
        {hire?.hiredBid?.proposal}
        {/* {review?.comment} */}
      </p>
      <div className="flex gap items-center text-grey md:text-base sm:text-sm  font-medium">
        <span className="font-bold text-black">Basic Price:</span>
        <span>{hire?.hiredBid?.pricing}</span>
      </div>
    </div>
  );
};

export default HiredComp;
