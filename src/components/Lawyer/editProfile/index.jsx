import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProfileInputComp from "../../ProfileInputComp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useCompleteLawyerProfileMutation,
  useLawyerPrfofileQuery,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import FailureAlert from "../../alert";
import Swal from "sweetalert2";
import LoadingSpinner from "../../loadingSpinner";
import Loader from "../../loader";
import { Chips } from "primereact/chips";
import { classNames } from "primereact/utils";


const professionalInfoSchema = yup.object().shape({
  firmName: yup.string().required("Firm name is required"),
  positionName: yup.string().required("Position name is required"),
  state: yup.string().required("State is required"),
  licenseNumber: yup.string().required("License number is required"),
  experience: yup.string().required("Experience is required"),
});

const educationSchema = yup.object().shape({
  institution: yup.string().required("Institution name is required"),
  startYear: yup.number().required("Start year is required"),
  endYear: yup.number().required("end yer is required"),
});

const availabilitySchema = yup.object().shape({
  days: yup
    .array()
    .of(yup.string())
    .required("At least one day is required")
    .min(1, "At least one day is required")
    .test("days", "Invalid weekday", (value) =>
      value.every((day) =>
        [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].includes(day.toLowerCase())
      )
    ),
});

const EditProfile = () => {
  const [value, setValue] = useState([]);
  const {
    data,
    isLoading: isLawyerProfileLoading,
    isError: isLawyerProfileError,
    error: lawyerProfileError,
  } = useLawyerPrfofileQuery();
  const {
    register: registerProfessionalInfo,
    handleSubmit: handleSubmitProfessionalInfo,
    formState: { errors: professionalInfoErrors },
    setValue: setProfessionalInfoValue,
  } = useForm({
    resolver: yupResolver(professionalInfoSchema),
    defaultValues: {
      firmName: data?.LawyerProfile?.professionalInfo?.lawFirmName || "",
      positionName: data?.LawyerProfile?.professionalInfo?.title || "",
      state: data?.LawyerProfile?.professionalInfo?.barAdmission?.state || "",
      licenseNumber:
        data?.LawyerProfile?.professionalInfo?.barAdmission?.licenseNumber ||
        "",
      experience: data?.LawyerProfile?.professionalInfo?.experience || "",
    },
  });

  const {
    register: registerEducation,
    handleSubmit: handleSubmitEducation,
    formState: { errors: educationErrors },
    setValue: setEducationValue,
  } = useForm({
    resolver: yupResolver(educationSchema),
    defaultValues: {
      institution: data?.LawyerProfile?.education?.institution,
      endYear: data?.LawyerProfile?.education?.endYear,
      startYear: data?.LawyerProfile?.education?.startYear,
    },
  });

  const {
    register: registerAvailability,
    handleSubmit: handleSubmitAvailability,
    formState: { errors: availabilityErrors },
    setValue: setAvailabilityValue,
  } = useForm({
    resolver: yupResolver(availabilitySchema),
    defaultValues: {
      days: data?.LawyerProfile?.availability?.days || [],
    },
  });

  const [completeLawyerProfile, { isError, error, isLoading }] =
    useCompleteLawyerProfileMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isLawyerProfileError) {
      toast.error(lawyerProfileError.data.message);
    }
  }, [isError, isLawyerProfileError]);

  useEffect(() => {
    setProfessionalInfoValue(
      "firmName",
      data?.LawyerProfile?.professionalInfo?.lawFirmName || ""
    );
    setProfessionalInfoValue(
      "positionName",
      data?.LawyerProfile?.professionalInfo?.title || ""
    );
    setProfessionalInfoValue(
      "state",
      data?.LawyerProfile?.professionalInfo?.barAdmission?.state || ""
    );
    setProfessionalInfoValue(
      "licenseNumber",
      data?.LawyerProfile?.professionalInfo?.barAdmission?.licenseNumber || ""
    );
    setProfessionalInfoValue(
      "experience",
      data?.LawyerProfile?.professionalInfo?.experience || ""
    );
    setEducationValue(
      "institution",
      data?.LawyerProfile?.education?.institution || ""
    );
    setEducationValue(
      "startYear",
      data?.LawyerProfile?.education?.completionYear?.startYear || ""
    );
    setEducationValue(
      "endYear",
      data?.LawyerProfile?.education?.completionYear?.endYear || ""
    );
    setAvailabilityValue("days", data?.LawyerProfile?.availability?.days || []);
    setValue(data?.LawyerProfile?.availability?.days || []);
  }, [data]);

  const submitProfessionalInfo = async (data) => {
    try {
      const response = await completeLawyerProfile(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitEducation = async (data) => {
    try {
      const response = await completeLawyerProfile(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        "font-sans text-base text-gray-600 bg-white border border-black acti transition-colors duration-200 appearance-none small-btn-border-radius",
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

  const isWeekday = (input) => {
    const weekdays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    return weekdays.includes(input.toLowerCase());
  };

  const handleChange = (e) => {
    const newValue = e.value.filter(isWeekday);
    setValue(newValue);
    setAvailabilityValue("days", newValue);
  };

  const submitAvailability = async (data) => {
    try {
      const response = await completeLawyerProfile(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tabs
      className={
        "w-full h-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8 mt-1"
      }
    >
      <TabList className="item-center">
        <Tab className="sub-tab">Professional Info</Tab>
        <Tab className="sub-tab">Education</Tab>
        <Tab className="sub-tab">Available At</Tab>
      </TabList>
      <div className="md:border-2 border-1 border-solid border-gray-400 general-pad md:rounded-xs rounded-xxs h-full">
        <TabPanel>
          {isLawyerProfileLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="f-col h-full">
                <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
                  update your professional info
                </h3>
                <form
                  className="f-col justify-between h-full"
                  onSubmit={handleSubmitProfessionalInfo(
                    submitProfessionalInfo
                  )}
                >
                  <div className="grid md:grid-cols-2 grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8 ">
                    <div className="f-col gap">
                      <ProfileInputComp
                        lable="firm name"
                        placeholder="Enter your firm name"
                        type="text"
                        name={"firmName"}
                        register={registerProfessionalInfo}
                      />
                      {professionalInfoErrors.firmName && (
                        <FailureAlert
                          error={professionalInfoErrors.firmName.message}
                        />
                      )}
                    </div>
                    <div className="f-col gap">
                      <ProfileInputComp
                        lable="position name"
                        placeholder="Enter your position name"
                        type="text"
                        name={"positionName"}
                        register={registerProfessionalInfo}
                      />
                      {professionalInfoErrors.positionName && (
                        <FailureAlert
                          error={professionalInfoErrors.positionName.message}
                        />
                      )}
                    </div>
                    <div className="f-col gap">
                      <ProfileInputComp
                        lable="state"
                        placeholder="Enter the state"
                        type="text"
                        name={"state"}
                        register={registerProfessionalInfo}
                      />

                      {professionalInfoErrors.state && (
                        <FailureAlert
                          error={professionalInfoErrors.state.message}
                        />
                      )}
                    </div>
                    <div className="f-col gap">
                      <ProfileInputComp
                        lable="license number"
                        placeholder="Enter your license number"
                        type="text"
                        name={"licenseNumber"}
                        register={registerProfessionalInfo}
                      />
                      {professionalInfoErrors.licenseNumber && (
                        <FailureAlert
                          error={professionalInfoErrors.licenseNumber.message}
                        />
                      )}
                    </div>
                    <div className="f-col gap">
                      <ProfileInputComp
                        lable="Experience"
                        placeholder="Enter your experience"
                        type="text"
                        name={"experience"}
                        register={registerProfessionalInfo}
                      />
                      {professionalInfoErrors.experience && (
                        <FailureAlert
                          error={professionalInfoErrors.experience.message}
                        />
                      )}
                    </div>
                  </div>

                  <button type="submit" className="gig-btn">
                    {isLoading ? (
                      <div className="item-center">
                        <Loader />
                      </div>
                    ) : (
                      "update"
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </TabPanel>
        <TabPanel>
          {" "}
          <div className="f-col h-full relative">
            <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
              update your education info
            </h3>
            <form
              className="f-col justify-between h-full"
              onSubmit={handleSubmitEducation(submitEducation)}
            >
              <div className="grid grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8">
                <div className="f-col gap">
                  <ProfileInputComp
                    lable="institution name"
                    placeholder="Enter your institution name"
                    type="text"
                    name={"institution"}
                    register={registerEducation}
                  />
                  {educationErrors.institution && (
                    <FailureAlert error={educationErrors.institution.message} />
                  )}
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap">
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="starting year"
                      placeholder="Enter your starting year"
                      type="number"
                      name={"startYear"}
                      register={registerEducation}
                    />
                    {educationErrors.startYear && (
                      <FailureAlert error={educationErrors.startYear.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="ending year"
                      placeholder="Enter your ending year"
                      type="number"
                      name={"endYear"}
                      register={registerEducation}
                    />
                    {educationErrors.endYear && (
                      <FailureAlert error={educationErrors.endYear.message} />
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="gig-btn">
                {isLoading ? (
                  <div className="item-center">
                    <Loader />
                  </div>
                ) : (
                  "update"
                )}
              </button>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="f-col gap h-full">
            <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
              update your professional info
            </h3>
            <form
              className="f-col justify-between h-full "
              onSubmit={handleSubmitAvailability(submitAvailability)}
            >
              <div className="h-full f-col gap">
                <div className="f-col gap h-full">
                  <label htmlFor={"days"} class="input-lable">
                    Days
                  </label>
                  <div className="f-col gap">
                    <Chips
                      value={value}
                      onChange={handleChange}
                      name="days"
                      keyfilter={/^[a-zA-Z]+$/}
                      placeholder={
                        value.length < 6
                          ? "Enter the days you are available"
                          : ""
                      }
                      variant="outlined"
                      max={6}
                      pt={chipsTheme}
                    />
                    {availabilityErrors.days && (
                      <FailureAlert error={availabilityErrors.days.message} />
                    )}
                  </div>
                </div>
                <button type="submit" className="gig-btn">
                  {isLoading ? (
                    <div className="item-center">
                      <Loader />
                    </div>
                  ) : (
                    "update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default EditProfile;
