import React, { useEffect, useRef, useState } from "react";
import Stepper from "../../../components/Stepper";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import BlackBtn from "../../../components/BlackBtn";
import { lawyerCategories } from "../../../data";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PageHeading from "../../../components/pageHeading";
import FailureAlert from "../../../components/alert";
import {
  useGetGigDetailQuery,
  useGigstepOneMutation,
  useUpdateGigMutation,
  userApi,
} from "../../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader";
import toast from "react-hot-toast";
import LoadingSpinner from "../../loadingSpinner";

const gigStepOneSchema = yup.object().shape({
  title: yup
    .string()
    .min(15, "Title must be higher than 15 characters")
    .max(80, "Title must be less than 80 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(100, "Description must be higher than 100 characters")
    .required("Description is required"),
  category: yup
    .array()
    .min(3, "Select at least 3 categories")
    .required("Category is required"),
});

const EditGigStep1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(gigStepOneSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
    },
  });
  const { id } = useParams();

  const [updateGig, { isError, isLoading, isSuccess, error }] =
    useUpdateGigMutation();
  const {
    data: gigData,
    error: gigError,
    isSuccess: gigIsSuccess,
    isError: isGigError,
    isLoading: gigIsGigLoading,
    isFetching,
    refetch,
  } = useGetGigDetailQuery(id);

  const navigate = useNavigate();
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };
  const header = renderHeader();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isGigError) {
      toast.error(gigError.data.message);
    }
  }, [isError]);
  useEffect(() => {
    if (gigIsSuccess) {
      setValue("title", gigData?.gig?.title);
      setValue("description", gigData?.gig?.description);
      setValue("category", gigData?.gig?.category);
    }
  }, [
    gigIsSuccess,
    setValue,
    gigData?.gig?.title,
    gigData?.gig?.description,
    gigData?.gig?.category,
  ]);
  const submitHandler = async (data) => {
    try {
      const response = await updateGig({ id, data });

      if (response && response?.data?.success) {
        refetch();
        navigate("/edit-gig/step2", {
          state: { gigId: response.data.gig?._id },
        });
      }
    } catch (error) {
      console.error("An error occurred while processing gigStepOne:", error);
      // Handle error here
    }
  };

  // console.log(gigData, error, isLoading, isSuccess);
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <div className="bg-white md:shadow-lg shadow-md lg:p-4xl md:p-3xl p-3xl">
            <Stepper step={0} />
          </div>
          <PageHeading text="basic gig info" />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
              {isFetching || gigIsGigLoading ? (
                <>
                <LoadingSpinner/>
                </>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-0.8 gap-sm place-items-end">
                    <div className="w-full lg:gap-0.10 md:gap-0.8 gap-sm f-col justify-between">
                      <label className="gig-label">Gig Title</label>
                      <div className="relative">
                        <span
                          className="xl:text-xl lg:text-lg md:text-base text-sm  md:font-extrabold font-bold absolute md:p-0.8 p-0.5 top-0"
                          // style={{
                          //   transform: `translateY(${errors.title ? "" : ""})`,
                          // }}
                        >
                          I will
                        </span>
                        <textarea
                          type="text"
                          name="name"
                          rows={2}
                          maxRows={2}
                          placeholder="be your"
                          id="name"
                          className="text-input lg:h-[80px] md:h-[70px] h-[60px]"
                          {...register("title")}
                          maxlength="80"
                        />
                        {errors.title && (
                          <FailureAlert error={errors.title.message} />
                        )}
                      </div>
                    </div>
                    <div className="w-full f-col lg:gap-0.10 md:gap-0.8 gap-sm">
                      <h3 className="capitalize text-gray-500 text-center md:text-lg text-base md:font-semibold font-bold">
                        Example title
                      </h3>
                      <ol className="row-span-full f-col md:gap-0.5 list-disc md:pl-ly-pad px-md-ly-pad md:text-base text-sm md:font-semibold font-medium text-black">
                        <li>Be Your Lawyer That will represent you in Court</li>
                        <li>Be Your Lawyer for Bail</li>
                        <li>Represent you in court for Ownership of Car</li>
                        <li>
                          Settling disputes and supervising any agreements
                        </li>
                        <li>
                          Defend or prosecute clients by presenting evidence in
                          litigation.
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="lg:gap-0.10 md:gap-0.8 gap-sm f-col">
                    <label className="gig-label">discription</label>
                    {/* <Editor
                  name="description"
                  onTextChange={(e) => {
                    // Remove HTML tags from the content
                    const textValue = e.htmlValue.replace(/<[^>]+>/g, "");
                    setValue("description", textValue);
                  }}
                  headerTemplate={header}
                  style={{ height: "320px" }}
                /> */}

                    <textarea
                      name="description"
                      placeholder="description"
                      id="description"
                      className="border border-primary resize-none text-gray-900  block xl:text-lg lg:base text-sm md:font-semibold font-medium md:p-2.5 p-1 small-btn-border-radius cursor placeholder:text-gray-400 w-full focus:ring-primary focus:border-primary  md:h-[320px] h-[270px]"
                      {...register("description")}
                      // maxlength="80"
                    />

                    {errors.description && (
                      <FailureAlert error={errors.description?.message} />
                    )}
                  </div>
                  <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                    <label className="gig-label">Category</label>
                    <ul class="w-full overflow-hidden lg:p-1 md:p-0.10 p-0.8 small-btn-border-radius text-sm font-medium  text-gray-900 bg-white border-1 border-black flex flex-wrap">
                      {lawyerCategories.map((category) => (
                        <li
                          class="border-b border-gray-400 md:w-2/4 w-full"
                          key={category.id}
                        >
                          <div class="flex items-center lg:p-1 md:p-0.10 p-0.8 gap ">
                            <input
                              id={category.name}
                              type="checkbox"
                              name={category.name}
                              value={category.name}
                              {...register("category")}
                              className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                            />
                            <label
                              htmlFor={category.name}
                              className="caplitalize inline-flex lg:text-lg md:text-base text-sm md:font-bold font-semibold text-gray-900 dark:text-gray-300"
                            >
                              {category.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {errors.category && (
                      <FailureAlert error={errors.category.message} />
                    )}
                  </div>
                  <div className="flex items-end justify-end">
                    {/* <BlackBtn text="save and continue" /> */}
                    <button type="submit" className="gig-btn">
                      {isLoading ? <Loader /> : "save and continue"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGigStep1;
