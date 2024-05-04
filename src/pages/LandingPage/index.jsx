import React from "react";
import Slider from "react-slick";
import { gigData, heroSectionData } from "../../data";
// import Slider from "react-slick";

import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { Images } from "../../assets/images";
import LandingHeading from "../../components/landing_heading";
import GigCard from "../../components/card";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
const LandingPage = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <>
      {/* hero section */}
      <div>
        <section className="relative overflow-hidden  bg-gray-100 ">
          <div className="h-full ">
            <Slider {...settings}>
              {heroSectionData.map((data) => (
                <div className="h-full ">
                  <div
                    className={`flex gap ${data.bar} h-[480px] md:h-[650px] ralative  before:absolute before:content-[''] before:bg-black-transparent before:w-full before:h-full before:top-0 before:left-0 before:right-0 before:bottom-0`}
                  >
                    <div className="flex flex-col  landing-pad-x justify-center items-center m-auto gap-4  max-w-[660px] w-full text-center sm:text-left relative z-10">
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        // data-aos-once="true"
                        className="text-3xl md:text-4xl  lg:text-7xl font-bold text-white text-center"
                      >
                        {data.title}
                      </h1>
                      <p
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="100"
                        className="lg:taxt-xl md:text-lg text-base md:font-bold font-semibold text-white text-center"
                      >
                        {data.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* <div className="relative overflow-hidden h-[550px] md:h-[850px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
        <div className="h-[700px] w-[700px] bg-gray-300 absolute -top-1/2 right-0 rounded-[30px] rotate-45 -z[8]"></div>
      
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {heroSectionData.map((data) => (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 landing-pad-x">
                  
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                    >
                      {data.title}
                    </h1>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="100"
                      className="lg:taxt-xl md:text-lg text-base md:font-bold font-semibold"
                    >
                      {data.description}
                    </p>
                  </div>
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={data.img}
                        alt=""
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div> */}
        {/* hero section */}

        {/* about section */}

        <section className="flex f-col container md:gap-2 gap-1.5 landing-pad-x landing-pad-y">
          <LandingHeading text={"about"} />
          <div className="flex md:flex-row flex-col-reverse items-center md:gap-1.5 gap-1 ">
            <div className="md:w-1/2  f-col gap w-full items-start">
              <div className="max-w-[480px]">
                <p className="lg:text-lg md:text-base text-sm  md:font-semibold font-medium">
                  "The Islamabad High Court is the superior court of the capital
                  territory of Pakistan. The court was established in 2010 and
                  has appellate jurisdiction over the Islamabad Capital
                  Territory and the Federally Administered Tribal Areas. The
                  court has original jurisdiction over cases involving
                  violations of fundamental rights.",
                </p>
              </div>
            </div>
            <div className="md:w-1/2  w-full drop-shadow-[-10px_10px_12px_rgba(0,0,0,1) md:order-2  md:min-h-[440px] h-full w-full flex items-center justify-center  ">
              <img
                src={Images.about}
                alt="about"
                className="w-full h-full md:object-cover object-cover"
              />
            </div>
          </div>
        </section>
        {/* about section */}

        {/* gigs section */}
        <section className="flex f-col container md:gap-2 gap-1.5 landing-pad-x landing-pad-y">
          <LandingHeading text={"top gigs"} />
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap place-items-center ">
            {gigData?.map((gig) => (
              <GigCard
                key={gig._id}
                gig={gig}
                // isOnline={isIncludeInOnlineUsers(onlineUsers, gig?.user?._id)}
              />
            ))}
          </div>
        </section>
        {/* gigs section */}

        {/* gigs section */}
        <div className="bg-gray-100 lg:mt-[40px] md:mt-[32px] mt-[24px]">
          <section className="flex f-col container md:gap-2 gap-1.5 landing-pad-x landing-pad-y ">
            <LandingHeading text={"Benefits"} />
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(33, 150, 243)",
                }}
                // date="2011 - present"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                // icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Creative Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Miami, FL
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, Project
                  Management, Team Leading
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2010 - 2011"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                // icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Art Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, SEO,
                  Online Marketing
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2008 - 2010"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                // icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Web Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Los Angeles, CA
                </h4>
                <p>User Experience, Visual Design</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2006 - 2008"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                // icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Web Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>User Experience, Visual Design</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="April 2013"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                // icon={<SchoolIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Content Marketing for Web, Mobile and Social Media
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Online Course
                </h4>
                <p>Strategy, Social Media</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="November 2012"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                // icon={<SchoolIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Agile Development Scrum Master
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Certification
                </h4>
                <p>Creative Direction, User Experience, Visual Design</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2002 - 2006"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                // icon={<SchoolIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Bachelor of Science in Interactive Digital Media Visual
                  Imaging
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Bachelor Degree
                </h4>
                <p>Creative Direction, Visual Design</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                // icon={<StarIcon />}
              />
            </VerticalTimeline>
          </section>
        </div>
        {/* gigs section */}
      </div>
    </>
  );
};

export default LandingPage;
