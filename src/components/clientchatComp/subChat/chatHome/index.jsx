import React from "react";
import { Images } from "../../../../assets/images";

const ClientChatHome = () => {
  return (
    <div className="h-full item-center w-full">
      <div className="f-col gap item-center  h-full">
        <div className="lg:w-[150px] lg:h-[150px] md:w-[140px] md:h-[140px] w-[100px] h-[100px]">
          <img
            src={Images.chat}
            alt="chat"
            className="w-full h-full object-fill"
          />
        </div>
        <p className="text-center lg:text-2xl md:text-xl text-lg lg:font-extrabold md:font-bold font-semibold capitalize">
          hope
          <br />
          you are doing well
        </p>
      </div>
    </div>
  );
};

export default ClientChatHome;
