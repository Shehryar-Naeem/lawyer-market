import React from "react";
import { CaptializeFirstLetter } from "../../utils/helper";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { RiFolderReceivedFill } from "react-icons/ri";

const Post = ({ showSenderBtn, isProposal, post, postBids }) => {
  const arry = CaptializeFirstLetter(post?.description).split(" ");
  const maxWords = 20;

  const displayWord = arry.length <= maxWords ? arry : arry.slice(0, maxWords);
  // console.log(displayWord);

  return (
    <div className="general-pad border-b-1 border-gray-300 f-col md:gap-[20px] gap-1">
      {!showSenderBtn ? (
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
      <div className="f-col md:gap-1.5 gap-1">
        <p className="para">
          {displayWord.join(" ")}
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
          )}
        </p>
        <div className="flex flex-wrap gap">
          <div className="flex gap-0.5 items-center">
            <span className="md:text-base text-sm">
              <IoPersonSharp />
            </span>
            <p className="text-sm font-medium">
              <span className="font-bold capitalize">category:</span>{" "}
              {post?.category}
            </p>
          </div>
          <div className="flex gap-0.5 items-center">
            <span className="md:text-base text-sm">
              <FaEye />
            </span>
            <p className="text-sm font-medium">
              <span className="font-bold capitalize">Year of Experience:</span>{" "}
              {post?.experience}
            </p>
          </div>
          <div className="flex gap-0.5 items-center">
            <span className="md:text-base text-sm">
              <FaLocationDot />
            </span>
            <p className="text-sm font-medium">
              <span className="font-bold capitalize">Location:</span>{" "}
              {post?.location}
            </p>
          </div>
          <div className="flex gap-0.5 items-center">
            <span className="md:text-base text-sm">
              <IoMdPricetag />
            </span>
            <p className="text-sm font-medium">
              <span className="font-bold capitalize">Price:</span>{" "}
              {post?.budget} Rupees Only
            </p>
          </div>
          {isProposal && (
            <div className="flex gap-0.5 items-center">
              <span className="md:text-base text-sm">
                <RiFolderReceivedFill />
              </span>
              <p className="text-sm font-medium">
                <span className="font-bold capitalize">received proposal:</span>{" "}
                {postBids}
              </p>
            </div>
          )}
        </div>
        {showSenderBtn && (
          <div className="flex items-start">
            <Link to={`/lawyer/send-proposal/${post?._id}`} className="gig-btn">
              send a reqeust
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
