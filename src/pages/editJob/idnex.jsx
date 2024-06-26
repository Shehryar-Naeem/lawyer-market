import React, { useEffect, useState } from "react";
import PageHeading from "../../components/pageHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner";
import { classNames } from "primereact/utils";
import Loader from "../../components/loader";
import FailureAlert from "../../components/alert";
import { cites, lawyerCategories } from "../../data";
import ProfileInputComp from "../../components/ProfileInputComp";
import { Chips } from "primereact/chips";

const createPostSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  budget: yup
  .number()
  .typeError("price must be a number")
  .required("budget is required")
  .positive("please enter the valid number")
  .moreThan(0, "budget must be positive"),
  category: yup.string().required("Category is required"),
  experience: yup.string().required("Experience is required"),
  location: yup.string().required("Location preference is required"),
  majorIssues: yup.array().min(1, "Major issues are required"),
});
const EditJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      category: "",
      experience: "",
      location: "",
      majorIssues: [],
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching, isError, error } = useGetJobByIdQuery(id);
  const [
    updateJob,
    { isLoading, isError: isupdateJobError, error: updateJobError },
  ] = useUpdateJobMutation();

  const [issues, setIssues] = useState([]);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isupdateJobError) {
      toast.error(updateJobError.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setValue("title", data?.data?.title);
      setValue("description", data?.data?.description);
      setValue("budget", data?.data?.budget);
      setValue("category", data?.data?.category);
      setValue("experience", data?.data?.experience);
      setValue("location", data?.data?.location);
      setValue("majorIssues", data?.data?.majorIssues);
      setIssues(data?.data?.majorIssues);
    }
  }, [data]);
  const chipsTheme = {
    root: ({ props }) => ({
      className: classNames("flex", {
        "opacity-60 select-none pointer-events-none cursor-default active:outline-0 outline-0":
          props.disabled,
      }),
    }),
    container: {
      className: classNames(
        "md:p-0.8 p-lg m-0  gap list-none cursor-text overflow-hidden focus:border-2 flex items-center flex-wrap",
        "w-full",
        "font-sans text-base text-gray-600 bg-white border border-black  transition-colors duration-200 appearance-none small-btn-border-radius",
        "hover:border-black hover:border-2 focus:outline-0"
      ),
    },
    inputToken: {
      className: classNames(
        "focus:outline-0 active:outline-0 outline-0 flex gap flex-1 inline-flex"
      ),
    },
    input: {
      className: classNames(
        "text-base text-gray-700 w-full p-0 border-none ring-0  ",
        ""
      ),
    },
    token: {
      className: classNames(
        "md:p-0.5 p-lg md:mr-lg mr-md  bg-gray-300 dark:bg-gray-700 text-gray-700 md:text-base text-sm small-btn-border-radius",
        "inline-flex items-center cursor-pointer "
      ),
    },
    removeTokenIcon: "ml-0.8 ",
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setIssues(newValue);
    setValue("majorIssues", newValue);
  };
  const submitHandler = async (data) => {
    const response = await updateJob({
      id,
      data,
    });
    console.log(response);
    if (response?.data?.success) {
      toast.success("Job created successfully");
      reset();
      setIssues([]);
      navigate("/client-profile");
    }
  };
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <PageHeading text="Update job" />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
              {isFetching ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="Title"
                      placeholder="title"
                      type="text"
                      register={register}
                      name="title"
                    />
                    {errors.title && (
                      <FailureAlert error={errors.title.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <label htmlFor={"description"} class="input-lable">
                      {"description"}
                    </label>

                    <textarea
                      name="description"
                      placeholder="description"
                      id="description"
                      className="textarea-field"
                      {...register("description")}
                      // maxlength="80"
                    />
                    {errors.description && (
                      <FailureAlert error={errors.description.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <label htmlFor={"category"} class="input-lable">
                      {"category"}
                    </label>
                    <select
                      className="border border-primary text-primary placeholder-gray-400   md:text-lg text-sm small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                      {...register("category")}
                      name="category"
                    >
                      <option value={""}>select category...</option>
                      {lawyerCategories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="Budget"
                      placeholder="budget"
                      type="number"
                      register={register}
                      name="budget"
                    />
                    {errors.budget && (
                      <FailureAlert error={errors.budget.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="experience"
                      placeholder="experience"
                      type="text"
                      register={register}
                      name="experience"
                    />
                    {errors.experience && (
                      <FailureAlert error={errors.experience.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <label htmlFor={"location"} class="input-lable">
                      {"location"}
                    </label>

                    <select
                      className="border border-primary text-primary placeholder-gray-400   md:text-lg text-sm small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                      {...register("location")}
                      name="location"
                    >
                      <option value={""}>select city...</option>
                      {cites.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.location && (
                      <FailureAlert error={errors.location.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <label htmlFor={"majorIssues"} class="input-lable">
                      {"majorIssues"}
                    </label>
                    <Chips
                      value={issues}
                      onChange={handleChange}
                      name="majorIssues"
                      placeholder={"Enter the major issues..."}
                      variant="outlined"
                      max={6}
                      unstyled={true}
                      pt={chipsTheme}
                    />
                    {errors.majorIssues && (
                      <FailureAlert error={errors.majorIssues.message} />
                    )}
                  </div>
                  <div className="flex justify-end w-full">
                    <button type="submit" className="gig-btn">
                      {isLoading ? (
                        <>
                          <div className="flex items-center justify-center">
                            <Loader />
                          </div>
                        </>
                      ) : (
                        "update job"
                      )}
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

export default EditJob;
