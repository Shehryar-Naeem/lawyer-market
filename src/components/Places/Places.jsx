import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/boat.jpg";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/water.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";
import LandingHeading from "../landing_heading";
import { gigData } from "../../data";
import GigCard from "../card";

const PlacesData = [
  {
    img: Img1,
    title: "Boat",
    location: "USA",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img2,
    title: "Taj Mahal",
    location: "India",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img3,
    title: "Underwater",
    location: "US",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
    price: 6200,
    type: "Cultural Relax",
  },
  {
    img: Img4,
    title: "Sydney",
    location: "USA",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img5,
    title: "Los Angeles",
    location: "United states",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img6,
    title: "Los Vegas",
    location: "California",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
    price: 6200,
    type: "Cultural Relax",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10 ">
        <section
          data-aos="fade-up"
          className="container landing-pad-x landing-pad-y"
        >
          <LandingHeading text={"Best Gigs"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap place-items-center ">
            {gigData?.map((gig) => (
              <GigCard
                key={gig._id}
                gig={gig}
                // isOnline={isIncludeInOnlineUsers(onlineUsers, gig?.user?._id)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
