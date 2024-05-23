import React, { useEffect, useRef, useState } from "react";
import { Card, Flowbite } from "flowbite-react";
import { CaptializeFirstLetter } from "../../utils/helper";
import Ratiing from "../rating";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import GigCarousel from "../carousel";
import Tag from "../tag";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDeleteGigMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const GigCard = ({ gig, key, me, isOnline }) => {
  // console.log(gig);
  // console.log(isOnline);

  const [deleteGig, { isError, isLoading, error }] = useDeleteGigMutation();

  const customTheme = {
    card: {
      root: {
        base: "p-0.5 md:rounded-sm rounded-xxs border border-gray-200 bg-white  relative card-img overflow-hidden  md:w-full w-[200px] bg-[#F9FAFB]",
        children: "f-col h-full relative gap",
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
  const handleDeleteGig = async () => {
    const toastId = toast.loading("uploading...");
    const response = await deleteGig(gig?._id);
    if (response?.data.success) {
      toast.success("Gig Deleted Successfully", {
        id: toastId,
      });
    } else if (response?.error) {
      toast.error("Error Deleting Gig");
    }
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Card key={key}>
        <div className="h-[140px] md:h-[150px] object-cover md:rounded-sm rounded-xs overflow-hidden  relative">
          {/* <img
            src={gig?.images[0]?.url}
            alt="gig"
            className="w-full h-full object-cover"
          /> */}
          <GigCarousel images={gig?.images} gig={true} />
          {isOnline && (
            <div className="bg-gray-200 md:p-0.5 m-0.5 p-0.5 flex gap-[5px] absolute right-0 bottom-0 rounded-lg items-center">
              <span className="h-[6px] w-[6px]  block bg-green-400 rounded-full"></span>
              <span className="md:text-[10px] leading-none text-[8px] text-green-400  font-semibold capitalize">
                online
              </span>
            </div>
          )}
        </div>
        <div className="f-col gap  justify-between   ">
          <div className="flex gap items-center ">
            <img
              src={gig?.user?.avatar?.url}
              className="md:w-[35px] md:h-[35px] w-[30px] h-[30px] p-0 rounded-full"
            />
            <Link
              to={`/gig/${gig?._id}`}
              className="transition-all hover:underline"
            >
              <h3 className="text-black lg:text-base  md:text-lg sm:text-base text-sm md:font-bold font-medium line-clamp-2">
                {CaptializeFirstLetter(gig?.title)}
              </h3>
            </Link>
          </div>
          <div className="f-col gap justify-between  ">
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
                  <Tag cat={cat.split(" ")[0]} key={index} />
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
        {me && (
          <div className="absolute bottom-0 md:left-0 z-10 right-0 md:w-full h-full md:flex md:items-center md:justify-center flex  items-end  justify-end general-pad transition-all duration-500 ease-linear  md:translate-y-[100%] ed-btn">
            <div className="lg:gap-0.10 md:gap-0.10 gap-sm flex ">
              <Link
                to={"/edit-gig/step1/" + gig?._id}
                // htmlFor={`edit-image-${index}`}
                className="md:w-[40px] md:h-[40px] md:rounded-full text-2xl item-center  md:bg-white cursor-pointer"
              >
                <CiEdit />
              </Link>
              <span
                className="md:w-[40px] md:h-[40px] md:rounded-full text-2xl item-center md:bg-white text-red-500"
                onClick={handleDeleteGig}
              >
                <MdDelete />
              </span>
            </div>
          </div>
        )}
      </Card>
    </Flowbite>
  );
};

export default GigCard;
