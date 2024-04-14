import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProfileInputComp from "../../ProfileInputComp";
import BlackBtn from "../../BlackBtn";

const EditProfile = () => {
  return (
    <Tabs
      className={
        "w-full h-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8 mt-1"
      }
    >
      <TabList className="item-center">
        <Tab className="sub-tab">Professional Info</Tab>
        <Tab className="sub-tab">Education</Tab>
        <Tab className="sub-tab">Available At</Tab>
      </TabList>
      <div className="md:border-2 border-1 border-solid border-gray-400 general-pad md:rounded-xs rounded-xxs h-full">
        <TabPanel>
          <div className="f-col">
            <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
              update your professional info
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8 ">
              <ProfileInputComp
                lable="firm name"
                placeholder="Enter your firm name"
                type="text"
              />
              <ProfileInputComp
                lable="position name"
                placeholder="Enter your position name"
                type="text"
              />
              <ProfileInputComp
                lable="state"
                placeholder="Enter the state"
                type="text"
              />
              <ProfileInputComp
                lable="license number"
                placeholder="Enter your license number"
                type="text"
              />
              <ProfileInputComp
                lable="Experience"
                placeholder="Enter your experience"
                type="text"
              />
            </div>
            <button className="gig-btn">update</button>
          </div>
        </TabPanel>
        <TabPanel >
          {" "}
          <div className="f-col h-full">
            <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
              update your education info
            </h3>
            <div className="f-col justify-between h-full">
              <div className="grid grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8 ">
                <ProfileInputComp
                  lable="institution name"
                  placeholder="Enter your institution name"
                  type="text"
                />
                <ProfileInputComp
                  lable="completion year"
                  placeholder="Enter your completion year"
                  type="text"
                />
              </div>
              <button className="gig-btn">update</button>
            </div>
          </div>
        </TabPanel>
        <TabPanel >
          <div className="f-col h-full">
            <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
              update your professional info
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8 ">
              <ProfileInputComp
                lable="firm name"
                placeholder="Enter your firm name"
                type="text"
              />
              <ProfileInputComp
                lable="position name"
                placeholder="Enter your position name"
                type="text"
              />
              <ProfileInputComp
                lable="state"
                placeholder="Enter the state"
                type="text"
              />
              <ProfileInputComp
                lable="license number"
                placeholder="Enter your license number"
                type="text"
              />
              <ProfileInputComp
                lable="Experience"
                placeholder="Enter your experience"
                type="text"
              />
            </div>
            <button className="gig-btn">update</button>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default EditProfile;
