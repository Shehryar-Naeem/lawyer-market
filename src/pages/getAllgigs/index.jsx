import React, { useEffect, useState } from "react";
import { useGetAllgigsQuery, userApi } from "../../redux/api/userApi";
import CardSkeletonLoading from "../../components/skeletonLoading/cardLoading";
import GigCard from "../../components/card";
import toast from "react-hot-toast";
import Pagination from "react-js-pagination";
import { Images } from "../../assets/images";
import { FaSliders } from "react-icons/fa6";
import FilterModel from "../../components/fillterModel";
import { cites, lawyerCategories, lawyerServices } from "../../data";
import { useSocket } from "../../socket/socket";
import { useDispatch } from "react-redux";
import { isIncludeInOnlineUsers } from "../../contants/helper";

const GetAllGigs = () => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSocket();
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategary] = useState("");
  const [search, setSearch] = useState("");
  const [services, setServices] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // console.log("onlineUsers",onlineUsers);
  const [formValues, setFormValues] = useState({
    category: "",
    services: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });
  const [filterValues, setFilterValues] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { data, error, isError, isFetching, isLoading, refetch } =
    useGetAllgigsQuery(
      { currentPage, search, ...filterValues },
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
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleFilterSubmit = (event) => {
    // alert("Filter Submitted");
    event.preventDefault();
    setFilterValues(formValues);
    setIsFormSubmitted(true);
    setCurrentPage(1);
    setOpenModal(false);
  };

  const handleClearFilters = () => {
    setFormValues({
      category: "",
      services: "",
      city: "",
      minPrice: "",
      maxPrice: "",
    });
    setSearch("");
    setFilterValues({});
  };
  // useEffect(() => {

  // },[onlineUsers])
  // console.log("onlineUsers",onlineUsers);
  const skeletonCount = Math.floor(window.innerHeight / 100) * 1.5 + 2;

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
                    <form
                      className="relative flex-1 "
                      role="search"
                      // onSubmit={handleFilterSubmit}
                    >
                      <input
                        name="search"
                        value={search}
                        type="text"
                        className="w-full general-pad text-[1rem] border border-gray-300 md:rounded-sm  rounded-xs outline-none focus:ring-0"
                        placeholder="search..."
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
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
                        <GigCard
                          key={gig._id}
                          gig={gig}
                          isOnline={isIncludeInOnlineUsers(
                            onlineUsers,
                            gig?.user?._id
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="paginationBox">
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
          </div>
        </div>
      </div>
      {openModal && (
        <FilterModel
          title={"Apply Filter"}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleClearFilters={handleClearFilters}
          handleFilterSubmit={handleFilterSubmit}
        >
          <form className="f-col gap">
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"category"} class="modal-input-label">
                category
              </label>
              <select
                className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                value={formValues.category}
                name="category"
                onChange={handleFilterChange}
              >
                <option value={""}>select category...</option>
                {lawyerCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"services"} class="modal-input-label">
                services
              </label>
              <select
                className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                value={formValues.services}
                name="services"
                onChange={handleFilterChange}
              >
                <option value={""}>select services...</option>
                {lawyerServices.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col lg:gap-0.8 md:gap-0.5 gap-xs">
              <label htmlFor={"city"} class="modal-input-label">
                city
              </label>
              <select
                className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                value={formValues.city}
                name="city"
                onChange={handleFilterChange}
              >
                <option value={""}>select city...</option>
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
              <label htmlFor={"minPrice"} class="modal-input-label">
                price
              </label>
              <div className="flex gap">
                <input
                  type={"number"}
                  id={"price"}
                  name="minPrice"
                  value={formValues.minPrice}
                  onChange={handleFilterChange}
                  placeholder="min price"
                  className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                  // placeholder={placeholder}
                  // {...register(name)}
                />
                <input
                  type={"number"}
                  id={"price"}
                  name="maxPrice"
                  value={formValues.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="max price"
                  className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
                  // placeholder={placeholder}
                  // {...register(name)}
                />
              </div>
            </div>
          </form>
        </FilterModel>
      )}
      {/* <FilterModel openModal={openModal} setOpenModal={setOpenModal} /> */}
    </>
  );
};

export default GetAllGigs;
