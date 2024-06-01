import React, { useEffect, useState } from "react";
import PageHeading from "../../components/pageHeading";
import GigCarousel from "../../components/carousel";
import { Avatar } from "primereact/avatar";
import { FaStar } from "react-icons/fa6";
import Tag from "../../components/tag";
import LawyerRating from "../../components/LawyerRating";
import Ratiing from "../../components/rating";
import {
  useAddReviewMutation,
  useAllowReviewQuery,
  useCreateConversationMutation,
  useGetGigByIdQuery,
  useGetReviewsOfGigsQuery,
} from "../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import GigDetailLoading from "../../components/skeletonLoading/sectionLoading";
import { CaptializeFirstLetter, options } from "../../utils/helper";
import Loader from "../../components/loader";
import RatingModel from "../../components/RatingModel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FailureAlert from "../../components/alert";

const reviewSchema = yup.object().shape({
  rating: yup.number().required("rating is required"),
  comment: yup.string().required("comment is required"),
});

const GigDetail = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      rating: null,
      comment: "",
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetGigByIdQuery(id);
  const {
    data: allowReview,
    isLoading: reviewLoading,
    isError: isReviewErrorStatus,
    error: allReviewStatusError,
  } = useAllowReviewQuery(id);

  const [
    createConversation,
    {
      isLoading: isCreateConversation,
      isError: isConversationError,
      error: conversationError,
    },
  ] = useCreateConversationMutation();
  const [
    addReview,
    {
      isLoading: isReviewloading,
      isError: isReveiwError,
      error: reviewError,
      isSuccess,
    },
  ] = useAddReviewMutation();
  const {
    data: gigReviewData,
    isLoading: getReviewLoading,
    isError: isGetReviewError,
    error: getReviewError,
  } = useGetReviewsOfGigsQuery(id, options);
  // console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (isConversationError) {
      toast.error(conversationError?.data?.message);
    }
    if (isReveiwError) {
      toast.error(reviewError?.data?.message);
    }

    if (isGetReviewError) {
      toast.error(getReviewError?.data?.message);
    }

    setUserId(data?.gig?.user?._id);
  }, [
    isError,
    data,
    error,
    isConversationError,
    conversationError,
    isReveiwError,
    reviewError,
    isGetReviewError,
    getReviewError,
  ]);

  useEffect(() => {
    if (isReviewErrorStatus) {
      toast.error(allReviewStatusError?.data?.message);
    }
  }, [isReviewErrorStatus, allReviewStatusError]);

  const customAvatar = {
    image: "h-full w-full rounded-full object-cover",
  };

  const gigDetail = data?.gig;

  console.log("gigDetail", gigDetail);

  const createConversatioHandler = async () => {
    const { data } = await createConversation({ receiverId: userId });
    if (data?.success) {
      toast.success(data.message);
      navigate(`/client-profile/chat/${data.conversation._id}`);
    }
  };
  const addReviewHandler = async (data) => {
    const response = await addReview({ id: id, data: data });
    console.log(response);
    if (response?.data?.success) {
      toast.success(response.data.message);
      setOpenModal(!openModal);
    }
    reset();
  };
  const onClear = () => {
    setValue("rating", 0);
    setValue("comment", "");
    setRating(0);
  };
  // console.log("gigReviewData", gigReviewData);
  return (
    <>
      {isLoading ? (
        <div className="page-container">
          <div className="container f-col general-pad gap-8">
            <div className=" general-pad ">
              <div className="grid grid-cols-3 lg:gap-3 md:gap-2 gap-1 ">
                <div className="md:col-span-2 col-span-3 ">
                  <div className="h-screen">
                    <GigDetailLoading />
                  </div>
                </div>
                <div className="h-full md:col-span-1 col-span-3 ">
                  <div className="md:h-full h-[50vh] f-col md:gap-2 gap-1 ">
                    <div className="h-1/2">
                      <GigDetailLoading />
                    </div>
                    <div className="h-1/2">
                      <GigDetailLoading />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="page-container">
            <div className="container f-col general-pad gap-8">
              <PageHeading text="About gig" />
              <div className=" general-pad ">
                <div className="grid grid-cols-3 lg:gap-3 md:gap-2 gap-1 ">
                  <div className="md:col-span-2 col-span-3 bg-white layout-box-shadow">
                    <div className="f-col md:gap-2 gap-1  general-pad ">
                      <div className="lg:h-[380px] md:h-[330px] h-[250px]">
                        <GigCarousel images={gigDetail?.images} />
                      </div>

                      <h2 className="heading">
                        {CaptializeFirstLetter(gigDetail?.title)}
                      </h2>
                      <div className="flex items-center gap">
                        <Avatar
                          image={gigDetail?.user?.avatar?.url}
                          className="lg:w-avatar lg:h-avatar md:w-md-avatar md:h-md-avatar h-sm-avatar w-sm-avatar overflow-hidden border border-solid border-slate-gray p-[4px] rounded-full md:mr-1 mr-0.5 object-cover cursor"
                          imageAlt="user-profile"
                          shape="circle"
                          size="large"
                          pt={customAvatar}
                        />
                        <div className="flex-col gap">
                          <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey">
                            {CaptializeFirstLetter(gigDetail?.user?.name)}
                          </span>
                          <div className="flex gap justify-between md:w-[200px] w-auto">
                            <div className="flex md:gap-xs gap-[1px] items-center ">
                              <span className="md:text-base text-sm text-yellow-400">
                                <FaStar />
                              </span>
                              <b className="md:text-base text-sm text-grey md:font-extrabold font-bold">
                                {gigDetail?.ratings}
                              </b>
                              <span className="md:text-base text-sm text-grey md:font-semibold font-medium">
                                ({gigDetail?.numOfReviews})
                              </span>
                            </div>
                            <span className="lg:text-lg md:text-base text-sm lg:font-bold md:font-semibold font-medium text-grey capitalize">
                              {gigDetail?.user?.city}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="f-col gap">
                        <h3 className="gig-detail-heading">About this gig</h3>
                        <p className="para">
                          {CaptializeFirstLetter(
                            gigDetail?.description.replace(/<[^>]+>/g, "")
                          )}
                        </p>
                      </div>
                      <div className="f-col gap">
                        <h3 className=" gig-detail-heading">Lawyer services</h3>
                        <div className="flex flex-wrap gap">
                          {gigDetail?.pricing.services?.map(
                            (service, index) => (
                              <Tag cat={service} key={index} />
                            )
                          )}
                        </div>
                      </div>
                      <div className="f-col gap">
                        <h3 className=" gig-detail-heading">Lawyer category</h3>
                        <div className="flex flex-wrap gap">
                          {gigDetail?.category?.map((cat, index) => (
                            <Tag cat={cat} key={index} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1 col-span-3  ">
                    <div className="f-col md:gap-2 gap-1  ">
                      <div className="general-pad f-col gap bg-white layout-box-shadow ">
                        <div className="f-col md:gap-1 gap-0.10 border border-gray-400 general-pad small-btn-border-radius">
                          <h3 className="gig-detail-heading">
                            Professional info
                          </h3>
                          <div className="f-col gap ">
                            <div className="info-label-gap">
                              <span className="info-label-text-bold">
                                Legal firm Name:
                              </span>
                              <span className="info-label-text text-wrap">
                                {
                                  gigDetail?.lawyer?.professionalInfo
                                    ?.lawFirmName
                                }
                                {/* {professionalInfo?.lawFirmName} */}
                              </span>
                            </div>
                            <div className="info-label-gap">
                              <span className="info-label-text-bold">
                                Position Name:
                              </span>
                              <span className="info-label-text">
                                {gigDetail?.lawyer?.professionalInfo?.title}
                                {/* {professionalInfo?.lawFirmName} */}
                              </span>
                            </div>
                            <div className="info-label-gap">
                              <span className="info-label-text-bold">
                                Degree Name:
                              </span>
                              <span className="info-label-text">
                                {gigDetail?.lawyer?.education?.degreeName}
                                {/* {professionalInfo?.lawFirmName} */}
                              </span>
                            </div>
                            <div className="info-label-gap">
                              <span className="info-label-text-bold">
                                experience:
                              </span>
                              <span className="info-label-text">
                                {
                                  gigDetail?.lawyer?.professionalInfo
                                    ?.experience
                                }
                                {/* {professionalInfo?.lawFirmName} */}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="f-col md:gap-1 gap-0.10 border border-gray-400 general-pad small-btn-border-radius">
                          <h3 className="gig-detail-heading">Availabilty</h3>
                          <div className="f-col gap ">
                            <div className="info-label-gap f-col">
                              <span className="info-label-text-bold">
                                Days of the week:
                              </span>
                              <div className="flex flex-wrap gap">
                                {gigDetail?.lawyer?.availability?.days.map(
                                  (day, index) => (
                                    <>
                                      <Tag cat={day} key={index} />
                                    </>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="f-col gap ">
                            <div className="info-label-gap ">
                              <span className="info-label-text-bold">
                                city:
                              </span>
                              <span className="info-label-text">
                                {gigDetail?.user.city}
                                {/* {professionalInfo?.lawFirmName} */}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="general-pad f-col gap bg-white layout-box-shadow ">
                        <div className="f-col md:gap-1 gap-0.10 border border-gray-400 general-pad small-btn-border-radius">
                          <h3 className="gig-detail-heading">Pricing</h3>
                          <div className="f-col gap ">
                            <div className="info-label-gap">
                              <span className="info-label-text-bold">
                                basic price:
                              </span>
                              <span className="info-label-text">
                                {gigDetail?.pricing.price}
                                {/* {professionalInfo?.lawFirmName} */}
                              </span>
                            </div>
                          </div>
                          <p className="text-grey md:text-base sm:text-sm text-xs font-semibold">
                            Hire me for your work
                          </p>
                          <button
                            className="gig-btn"
                            onClick={createConversatioHandler}
                          >
                            {isCreateConversation ? (
                              <div className="item-center">
                                <Loader />
                              </div>
                            ) : (
                              "contact"
                            )}
                          </button>
                        </div>
                      </div>
                      {allowReview?.data && (
                        <div className="general-pad f-col gap bg-white layout-box-shadow ">
                          <div className="f-col md:gap-1 gap-0.10 border border-gray-400 general-pad small-btn-border-radius">
                            <h3 className="gig-detail-heading">Give rating</h3>

                            <button
                              className="gig-btn"
                              onClick={() => setOpenModal(!openModal)}
                            >
                              rating
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <PageHeading text="Reviews" />
              <div className="w-full general-pad">
                <div className="bg-white general-pad layout-box-shadow grid lg:grid-cols-3 grid-cols-1 gap ">
                  {getReviewLoading ? (
                    // <div className="col-span-2">
                    <GigDetailLoading />
                  ) : // </div>
                  gigReviewData?.reviews?.length < 1 ? (
                    <div className="col-span-3 h-[400px] flex items-center justify-center">
                      <p className="text-center lg:text-2xl md:text-xl text-lg lg:font-extrabold md:font-bold font-semibold capitalize">
                        No reviews yet
                      </p>
                    </div>
                  ) : (
                    gigReviewData?.reviews?.map((review, index) => (
                      <>
                        <LawyerRating review={review} />
                      </>
                    ))
                  )}
                  {/* <LawyerRating />
                  <LawyerRating /> */}
                </div>
              </div>
            </div>
          </div>
          {openModal && (
            <RatingModel
              isReviewloading={isReviewloading}
              title={"comment"}
              openModal={openModal}
              setOpenModal={setOpenModal}
              handleSubmit={handleSubmit}
              reset={reset}
              addReviewHandler={addReviewHandler}
              onClear={onClear}
            >
              <form className="f-col gap items-start justify-start w-full">
                <Ratiing
                  setValue={setValue}
                  watch={watch}
                  register={register}
                  rating={rating}
                  setRating={setRating}
                />
                {errors.rating && (
                  <FailureAlert error={errors.rating.message} />
                )}
                <div className="w-full">
                  <textarea
                    className="w-full h-32 border border-gray-400 p-0.5 small-btn-border-radius focus:border-black focus:ring-0 focus:outline-none"
                    placeholder="comment"
                    {...register("comment")}
                  ></textarea>
                  {errors.comment && (
                    <FailureAlert error={errors.comment.message} />
                  )}
                </div>
              </form>
            </RatingModel>
          )}
        </>
      )}
    </>
  );
};

export default GigDetail;
