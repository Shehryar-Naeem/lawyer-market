import React from "react";
import { Images } from "../../assets/images";
import { Avatar } from "primereact/avatar";
import { FaLocationDot } from "react-icons/fa6";
import { CaptializeFirstLetter } from "../../utils/helper";
import Tag from "../tag";

const BidComp = ({ key, bid }) => {
  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };

  return (
    <div className="general-pad border-b-1 border-gray-300 f-col gap" key={key}>
      <div className="flex md:flex-row flex-col md:items-center gap md:justify-between items-start justify-start">
        <div className="flex items-center gap">
          <Avatar
            //   image={review?.user?.avatar.url}
            // image={bid?.lawyer?.avatar?.url || Images.userProfile}
            image={bid?.client?.avatar?.url}
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
              {bid?.client?.name}
            </span>
            <div className="flex gap-0.5 items-center">
              <span className="md:text-base text-sm">
                <FaLocationDot />
              </span>
              <p className="text-sm font-medium">{bid?.client?.city}</p>
            </div>
          </div>
        </div>
        {bid?.status === "pending" ? (
          <div className="flex gap md:items-center items-start md:w-auto w-full">
            <span className="btn md:w-auto w-full item-center yellow-bg">
              pending
            </span>
          </div>
        ) : bid?.status === "accepted" ? (
          <div className="flex md:flex-row flex-col gap md:items-center items-start">
            <button className="gig-btn md:w-auto w-full item-center">
              reply
            </button>
            <span className="btn green-bg md:w-auto w-full item-center">
              Accepted
            </span>
          </div>
        ) : bid?.status === "rejected" ? (
          <span className="btn red-bg md:w-auto w-full item-center">
            Rejected
          </span>
        ) : bid?.status === "hired" ? (
          <span className="btn green-bg md:w-auto w-full item-center">
            Hired
          </span>
        ) : (
          ""
        )}
      </div>
      {bid?.case ? (
        <>
          <h3 className="bid-detail-heading">Job Title:</h3>
          <h2 className="bid-title">
            {CaptializeFirstLetter(bid?.title || null)}
          </h2>
          <h3 className="bid-detail-heading">Major issues</h3>
          <div className="flex flex-wrap gap">
            {bid?.case?.majorIssues?.map((issue, index) => (
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
              <span class="font-medium">Info alert!</span> Related post can be
              deleted
            </div>
          </div>
        </>
      )}
      <h3 className="bid-detail-heading">Proposal:</h3>

      <p className="text-grey md:text-base sm:text-sm  font-medium tracking-wide ">
        {bid?.proposal}
        {/* {review?.comment} */}
      </p>
      <div className="flex gap items-center text-grey md:text-base sm:text-sm  font-medium">
        <span className="font-bold text-black">Basic Price:</span>
        <span>{bid?.pricing}</span>
      </div>
    </div>
  );
};

export default BidComp;
