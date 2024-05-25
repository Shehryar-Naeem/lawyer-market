import React from "react";
import TravelImg from "../../assets/travelbox.png";
import { MdFlight, MdOutlineLocalHotel } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";
import { Images } from "../../assets/images";

const Banner = () => {
  return (
    <>
      <div className="min-h-[550px] bg-gray-100">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container landing-pad-x">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div data-aos="flip-up">
                <img
                  src={Images.explorer}
                  alt="biryani img"
                  className="max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
                  Explore All Corners of Legal Expertise with Us
                </h1>
                <p
                  data-aos="fade-up"
                  className="md:text-base text-sm font-medium text-gray-500 tracking-wide leading-tight"
                >
                  we connect you with top-tier legal professionals from around
                  the globe.From corporate law and intellectual property to
                  family law and criminal defense, our platform hosts a wide
                  range of legal experts.ach lawyer is thoroughly vetted to
                  ensure you receive high-quality, reliable legal assistance.
                  <br />
                </p>
                {/* <div data-aos="zoom-in" className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <MdFlight className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                      <p>Flight</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <MdOutlineLocalHotel className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                      <p>Hotel</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <IoIosWifi className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                      <p>Wi-fi</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <IoFastFoodSharp className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                      <p>Foods</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;