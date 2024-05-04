import React, { useState } from "react";

import { Rating } from "primereact/rating";
import { classNames } from "primereact/utils";

const Ratiing = ({ readonly, cancel ,setValue,rating,setRating,watch}) => {
//   const [raing, setRating] = useState(null);
  const onRatingChange = (e) => {
    setRating(e.target.value);
    watch("rating")
    setValue("rating", e.target.value);

  };

  const customTheme = {
    root: ({ props }) => ({
      className: classNames(
        "relative flex flex-wrap items-center",
        "md:gap-sm gap-xs",
        {
          "opacity-60 select-none pointer-events-none cursor-default":
            props?.disabled,
        }
      ),
    }),
    // cancelitem: ({ context }) => ({
    //     className: classNames('inline-flex items-center cursor-pointer', {
    //         'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': context.focused
    //     })
    // }),
    cancelicon: {
      className: classNames(
        "cursor-pointer text-red-500",
        "md:w-5 w-3 md:h-5 h-3",
        "transition duration-200 ease-in"
      ),
    },
    item: ({ props, context }) => ({
      className: classNames(
        "inline-flex items-center cursor-pointer",
        {
          "cursor-pointer": !props?.readOnly,
          "cursor-default": props?.readOnly,
        },
        {
          "outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]":
            context.focused,
        }
      ),
    }),
    officon: {
      className: classNames(
        "text-gray-700 hover:text-yellow-400",
        "md:w-5 w-3 md:h-5 h-3",
        "transition duration-200 ease-in"
      ),
    },
    onicon: {
      className: classNames(
        "text-yellow-600",
        "md:w-5 w-3 md:h-5 h-3",
        "transition duration-200 ease-in"
      ),
    },
  };

  return (
    <div className="item-center">
      <Rating
        value={rating}
        unstyled={true}
        onChange={onRatingChange}
        pt={customTheme}
        readOnly={readonly}
        cancel={cancel}
      />
    </div>
  );
};

export default Ratiing;
