import React, { useEffect, useRef } from "react";
import PageHeading from "../../../components/pageHeading";
import { Images } from "../../../assets/images";
import { useParams } from "react-router-dom";
import {
  useGetVerificationReqeustQuery,
  useVerifyRequestMutation,
} from "../../../redux/api/userApi";
import LoadingSpinner from "../../../components/loadingSpinner";
import toast from "react-hot-toast";
import Loader from "../../../components/loader";

const ManageVerificationRequest = () => {
  const { id } = useParams();
  const { data, isError, isFetching, error } =
    useGetVerificationReqeustQuery(id);
  const loadingToastId = useRef(null);
  const [
    verifyRequest,
    { isError: isVerifyError, isLoading, error: verifyError },
  ] = useVerifyRequestMutation();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isVerifyError) {
      toast.error(verifyError?.data?.message);
    }
    if (isLoading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Loading...");
    }
  }, [isError, error, isVerifyError, verifyError, isLoading]);
  useEffect(() => {
    if (!isLoading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isLoading]);

  const requestData = data?.request;

  const verfiyIt = async () => {
    const data = {
      status: "approved",
    };
    const response = await verifyRequest({
      id: id,
      data,
    });
    console.log("response", response);
    if (response?.data?.success) {
      toast.success("Request verified");
    }
  };
  const rejectIt = async () => {
    const data = {
      status: "rejected",
    };
    const response = await verifyRequest({
      id: id,
      data,
    });
    if (response?.data?.success) {
      toast.success("Request rejected");
    }
  };

  return (
    <div className="f-col md:gap-3 gap-2">
      <div>
        <PageHeading text={"Verify Request"} />
      </div>
      <form>
        <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
          {isFetching ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="item-center">
                <div className="lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[70px] h-[70px]">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden shadow-2xl relative"
                  >
                    <img src={requestData?.user?.avatar?.url} alt="profile" />
                  </label>
                </div>
              </div>
              <div className="flex md:flex-row flex-col-reverse  gap">
                <div className="bg-white f-col justify-between gap general-pad md:shadow-lg shadow-md  gap md:w-[60%] w-full">
                  <div className="f-col gap">
                    <h3 className="text-center lg:text-2xl md:text-xl text-lg capitalize text-grey  md:font-bold font-smeibold">
                      Lawyer info
                    </h3>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"name"} className="input-lable">
                        reeuest _id:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?._id}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"name"} className="input-lable">
                        lawyer _id:
                      </label>
                      <span className="md:text-base text-sm font-medium">
                        {requestData?.lawyer?._id}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"name"} className="input-lable">
                        Name:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.user?.name}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        Email:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.user?.email}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        CNIC:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.user?.cnic}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        City:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.user?.city}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        law firm Name:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.lawyer?.professionalInfo?.lawFirmName}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        position Name:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.lawyer?.professionalInfo?.title}
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        License Number:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {
                          requestData?.lawyer?.professionalInfo?.barAdmission
                            ?.licenseNumber
                        }
                      </span>
                    </div>
                    <div className="flex gap items-center pb-0.5 border-b-1 border-gray-400">
                      <label htmlFor={"email"} className="input-lable">
                        Degree Name:
                      </label>
                      <span className="md:text-base text-sm font-medium ">
                        {requestData?.lawyer?.education?.degreeName}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap">
                      <button
                        className="btn green-bg item-center "
                        onClick={verfiyIt}
                        type="button"
                      >
                        verify
                      </button>
                      <button
                        className="btn red-bg item-center"
                        onClick={rejectIt}
                        type="button"
                      >
                        reject
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white  f-col gap  general-pad md:shadow-lg shadow-md md:w-[40%] w-full">
                  <div className="f-col gap  pb-0.5 border-b-1 border-gray-400">
                    <label htmlFor={"name"} className="input-lable">
                      CNIC Picture:
                    </label>
                    <div className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  overflow-hidden relative small-btn-border-radius lg:p-2 md:p-1 p-0.10 w-full h-[300px]">
                      <img
                        src={requestData?.lawyer?.cnicPicture?.url}
                        alt="cnic"
                        className="w-full h-full object-fill"
                      />
                    </div>
                  </div>
                  <div className="f-col gap  pb-0.5 border-b-1 border-gray-400">
                    <label htmlFor={"name"} className="input-lable">
                      lawyer Id card Picture:
                    </label>
                    <div className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  overflow-hidden relative small-btn-border-radius lg:p-2 md:p-1 p-0.10 w-full h-[300px]">
                      <img
                        src={requestData?.lawyer?.lawyerIdCard?.url}
                        alt="cnic"
                        className="w-full h-full object-fill"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageVerificationRequest;
