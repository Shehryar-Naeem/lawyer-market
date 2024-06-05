import React from "react";
import Slider from "react-slick";

const testimonialData = [
  {
    id: 1,
    name: "Ali Raza",
    text: "Lawyer Marketplace to the rescue! They connected me with the perfect lawyer who understood my case completely. Great experience",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 3,
    name: "Umar Draza",
    text: "Traffic ticket blues? Lawyer Marketplace found a lawyer who got it reduced fast! Easy and stress-free, highly recommend.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Sana ullah",
    text: "Busy professional? Lawyer Marketplace is a lifesaver. Remote consultations saved me time and connected me with the right lawyer. Thanks!",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Yasir",
    text: "Don't let legal questions overwhelm you. Lawyer Marketplace has clear resources that helped me understand my situation. Knowledge is power! ",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Moin",
    text: "Affordable legal help doesn't have to be a dream. Lawyer Marketplace connected me with a great lawyer who fit my budget and won my case. Feeling empowered!",
    img: "https://picsum.photos/105/105",
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="300" className="py-10 h-full">
        <div className="container landing-pad-x h-full">
          {/* Header section */}
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Testimonial
            </p>
            <h1 className="text-3xl font-bold">Testimonial</h1>
            <p className="text-xs text-gray-400">
              {" "}
              Real Experiences, Real Results: See What Our Clients and Lawyers
              Are Saying
            </p>
          </div>
          {/* testimonial section */}
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[800px] mx-auto gap-6 h-full"
          >
            <Slider
             {...settings}
             >
              {testimonialData.map(({ id, name, text, img }) => {
                return (
                  <div key={id} className="my-6 h-full">
                    <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative h-full">
                      <div className="lg:w-[130px] md:w-[110px] w-[100px] ">
                        <img
                          src={img}
                          alt="tema"
                          className="rounded-full block mx-auto"
                        />
                      </div>
                      <h1 className="text-xl font-bold">{name}</h1>
                      <p className="text-gray-500 text-sm">{text}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
