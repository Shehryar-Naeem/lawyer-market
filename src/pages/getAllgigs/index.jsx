import React, { useEffect, useState } from "react";
import { useGetAllgigsQuery } from "../../redux/api/userApi";
import CardSkeletonLoading from "../../components/skeletonLoading/cardLoading";
import GigCard from "../../components/card";
import toast from "react-hot-toast";
import Pagination from "react-js-pagination";

const GetAllGigs = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
  return (
    <div className="container h-full">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap general-pad">
        {isLoading ? (
          <>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <CardSkeletonLoading key={index} />
            ))}
          </>
        ) : (
          data?.gigs?.map((gig) => <GigCard key={gig._id} gig={gig} />)
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
  );
};

export default GetAllGigs;
