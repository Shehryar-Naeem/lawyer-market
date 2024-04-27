import React, { useEffect, useState } from "react";
import Stepper from "../../../components/Stepper";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import BlackBtn from "../../../components/BlackBtn";
import {
  additionalServices,
  lawyerCategories,
  lawyerServices,
} from "../../../data";
import PageHeading from "../../../components/pageHeading";
import { LuPencilLine } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import FailureAlert from "../../../components/alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useGetGigDetailQuery,
  useGigstepTwoMutation,
  useGitstepTwoMutation,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";

const gigStepTwoSchema = yup.object().shape({
  services: yup
    .array()
    .min(3, "Select at least 3 categories")
    .required("Category is required"),
  price: yup.number().required("Price is required"),
});

const EditGigStep2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(gigStepTwoSchema),
    defaultValues: {
      services: [],
      price: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();


  const [gigstepTwo, { isError, error, isLoading }] = useGigstepTwoMutation();
  const {
    data: gigData,
    error: gigError,
    isSuccess: gigIsSuccess,
    isError: isGigError,
    isLoading: gigIsGigLoading,
    isFetching,
    refetch,
  } = useGetGigDetailQuery(location.state.gigId.toString());
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);
  console.log(gigData);
  useEffect(() => {
    if (gigIsSuccess) {
      setValue("services", gigData?.gig?.pricing?.services);
      setValue("price",gigData?.gig?.pricing?.price);
    }
  }, [
    gigIsSuccess,
    setValue,
    gigData?.gig?.pricing?.services,
    gigData?.gig?.pricing?.price,
  ]);

  const submitHandler = async (data) => {
    try {
      const response = await gigstepTwo({
        id: location.state.gigId.toString(),
        data: data,
      });

      if (response && response?.data?.success) {
        navigate("/edit-gig/step3", {
          state: { gigId: response.data.gig?._id },
        });
      }
    } catch (error) {
      console.error("An error occurred while processing gigStepOne:", error);
      // Handle error here
    }
  };
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <div className="bg-white md:shadow-lg shadow-md lg:p-4xl md:p-3xl p-3xl">
            <Stepper step={1} />
          </div>
          <PageHeading text="Services & Pricing" />

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
              <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                <label className="gig-label">services</label>
                <ul class="w-full overflow-hidden lg:p-1 md:p-0.10 p-0.8 small-btn-border-radius text-sm font-medium  text-gray-900 bg-white border-1 border-black flex flex-wrap">
                  {lawyerServices.map((category) => (
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
                          {...register("services")}
                          className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                        />
                        <label
                          htmlFor={category.name}
                          className="caplitalize inline-flex lg:text-lg md:text-base text-sm md:font-bold font-semibold text-gray-900 dark:text-gray-300 cursor"
                        >
                          {category.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                {errors.services && (
                  <FailureAlert error={errors.services.message} />
                )}
              </div>

              <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                <label className="gig-label">price</label>
                <div>
                  <input
                    placeholder="service charges"
                    className="input-gig"
                    type="number"
                    {...register("price")}
                  />
                </div>
                {errors.price && <FailureAlert error={errors.price.message} />}
              </div>

              {/* <div className="flex items-center lg:gap-1 md:gap-0.10 gap-0.8 ">
                <input
                  type="checkbox"
                  checked={isChecked}
                  id="additionalCost"
                  onChange={toggleCheckbox}
                  className="cursor md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                />
                <label htmlFor="additionalCost" className="gig-label cursor">
                  additional cost
                </label>
              </div>
              {isChecked && (
                <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                  <ul class="w-full overflow-hidden lg:p-1 md:p-0.10 p-0.8 small-btn-border-radius text-sm font-medium  text-gray-900 bg-white border-1 border-black flex flex-wrap">
                    {additionalServices.map((category) => (
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
                            className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                          />
                          <label
                            htmlFor={category.name}
                            className="caplitalize inline-flex lg:text-lg md:text-base text-sm md:font-bold font-semibold text-gray-900 dark:text-gray-300 cursor"
                          >
                            {category.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                    <label className="gig-label">price</label>
                    <div>
                      <input
                        placeholder="service charges"
                        className="input-gig"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              )} */}

              <div className="flex items-end justify-end">
                <button type="submit" className="gig-btn">
                  {isLoading ? <Loader /> : "save and continue"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGigStep2;

{
  /* <table className="w-full border-collapse table-fixed ">
              <thead>
                <tr className="">
                  <td
                    className="border-none bg-none lg:w-[200px] md:w-[120px] w-[75px]"
                    // style={{ width: "160px" }}
                  ></td>
                  <td className="t-cell t-head-font">basic</td>
                  <td className="t-cell t-head-font">standard</td>
                  <td className="t-cell t-head-font">premium</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="t-cell-w t-head-font">
                    <p>name</p>
                  </td>
                  <td className="t-cell">
                    <textarea
                      rows={4}
                      placeholder="Give name"
                      className="text-input-gig"
                    />
                    <span className="absolute top-0 right-0 lg:p-4xl md:p-3xl p-xl text-gray-400 lg:text-base md:text-sm text-xs">
                      <LuPencilLine />
                    </span>
                  </td>
                  <td className="t-cell">
                    <textarea
                      rows={4}
                      placeholder="Give name"
                      className="text-input-gig"
                    />
                    <span className="absolute top-0 right-0 lg:p-4xl md:p-3xl p-xl text-gray-400 lg:text-base md:text-sm text-xs">
                      <LuPencilLine />
                    </span>
                  </td>
                  <td className="t-cell">
                    <textarea
                      rows={4}
                      placeholder="Give name"
                      className="text-input-gig"
                    />
                    <span className="absolute top-0 right-0 lg:p-4xl md:p-3xl p-xl text-gray-400 lg:text-base md:text-sm text-xs">
                      <LuPencilLine />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font">
                    <p>description</p>
                  </td>
                  <td className="t-cell">
                    {" "}
                    <textarea
                      rows={6}
                      placeholder="Give description"
                      className="text-input-gig"
                    />
                    <span className="absolute top-0 right-0 lg:p-4xl md:p-3xl p-xl text-gray-400 lg:text-base md:text-sm text-xs">
                      <LuPencilLine />
                    </span>
                  </td>
                  <td className="t-cell">
                    {" "}
                    <textarea
                      rows={6}
                      placeholder="Give description"
                      className="text-input-gig"
                    />
                    <span className="absolute top-0 right-0 lg:p-4xl md:p-3xl p-xl  text-gray-400 lg:text-base md:text-sm text-xs">
                      <LuPencilLine />
                    </span>
                  </td>
                  <td className="t-cell">
                    {" "}
                    <textarea
                      rows={6}
                      placeholder="Give description"
                      className="text-input-gig"
                    />
                    <span className="absolute top-0 right-0 lg:p-4xl md:p-3xl p-xl text-gray-400 lg:text-base md:text-sm text-xs text-base">
                      <LuPencilLine />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-center" colSpan={4}>
                    <p>services</p>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Initial consultation</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Conducting legal research</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Giving legal advice</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Regulatory compliance</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Legal documentation</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Commercial Agreement Drafting</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Negotiating settlements</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Dispute resolution</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Drafting legal documents</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Legal & Financial Management</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Civil Claims Management</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Notary Services</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Ethics & Misconduct Review</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Criminal Motion Management</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Licensing Negotiation</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font text-start">
                    <p>Child Guardian in Hearing</p>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                  <td className="t-cell-w ">
                    <div className="item-center">
                      <input
                        id={"basicServiceName"}
                        type="checkbox"
                        name={"basicServiceName"}
                        // value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font ">
                    <p>service charges</p>
                  </td>
                  <td className="t-cell">
                    <div>
                      <input type="number" className="input-gig" placeholder="give basic service charges"/>
                    </div>
                  </td>
                  <td className="t-cell">
                    <div >
                      <input type="number" className="input-gig" placeholder="give standard service charges"/>
                    </div>
                  </td>
                  <td className="t-cell">
                    <div>
                      <input type="number" className="input-gig" placeholder="give premium service charges"/>
                    </div>
                  </td>  
                </tr>
                <tr>
                  <td className="t-cell-w t-head-font">
                    <p>addiontional cost</p>
                  </td>
                  <td className="t-cell">basic</td>
                  <td className="t-cell">standard</td>
                  <td className="t-cell">premium</td>
                </tr>
              </tbody>
            </table> */
}
