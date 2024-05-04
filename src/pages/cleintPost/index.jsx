import React, { useEffect, useState } from "react";
import PageHeading from "../../components/pageHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ProfileInputComp from "../../components/ProfileInputComp";
import { cites, lawyerCategories } from "../../data";
import { classNames } from "primereact/utils";
import { Chips } from "primereact/chips";
import FailureAlert from "../../components/alert";
import { useCreateJobMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";

const createPostSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  budget: yup.number().required("Budget is required"),
  category: yup.string().required("Category is required"),
  experience: yup.string().required("Experience is required"),
  location: yup.string().required("Location Preference is required"),
  majorIssues: yup.array().min(1, "Major Issues is required"),
});

const CreateClientPost = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createPostSchema),
  });

  const [createJob, { isLoading, isError, error }] = useCreateJobMutation();
  useEffect(() => {
    if (isError) {
      toast.error("Failed to create job");
    }
  }, []);
  const [issues, setIssues] = useState([]);
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
    console.log(data);
    const response = await createJob(data);
    if (response?.data?.success) {
      toast.success("Job created successfully");
      reset();
      setIssues([]);
      navigate("/jobs")
    }
  };
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <PageHeading text="Add job" />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
              <div className="f-col gap">
                <ProfileInputComp
                  lable="Title"
                  placeholder="title"
                  type="text"
                  register={register}
                  name="title"
                />
                {errors.title && <FailureAlert error={errors.title.message} />}
              </div>
              <div className="f-col gap">
                <label htmlFor={"description"} class="input-lable">
                  {"description"}
                </label>

                <textarea
                  name="description"
                  placeholder="description"
                  id="description"
                  className="border border-primary resize-none text-gray-900  block xl:text-lg lg:base text-sm md:font-semibold font-medium md:p-2.5 p-1 small-btn-border-radius cursor placeholder:text-gray-400 w-full focus:ring-primary focus:border-primary md:h-[320px] h-[270px]"
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
                  type="number"
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
                  <option value={""}>select category...</option>
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
              <div>
                <button type="submit" className="gig-btn">
                  {isLoading ? (
                    <>
                      <div className="flex items-center justify-center">
                        <Loader />
                      </div>
                    </>
                  ) : (
                    "create job"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientPost;
