import React from "react";
import { Images } from "../../assets/images";
import { Avatar } from "primereact/avatar";

import { FaStar } from "react-icons/fa6";

const LawyerRating = ({ review }) => {
  console.log(review);
  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };
  return (
    <div className="pad-y border-b border-gray-400  f-col gap">
      <div className="flex items-center gap">
        <Avatar
          image={review?.user?.avatar?.url}
          className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 mr-0.5 object-cover cursor"
          imageAlt="user-profile"
          shape="circle"
          size="large"
          pt={customAvatar}
        />
        <div className="flex-col gap">
          <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
            {review?.user?.name}
          </span>
          <div className="flex gap justify-between md:w-[200px] w-auto">
            <div className="flex md:gap-xs gap-[1px] items-center ">
              <span className="md:text-base text-sm text-grey ">
                <FaStar />
              </span>
              <b className="md:text-base text-sm text-grey md:font-extrabold font-bold">
                {review?.rating}
              </b>
              {/* <span className="md:text-base text-sm text-grey md:font-semibold font-medium">
                (221)
              </span> */}
            </div>
            {/* <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
              experience
            </span> */}
          </div>
        </div>
      </div>
      <p className="text-grey md:text-base sm:text-sm text-xs font-medium tracking-wide ">
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, labore
        ex! Dolorum vitae quas, numquam incidunt eligendi dignissimos porro
        praesentium accusantium aliquid. Autem illum cum dolore dolor obcaecati
        facere amet. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Tempora, labore ex! Dolorum vitae quas, numquam incidunt eligendi
        dignissimos porro praesentium accusantium aliquid. Autem illum cum
        dolore dolor obcaecati facere amet. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Tempora, labore ex! Dolorum vitae quas,
        numquam incidunt eligendi dignissimos porro praesentium accusantium
        aliquid. Autem illum cum dolore dolor obcaecati facere amet. */}
        {review?.comment}
      </p>
    </div>
  );
};

export default LawyerRating;
