import React, { useEffect } from "react";
import PageHeading from "../../components/pageHeading";
import Post from "../../components/post";
import ProfileInputComp from "../../components/ProfileInputComp";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  useGetJobByIdQuery,
  useSendProposalMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FailureAlert from "../../components/alert";
import Loader from "../../components/loader";

const proposalSchema = yup.object().shape({
  proposal: yup.string().required("Proposal is required"),
  pricing: yup
    .number()
    .typeError("price must be a number")
    .required("Price is required")
    .positive("please enter the valid number")
    .moreThan(0, "Price must be positive"),
});
const SendProposal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(proposalSchema),
  });
  const [
    sendProposal,
    {
      isError: isSendingError,
      isLoading: isSendingLoading,
      error: sendingError,
    },
  ] = useSendProposalMutation();
  const { id } = useParams();

  const { data, isError, isFetching, error } = useGetJobByIdQuery(id);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred");
    }
    if (isSendingError) {
      toast.error(sendingError?.data?.message || "An error occurred");
    }
  }, [isError, error, isSendingError, sendingError]);
  const submitHandler = async (data) => {
    try {
      const response = await sendProposal({ id: id, data });
      if (response?.data?.success) {
        toast.success("Proposal sent successfully");
        reset();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="container f-col general-pad gap-8">
          <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
            <PageHeading text="send reqeust" />
          </div>

          <>
            <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
              {isFetching ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Post post={data?.data} notShowLink={true} />

                  <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="f-col md:pt-[30px] pt-3 gap-2">
                      <div className="f-col gap">
                        <label htmlFor={"proposal"} class="input-lable">
                          {"your message"}
                        </label>
                        <textarea
                          name="proposal"
                          placeholder="description"
                          id="proposal"
                          {...register("proposal")}
                          className="textarea-field"
                        />
                        {errors.proposal && (
                          <FailureAlert error={errors.proposal.message} />
                        )}
                      </div>
                      <div className="f-col gap">
                        <ProfileInputComp
                          lable="Your Price"
                          placeholder="starting from 3,999 Rupees only"
                          type="number"
                          register={register}
                          name="pricing"
                        />
                        {errors.pricing && (
                          <FailureAlert error={errors.pricing.message} />
                        )}
                      </div>
                      <div className="flex justify-end w-full">
                        <button
                          // to={`/lawyer/send-proposal/123`}
                          className="gig-btn"
                          type="submit"
                        >
                          {isSendingLoading ? <Loader /> : "Send Proposal"}
                        </button>
                      </div>
                    </div>
                  </form>
                  <div>
                    <div className="pt-">
                      <p className="d:pt-[30px] pt-3">
                        If Client find your request good, he wiill contact you
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default SendProposal;
