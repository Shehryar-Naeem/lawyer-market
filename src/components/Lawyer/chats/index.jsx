import React from "react";
import { Images } from "../../../assets/images";

const Chat = () => {
  return (
    <div className="bg-gray-100 h-full md:p-1 p-0.10">
      <div className="flex gap max-h-[550px] overflow-hidden h-full">
        <div className="h-full flex max-w-full bg-white md:min-w-[250px]   md:shadow-lg">
          <div className="f-col w-full justify-between h-full gap md:p-0.8 p-0.5">
            <form
              className="sticky top-[8px] bg-white md:rounded-sm rounded-xs w-full"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                name="all"
                // value={inputValue.all}
                type="text"
                className="w-full md:p-0.8 px-0.5 text-[1rem] border border-gray-300 md:rounded-sm  rounded-xs outline-none focus:ring-0"
                placeholder="search..."
                aria-label="Search"
                // onChange={handleFilterChange}
              />
            </form>
            <div className="f-col h-full gap overflow-auto custom-scroll">
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap items-center bg-gray-300 p-0.5 md:rounded-sm rounded-xs cursor-pointer hover:bg-gray-200">
                <div className=" max-w-[30px] bg-gray-100 rounded-full overflow-hidden md:p-[2px] p-[1px] ">
                  <img src={Images.client} className="rounded-full" />
                </div>
                <div className="f-col gap-0.5 w-full ">
                  <span className="md:text-base text-sm md:font-bold font-semibold capitalize">
                    name
                  </span>
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs  md:font-bold font-semibold capitalize">
                      3 message
                    </span>
                    <div className="h-[9px] w-[9px]  block bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full bg-white w-full overflow-auto md:shadow-lg">
          <div className="f-col gap md:p-0.8 p-0.5">df</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
