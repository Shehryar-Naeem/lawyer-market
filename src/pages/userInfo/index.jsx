import React, { useEffect } from "react";
import UserInfoData from "./userData";
import GigCard from "../../components/card";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetAllGigsOfUserQuery,
  useGetUserDataQuery,
} from "../../redux/api/userApi";
import GigDetailLoading from "../../components/skeletonLoading/sectionLoading";
import Empty from "../../components/empty";

const UserInfo = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetAllGigsOfUserQuery(id);
  const {
    currentData,
    isLoading: dataLoading,
    isError: isDataError,
    error: DataError,
  } = useGetUserDataQuery(id);
  // console.log(currentData);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }

    if (isDataError) {
      toast.error(DataError.data.message);
    }
  }, [isError, error]);

  return (
    <div className="page-container">
      <div className="container f-col gap-1 m-auto layout-pad">
        {isLoading || dataLoading ? (
          <div className="grid lg:gap-3 md:gap-2 gap-1 grid-cols-6">
            <div className="md:col-span-2 col-span-6 flex flex-col lg:gap-3 md:gap-2 gap-1">
              <div className="w-full h-[60vh]">
                <GigDetailLoading />
              </div>
            </div>
            <div className="md:col-span-4 col-span-6 flex flex-col md:gap-1 gap-sm">
              <div className="w-full h-[60vh]">
                <GigDetailLoading />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:gap-3 md:gap-2 gap-1 grid-cols-6">
            <UserInfoData currentData={currentData} />
            <div className="md:col-span-4 col-span-6 flex flex-col md:gap-1 gap-sm">
              <div className="h-full w-full flex gap-1 flex-col bg-white shadow-2xl lg:p-2 md:p-1 p-0.5">
                {data?.gigs?.length < 1 ? (
                  <div className="w-full h-[60vh] flex items-center justify-center">
                    <Empty text="No gigs yet" />
                  </div>
                ) : (
                  <div className="grid gap lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {data?.gigs?.map((gig) => (
                      <GigCard key={gig._id} gig={gig} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
