import React, { useEffect, useRef, useState } from "react";
import { Card, Flowbite } from "flowbite-react";
import { CaptializeFirstLetter } from "../../utils/helper";
import Ratiing from "../rating";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import GigCarousel from "../carousel";
import Tag from "../tag";

const GigCard = ({ gig, key }) => {
  const customTheme = {
    card: {
      root: {
        base: "p-0.5 md:rounded-md border border-gray-200 bg-white md:shadow-md shadow-sm ",
        children: "f-col h-full   gap ",
      },
    },
  };
  const scrollContainer = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  const scroll = (direction) => {
    const scrollAmount = 200;
    const currentScroll = scrollContainer.current.scrollLeft;
    scrollContainer.current.scrollLeft =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
    checkScrollButtons();
  };

  useEffect(() => {
    checkScrollButtons();
    // Adding event listener to update arrows visibility on scroll
    const scrollElement = scrollContainer.current;
    scrollElement.addEventListener("scroll", checkScrollButtons);
    return () =>
      scrollElement.removeEventListener("scroll", checkScrollButtons);
  }, []);
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Card key={key}>
        <div className="card-h md:rounded-sm rounded-xs overflow-hidden ">
          {/* <img
            src={gig?.images[0]?.url}
            alt="gig"
            className="w-full h-full object-cover"
          /> */}
          <GigCarousel images={gig?.images} gig={true} />
        </div>
        <div className="f-col gap  justify-between md:h-full  ">
          <div className="flex gap items-center ">
            <img
              src={gig?.user?.avatar?.url}
              className="md:w-[35px] md:h-[35px] w-[30px] h-[30px] p-0 rounded-full"
            />
            <Link
              to={`/gig/${gig?._id}`}
              className="transition-all hover:underline"
            >
              <h3 className="text-black lg:text-base  md:text-lg sm:text-base text-sm md:font-bold font-medium">
                {CaptializeFirstLetter(gig?.title)}
              </h3>
            </Link>
          </div>
          <div className="f-col gap justify-between h-full ">
            <div className="flex items-center space-x-1">
              {showLeftArrow && (
                <button
                  onClick={() => scroll("left")}
                  className="bg-gray-300 text-white text-sm rounded-xxs p-sm"
                >
                  <FaChevronLeft />
                </button>
              )}
              <ul
                ref={scrollContainer}
                className="flex gap-0.5 overflow-auto hide-scroll relative"
              >
                {gig?.category?.map((cat, index) => (
                  <Tag cat={cat} key={index} />
                ))}
              </ul>
              {showRightArrow && (
                <button
                  onClick={() => scroll("right")}
                  className=" bg-gray-300 text-white text-sm rounded-xxs p-sm"
                >
                  <FaChevronRight />
                </button>
              )}
            </div>

            {/* <span className="card-text">rating</span> */}
            <div>
              <Ratiing readonly={true} cancel={false} />
            </div>

            <div className="flex justify-between">
              <span className="card-text">price</span>
              {/* <span className="card-text">{CaptializeFirstLetter(gig?.user?.city)}</span> */}
            </div>
          </div>
        </div>
      </Card>
    </Flowbite>
  );
};

export default GigCard;
