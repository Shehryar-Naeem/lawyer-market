import React, { useEffect } from "react";
import NatureVid from "../../assets/video/main.mp4";
import Hero from "../../components/Hero/Hero";
import Places from "../../components/Places/Places";
import BannerPic from "../../components/BannerPic/BannerPic";
import BannerImg from "../../assets/cover-women.jpg";
import BlogsComp from "../../components/Blogs/BlogsComp";
import Banner from "../../components/Banner/Banner";
import Banner2 from "../../assets/travel-cover2.jpg";
import Testimonial from "../../components/Testimonial/Testimonial";
import { heroSectionData } from "../../data";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Slider from "react-slick";
import LandingHeading from "../../components/landing_heading";
import { Images } from "../../assets/images";
import { FaChildReaching } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import { GrSchedule } from "react-icons/gr";
import { GiFocusedLightning, GiSatelliteCommunication } from "react-icons/gi";
import Benefits from "../../components/benefits";
import HeroSection from "../../components/heroSection";
import { useGetTopGigsQuery } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import InitialLoader from "../../components/initialLoader";
import { scrollToTop } from "../../utils/helper";
import { teamData } from "../../data/dummyData";
import MemberComp from "../../components/memeberComp";
const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
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
  const { currentData, isLoading, isError, error } = useGetTopGigsQuery();
  console.log(currentData);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <>
      {
        // isLoading ? (
        //   <>
        //     <InitialLoader />
        //   </>
        // ) :
        <div className="relative">
          {/* <section className="relative overflow-hidden ">
          <div className="h-full ">
            <Slider
            //  {...settings}
            >
              {heroSectionData.map((data) => (
                <div className="h-full ">
                  <div
                    className={`flex gap ${data.bar} bg-fixed h-[480px] md:h-[650px]  lg:h-[810px] ralative `}
                  >
                    <div className="container flex md:items-end  items-center md:justify-normal justify-center ">
                      <div className="flex flex-col md:mb-[150px] mx-[20px]  bg-[rgba(66,64,64,0.57)] gap-4  max-w-[760px] w-full text-center sm:text-left relative z-10 lg:rounded-lg md:rounded-md rounded-sm lg:p-3 md:p-2 p-1">
                        <h1
                          data-aos="zoom-out"
                          data-aos-duration="500"
                          // data-aos-once="true"
                          className="text-3xl md:text-4xl  lg:text-7xl font-bold text-white text-start"
                        >
                          {data.title}
                        </h1>
                        <p
                          data-aos="fade-up"
                          data-aos-duration="500"
                          data-aos-delay="100"
                          className="lg:taxt-xl md:text-lg text-base md:font-bold font-semibold text-white text-start"
                        >
                          {data.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section> */}

          <HeroSection />

          <section className="flex f-col container md:gap-2 gap-1.5 landing-pad-x">
            <LandingHeading text={"about"} />
            <div className="flex md:flex-row flex-col-reverse items-center md:gap-1.5 gap-1 ">
              <div className="md:w-1/2  f-col gap w-full items-start">
                <div className="max-w-[480px]">
                  <p
                    className="lg:text-lg md:text-balance text-sm font-medium text-gray-500 tracking-wider leading-tight"
                    data-aos="fade-up"
                  >
                    Welcome to the world's premier online legal platform. We
                    connect you with verified, Bar Association member lawyers,
                    ensuring top-quality legal services. Benefit from fast
                    response times, access to multiple and specialized lawyers,
                    and exceptional personalized solutions. Join us today and
                    experience the difference expert legal support can make for
                    your needs.
                  </p>
                </div>
              </div>
              <div
                className="md:w-1/2  w-full drop-shadow-[-10px_10px_12px_rgba(0,0,0,1) md:order-2  md:min-h-[340px] h-full w-full flex items-center justify-center "
                data-aos="zoom-in"
              >
                <img
                  src={Images.about2}
                  alt="about"
                  className="w-full h-full md:object-cover object-cover"
                />
              </div>
            </div>
          </section>
          <Benefits />

          <Places currentData={currentData?.gigs} />
          {/* <BannerPic img={Images.banner1} /> */}

          <Banner />
          {/* <div className="bg-gray-100 lg:mt-[40px] md:mt-[32px] mt-[24px]">
          <section className="flex f-col container md:gap-2 gap-1.5 landing-pad-x landing-pad-y ">
            <LandingHeading text={"Benefits"} />
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "#333333",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  #333333",
                }}
               
                iconStyle={{ background: "#333333", color: "#fff" }}
                icon={<FaChildReaching />}
              >
                <h3 className="vertical-timeline-element-title">
                  Expand Your Reach
                </h3>
                <p>
                  Gain access to a nationwide client base without geographical
                  limits. Showcase your expertise and attract clients from all
                  over the country, increasing your visibility and potential for
                  new business.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // date="2010 - 2011"
                iconStyle={{ background: "#333333", color: "#fff" }}
                icon={<MdMapsHomeWork />}
              >
                <h3 className="vertical-timeline-element-title">
                  Flexible Work Opportunities
                </h3>
              
                <p>
                  Enjoy the freedom to choose when and where you work. Our
                  platform allows you to manage your workload according to your
                  schedule, giving you the flexibility to balance your
                  professional and personal life.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: "#333333", color: "#fff" }}
                icon={<GrSchedule />}
              >
                <h3 className="vertical-timeline-element-title">
                  Streamlined Client Management
                </h3>
              
                <p>
                  Simplify how you manage client interactions with integrated
                  tools for communication, scheduling, and document handling.
                  Spend less time on administration and more time practicing law.
                </p>
              </VerticalTimelineElement>
  
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<VscWorkspaceTrusted />}
              >
                <h3 className="vertical-timeline-element-title">
                  Trusted Legal Professionals
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                </h4>
                <p>
                  Access a diverse pool of verified lawyers with a wide range of
                  specialties. Our rigorous verification process ensures that you
                  receive high-quality legal services.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                // date="November 2012"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<GiSatelliteCommunication />}
              >
                <h3 className="vertical-timeline-element-title">
                  Direct Communication
                </h3>
              
                <p>
                  Use our built-in chat system to communicate directly with
                  lawyers. Ask questions, share documents, and receive updates
                  about your case without any hassle.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2002 - 2006"
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<GiFocusedLightning />}
              >
                <h3 className="vertical-timeline-element-title">
                  Satisfaction Guaranteed
                </h3>
             
                <p>
                  Our client-focused approach ensures your satisfaction. Benefit
                  from our dispute resolution support and a commitment to
                  resolving any concerns quickly and fairly.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </section>
        </div> */}
          <BlogsComp />
          {/* <BannerPic img={Images.banner3} /> */}
          <Testimonial />
          {/* team section  */}
          <div className="bg-gray-100">
            <div className="flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
              <div className="container landing-pad-x">
                <LandingHeading text={"Meet team"} />
                <div className="max-w-[768px] m-auto w-full h-full lg:pt-[48px] md:pt-[34px] pt-[20px] flex flex-wrap justify-center" data-aos="zoom-in">
                {teamData.map((team) => (
                  <MemberComp
                    key={team.id}
                    name={team.name}
                    // desigination={team.desigination}
                    profilePic={team.profilePic}
                  />
                ))}
                </div>
              </div>
            </div>
          </div>
          {/* team section  */}
        </div>
      }
    </>
  );
};

export default Home;
