import React from "react";
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
const Home = () => {
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
    <div className="relative">
      <section className="relative overflow-hidden ">
        
        <div className="h-full ">
          <Slider {...settings}>
            {heroSectionData.map((data) => (
              <div className="h-full ">
                <div
                  className={`flex gap ${data.bar} h-[480px] md:h-[650px] ralative  before:absolute before:content-[''] before:bg-[rgba(80,80,80,0.06)] before:w-full before:h-full before:top-0 before:left-0 before:right-0 before:bottom-0`}
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

      <section className="flex f-col container md:gap-2 gap-1.5 landing-pad-x landing-pad-y">
        <LandingHeading text={"about"} />
        <div className="flex md:flex-row flex-col-reverse items-center md:gap-1.5 gap-1 ">
          <div className="md:w-1/2  f-col gap w-full items-start">
            <div className="max-w-[480px]">
              <p
                className="md:text-base text-sm font-medium text-gray-500 tracking-wide leading-tight"
                data-aos="fade-up"
              >
                The Islamabad High Court is the superior court of the capital
                territory of Pakistan. The court was established in 2010 and has
                appellate jurisdiction over the Islamabad Capital Territory and
                the Federally Administered Tribal Areas. The court has original
                jurisdiction over cases involving violations of fundamental
                rights.,
              </p>
            </div>
          </div>
          <div
            className="md:w-1/2  w-full drop-shadow-[-10px_10px_12px_rgba(0,0,0,1) md:order-2  md:min-h-[440px] h-full w-full flex items-center justify-center "
            data-aos="zoom-in"
          >
            <img
              src={Images.about}
              alt="about"
              className="w-full h-full md:object-cover object-cover"
            />
          </div>
        </div>
      </section>

      <Places />
      <BannerPic img={BannerImg} />
      <BlogsComp />
      <Banner />
      <div className="bg-gray-100 lg:mt-[40px] md:mt-[32px] mt-[24px]">
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
              // date="2011 - present"
              iconStyle={{ background: "#333333", color: "#fff" }}
              icon={<FaChildReaching />}
            >
              <h3 className="vertical-timeline-element-title">
                Expand Your Reach
              </h3>
              {/* <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4> */}
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
              {/* <h4 className="vertical-timeline-element-subtitle">
                San Francisco, CA
              </h4> */}
              <p>
                Enjoy the freedom to choose when and where you work. Our
                platform allows you to manage your workload according to your
                schedule, giving you the flexibility to balance your
                professional and personal life.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              // date="2008 - 2010"
              iconStyle={{ background: "#333333", color: "#fff" }}
              icon={<GrSchedule />}
            >
              <h3 className="vertical-timeline-element-title">
                Streamlined Client Management
              </h3>
              {/* <h4 className="vertical-timeline-element-subtitle">
              
              </h4> */}
              <p>
                Simplify how you manage client interactions with integrated
                tools for communication, scheduling, and document handling.
                Spend less time on administration and more time practicing law.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              // date="April 2013"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<VscWorkspaceTrusted />}
            >
              <h3 className="vertical-timeline-element-title">
                Trusted Legal Professionals
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                {/* Online Course */}
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
              {/* <h4 className="vertical-timeline-element-subtitle">
                Certification
              </h4> */}
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
              {/* <h4 className="vertical-timeline-element-subtitle">
                Bachelor Degree
              </h4> */}
              <p>
                Our client-focused approach ensures your satisfaction. Benefit
                from our dispute resolution support and a commitment to
                resolving any concerns quickly and fairly.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </section>
      </div>
      <BannerPic img={Banner2} />
      <Testimonial />
    </div>
  );
};

export default Home;
