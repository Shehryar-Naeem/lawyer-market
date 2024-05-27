import React, { useEffect, useState } from "react";
import { FaSliders } from "react-icons/fa6";
import Post from "../../components/post";
import { useGetJobsQuery } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import Pagination from "react-js-pagination";
import FilterModel from "../../components/fillterModel";
import { cites, lawyerCategories } from "../../data";
import { MdOutlineNotInterested } from "react-icons/md";
import JobSkeleton from "../../components/skeletonLoading/jobLoading";
import Empty from "../../components/empty";
import { scrollToTop } from "../../utils/helper";

const AllPosts = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    category: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });
  const [filterValues, setFilterValues] = useState({});
  const [filterSearch, setFilterSearch] = useState("");
  useEffect(() => {
    scrollToTop();
  }, []);

  const { data, isLoading, isError, error, isFetching } = useGetJobsQuery(
    { currentPage, search, ...filterValues },
    {
      pollingInterval: 3000,
      refetchOnMountOrArgChange: 60,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      skip: currentPage <= 0,
    }
  );
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch jobs");
    }
  }, [isError]);
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
    // setIsFormSubmitted(true);
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
  const onPageChange = (e) => {
    setCurrentPage(e);
  };

  console.log("data", data);
  const skeletonCount = Math.floor(window.innerHeight / 100);
  return (
    <>
      <div className="bg-gray-100">
        <div className="container page-container-without-bg flex f-col justify-between">
          <div>
            <>
              <div className="f-col md:gap-[2rem] gap-[1.5rem] mt-[2rem]">
                <div className="bg-white general-pad mx-2 rounded-[10px] flex flex-wrap gap justify-center  md:shadow-lg shadow-md">
                  <form
                    className="relative flex-1 "
                    role="search"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // setFilterSearch(search);
                    }}
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
                  {isLoading ? (
                    <div className="f-col lg:gap-2 md:gap-1.5 gap-1 h-full">
                      <>
                        {Array.from({ length: skeletonCount }).map(
                          (_, index) => (
                            <>
                              <JobSkeleton key={index} />
                            </>
                            //   <CardSkeletonLoading key={index} />
                          )
                        )}
                      </>
                    </div>
                  ) : data?.data?.length < 1 ? (
                    <>
                      <Empty text={"No job"} />
                    </>
                  ) : (
                    <>
                      <div className="f-col lg:gap-2 md:gap-1.5 gap-1">
                        {data?.data?.map((post) => {
                          return (
                            <Post
                              key={post.id}
                              post={post}
                              showSenderBtn={true}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          </div>
          <div>
            {!isLoading &&
              (data?.data?.length < 1 ? null : (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={data?.resultPerPage}
                    totalItemsCount={data?.jobCounts}
                    onChange={onPageChange}
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
              ))}
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
    </>
  );
};

export default AllPosts;
