import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import LawyerGigSkeletonLoading from "../../skeletonLoading/lawyergig";
import {
  useGetMeGigsQuery,
  useLawyerPrfofileQuery,
  useSendVeificationReqeustMutation,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import GigCard from "../../card";
import Loader from "../../loader";
const Gigs = () => {
  const { data, error, isError, isFetching } = useGetMeGigsQuery();
  const {
    data: lawyerData,
    isFetching: isLawyerProfileFetching,
    isError: isLawyerprofileError,
    error: lawyerProfileError,
  } = useLawyerPrfofileQuery();

  const [
    sendVerificationRequest,
    {
      isError: isSendVerificationError,
      error: sendVerificationError,
      isLoading: isSendVerificationLoading,
    },
  ] = useSendVeificationReqeustMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isLawyerprofileError) {
      toast.error(lawyerProfileError.data.message);
    }
    if (isSendVerificationError) {
      toast.error(sendVerificationError.data.message);
    }
  }, [
    isError,
    error,
    isLawyerprofileError,
    lawyerProfileError,
    isSendVerificationError,
    sendVerificationError,
  ]);

  const sendRequestHandler = async () => {
    const response = await sendVerificationRequest();
    if (response?.data?.success) {
      toast.success(response?.data?.message);
    }
  };

  return (
    <div className="lg:p-md-ly-pad md:p-sm-ly-pad sm:p-2xl flex flex-col lg:gap-1 md:gap-md gap-sm h-full w-full">
      {isLawyerProfileFetching ? (
        <div className="grid gap lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          <LawyerGigSkeletonLoading />
        </div>
      ) : lawyerData?.LawyerProfile?.isVerified === false ? (
        <>
          <div className="item-center h-full">
            <button
              className="gig-btn item-center"
              type="button"
              onClick={sendRequestHandler}
            >
              {isSendVerificationLoading
                ? <Loader/>
                : "Send Verification Request"}
            </button>
          </div>
        </>
      ) : isFetching ? (
        <div className="grid gap lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <LawyerGigSkeletonLoading />
        </div>
      ) : (
        <>
          <div className="grid gap lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {data?.gigs?.map((gig, index) => (
              <GigCard key={index} gig={gig} me={true} />
            ))}
            {data?.gigs.length < 2 && (
              <Link
                to={"/lawyer-gig/step1"}
                className="md:rounded-sm rounded-xs item-center flex-col lg:gap-sm md:gap-xs sm:gap-xxs  min-h-gig-card-h item-center lg:shadow-3xl md:shadow-2xl sm:shadow-lg shadow-md"
              >
                <span className="gray-circle">
                  <MdAdd />
                </span>
                <span className="md:text-base sm:text-sm text-xs text-black md:font-semibold font-medium ">
                  Create a new Gig
                </span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Gigs;
