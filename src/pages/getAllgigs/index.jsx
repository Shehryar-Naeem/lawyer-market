import React, { useEffect, useState } from "react";
import { useGetAllgigsQuery } from "../../redux/api/userApi";
import CardSkeletonLoading from "../../components/skeletonLoading/cardLoading";
import GigCard from "../../components/card";
import toast from "react-hot-toast";
import Pagination from "react-js-pagination";
import { Images } from "../../assets/images";
import { FaSliders } from "react-icons/fa6";
import FilterModel from "../../components/fillterModel";
import { cites, lawyerCategories, lawyerServices } from "../../data";

const GetAllGigs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const { data, error, isError, isFetching, isLoading } = useGetAllgigsQuery(
    { currentPage },
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: 60,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      skip: currentPage <= 0,
    }
  );
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);
  let count = data?.filterGigCount;
  console.log(data);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const skeletonCount = Math.floor(window.innerHeight / 100) * 1.5 + 2;
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
  };
  return (
    <>
      <div className="bg-gray-100">
        <div className="container page-container-without-bg flex f-col justify-between">
          <div>
            {isLoading ? (
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap general-pad">
                <>
                  {Array.from({ length: skeletonCount }).map((_, index) => (
                    <CardSkeletonLoading key={index} />
                  ))}
                </>
              </div>
            ) : (
              <>
                <div className="f-col md:gap-[2rem] gap-[1.5rem] mt-[2rem]">
                  <div className="bg-white general-pad mx-2 rounded-[10px] flex flex-wrap gap justify-center  md:shadow-lg shadow-md">
                    <form className="relatvie flex-1 " role="search">
                      <input
                        name="all"
                        // value={inputValue.all}
                        type="text"
                        className="w-full general-pad text-[1rem] border border-gray-300 md:rounded-sm  rounded-xs outline-none focus:ring-0"
                        placeholder="search..."
                        aria-label="Search"
                        onChange={handleFilterChange}
                      />
                    </form>
                    <button
                      className="border border-gray-300 md:rounded-sm rounded-xs cursor-pointer md:px-1 md:text-xl text-lg px-0.10"
                      onClick={() => setOpenModal(!openModal)}
                    >
                      <FaSliders />
                    </button>
                  </div>

                  <div className="bg-white general-pad lg:rounded-lg md:rounded-md rounded-sm mx-2 ">
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap general-pad ">
                      {data?.gigs?.map((gig) => (
                        <GigCard key={gig._id} gig={gig} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="paginationBox">
            {data?.resultPerPage <= count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={data?.resultPerPage}
                  totalItemsCount={data?.gigsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <FilterModel
          title={"Apply Filter"}
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <div className="f-col gap">
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"category"} class="modal-input-label">
                category
              </label>
              <select className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5">
                <option>select category...</option>
                {lawyerCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"category"} class="modal-input-label">
                services
              </label>
              <select className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5">
                <option>select services...</option>
                {lawyerServices.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {/* <input
                type={""}
                id={name}
                className="border border-primary text-primary placeholder-black  md:text-lg text-sm small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                // placeholder={placeholder}
                // {...register(name)}
              /> */}
            </div>
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"category"} class="modal-input-label">
                city
              </label>
              <select className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5">
                <option>select city...</option>
                {cites.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {/* <input
                type={""}
                id={name}
                className="border border-primary text-primary placeholder-black  md:text-lg text-sm small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                // placeholder={placeholder}
                // {...register(name)}
              /> */}
            </div>
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"category"} class="modal-input-label">
                price
              </label>
              <div className="flex gap">
                <input
                  type={"number"}
                  id={"price"}
                  className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                  // placeholder={placeholder}
                  // {...register(name)}
                />
              <input
                type={"number"}
                id={"price"}
                className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                // placeholder={placeholder}
                // {...register(name)}
              />
              </div>
            </div>
          </div>
        </FilterModel>
      )}
      {/* <FilterModel openModal={openModal} setOpenModal={setOpenModal} /> */}
    </>
  );
};

export default GetAllGigs;
