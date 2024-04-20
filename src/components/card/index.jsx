import React from "react";
import { Card, Flowbite } from "flowbite-react";
import { CaptializeFirstLetter } from "../../utils/helper";
import Ratiing from "../rating";

const GigCard = ({ gig, key }) => {
  const customTheme = {
    card: {
      root: {
        base: "p-0.5 flex md:rounded-md border border-gray-200 bg-white md:shadow-md shadow-sm ",
        children: "flex h-full flex-col  gap p-0 h-full",
      },
    },
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Card key={key}>
        <div className="card-h md:rounded-sm rounded-xs overflow-hidden ">
          <img
            src={gig?.images[0]?.url}
            alt="gig"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="f-col md:gap-1 sm:gap-sm gap-xs  justify-between ">
          <div className="flex md:gap-1 sm:gap-sm gap-xs items-center">
            <img
              src={gig?.user?.avatar?.url}
              className="md:w-[35px] md:h-[35px] w-[30px] h-[30px] p-0 rounded-full"
            />
            <h3 className="text-black lg:text-base  md:text-lg sm:text-base text-sm md:font-bold font-medium">
              {CaptializeFirstLetter(gig?.title)}
            </h3>
          </div>

          
          <ul className="flex md:gap-sm gap-xs flex-wrap">
         
            {
            gig?.category?.map((cat,index) => (
              <li key={index} className="tag-text">
                 {CaptializeFirstLetter(cat.split(' ')[0])}
              </li>
            ))
           }
          </ul>
          {/* <span className="card-text">rating</span> */}
          <div>
            <Ratiing readonly={true} cancel={false}/>
          </div>

          <div className="flex justify-between">
            <span className="card-text">price</span>
            {/* <span className="card-text">{CaptializeFirstLetter(gig?.user?.city)}</span> */}
          </div>
        </div>
      </Card>
    </Flowbite>
  );
};

export default GigCard;
