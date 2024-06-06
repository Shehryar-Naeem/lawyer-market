import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProfileInputComp from "../../../components/ProfileInputComp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useCompleteLawyerProfileMutation,
  useGetLawyerDetailByAdminQuery,
  useLawyerPrfofileQuery,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import FailureAlert from "../../../components/alert";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/loadingSpinner";
import Loader from "../../../components/loader";
import { Chips } from "primereact/chips";
import { classNames } from "primereact/utils";
import { useParams } from "react-router-dom";
import PageHeading from "../../../components/pageHeading";
import { Images } from "../../../assets/images";

const professionalInfoSchema = yup.object().shape({
  firmName: yup.string().required("Firm name is required"),
  positionName: yup.string().required("Position name is required"),
  state: yup.string().required("State is required"),
  licenseNumber: yup
    .number()
    .typeError("license number must be a number")
    .required("license number is required")
    .positive("please enter the valid number")
    .moreThan(0, "license number must be positive"),
  experience: yup
    .number()
    .typeError("experience must be a number")
    .required("experience is required")
    .positive("please enter the valid number")
    .moreThan(0, "experience must be positive"),
});

const educationSchema = yup.object().shape({
  institution: yup.string().required("Institution name is required"),
  startYear: yup
    .number()
    .typeError("Start year must be a number")
    .required("Start year is required")
    .positive("Start year must be a positive number")
    .integer("Start year must be an integer")
    .min(1900, "Start year must be later than 1900")
    .max(new Date().getFullYear(), `Start year cannot be in or after the current year (${new Date().getFullYear()})`),
  endYear: yup
    .number()
    .typeError("End year must be a number")
    .required("End year is required")
    .positive("End year must be a positive number")
    .integer("End year must be an integer")
    .moreThan(yup.ref('startYear'), "End year must be greater than start year"),
  degreeName: yup.string().required("Degree name is required"),
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

const documentSchema = yup.object().shape({
  cnicPicture: yup.string().required("CNIC picture is required"),
  lawyerIdCard: yup.string().required("Lawyer ID card is required"),
});

const UpdateProfile = () => {
  const [value, setValue] = useState([]);
  const { id } = useParams();
  const [cnicPicture, setCnicPicture] = useState("");
  const [lawyerIdCard, setLawyerIdCard] = useState("");
  const {
    data,
    isLoading: isLawyerProfileLoading,
    isError: isLawyerProfileError,
    isSuccess: isLawyerProfileSuccess,
    error: lawyerProfileError,
  } = useGetLawyerDetailByAdminQuery(id);
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
      degreeName: data?.LawyerProfile?.education?.degreeName || "",
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

  const {
    register: registerDocument,
    handleSubmit: handleSubmitDocument,
    formState: { errors: documentErrors },
    setValue: setDocumentValue,
  } = useForm({
    resolver: yupResolver(documentSchema),
    defaultValues: {
      cnicPicture: data?.LawyerProfile?.documents?.cnicPicture || "",
      lawyerIdCard: data?.LawyerProfile?.documents?.lawyerIdCard || "",
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
    setEducationValue(
      "degreeName",
      data?.LawyerProfile?.education?.degreeName || ""
    );
    setAvailabilityValue("days", data?.LawyerProfile?.availability?.days || []);
    setValue(data?.LawyerProfile?.availability?.days || []);
    if (isLawyerProfileSuccess) {
      setDocumentValue(
        "cnicPicture",
        data?.LawyerProfile?.cnicPicture?.url || ""
      );
      setCnicPicture(data?.LawyerProfile?.cnicPicture?.url || "");
      setDocumentValue(
        "lawyerIdCard",
        data?.LawyerProfile?.lawyerIdCard?.url || ""
      );
      setLawyerIdCard(data?.LawyerProfile?.lawyerIdCard?.url || "");
    }
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

  const handleCnicPictureUpload = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setCnicPicture(fileReader.result);
      setDocumentValue("cnicPicture", fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleLawyerIdPictureUpload = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLawyerIdCard(fileReader.result);
      setDocumentValue("lawyerIdCard", fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const submitDocument = async (data) => {
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
    <div className="f-col md:gap-3 gap-2">
      <div>
        <PageHeading text={"lawyer Profile"} />
      </div>
      <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
        <Tabs
          className={
            "w-full h-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8 mt-1"
          }
        >
          <TabList className="item-center">
            <Tab className="sub-tab">Professional Info</Tab>
            <Tab className="sub-tab">Education</Tab>
            <Tab className="sub-tab">Available At</Tab>
            <Tab className="sub-tab">upload doucment</Tab>
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
                              error={
                                professionalInfoErrors.positionName.message
                              }
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
                            type="number"
                            name={"licenseNumber"}
                            register={registerProfessionalInfo}
                          />
                          {professionalInfoErrors.licenseNumber && (
                            <FailureAlert
                              error={
                                professionalInfoErrors.licenseNumber.message
                              }
                            />
                          )}
                        </div>
                        <div className="f-col gap">
                          <ProfileInputComp
                            lable="Experience"
                            placeholder="Enter your experience"
                            type="number"
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
                        <FailureAlert
                          error={educationErrors.institution.message}
                        />
                      )}
                    </div>
                    <div className="f-col gap">
                      <ProfileInputComp
                        lable="degree name"
                        placeholder="Enter your degree name"
                        type="text"
                        name={"degreeName"}
                        register={registerEducation}
                      />
                      {educationErrors.degreeName && (
                        <FailureAlert
                          error={educationErrors.degreeName.message}
                        />
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
                          <FailureAlert
                            error={educationErrors.startYear.message}
                          />
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
                          <FailureAlert
                            error={educationErrors.endYear.message}
                          />
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
                  update your availability
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
                          unstyled={true}
                          pt={chipsTheme}
                        />
                        {availabilityErrors.days && (
                          <FailureAlert
                            error={availabilityErrors.days.message}
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
                  </div>
                </form>
              </div>
            </TabPanel>

            {/* upload document */}
            <TabPanel>
              <div className="f-col gap h-full">
                <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
                  update your documents
                </h3>
                <form
                  className="f-col justify-between h-full "
                  onSubmit={handleSubmitDocument(submitDocument)}
                >
                  <div className="h-full f-col gap">
                    <div className="f-col gap">
                      <label htmlFor={"days"} class="input-lable">
                        add CNIC picture
                      </label>
                      <div className="f-col gap">
                        {/* <div className="profile-input">
                      <input
                        type="file"
                        name="cnicPicture"
                        {...registerDocument("cnicPicture")}
                      />
                    </div> */}
                        <div className="flex md:flex-row gap justify-between items-center">
                          <div className="max-w-[200px] w-full general-pad md:shadow-lg shadow-md ">
                            <label
                              htmlFor="cnic-image"
                              className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  overflow-hidden relative small-btn-border-radius lg:p-2 md:p-1 p-0.10"
                            >
                              <img
                                src={Images.upload}
                                className="lg:w-[70px] md:w-[60px] w-[50px] "
                                alt="brand_logo"
                              />
                              <p className="lg:text-lg md:text-base text-sm text-center capitalize md:font-extrabold font-bold">
                                upload your cnic picture{" "}
                                <span className="md:font-black">browse</span>
                              </p>
                              <input
                                id="cnic-image"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                {...registerDocument("cnicPicture")}
                                // onChange={(e) => handleImageUpload(e, 0)}
                                onChange={handleCnicPictureUpload}
                              />
                            </label>
                          </div>
                          {cnicPicture && (
                            <div className="card-pic">
                              <img
                                src={cnicPicture}
                                alt="cnic"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {documentErrors.cnicPicture && (
                          <FailureAlert
                            // error={availabilityErrors.cnicPicture.message}
                            error={documentErrors.cnicPicture.message}
                          />
                        )}
                      </div>
                    </div>
                    <div className="f-col gap">
                      <label htmlFor={"days"} class="input-lable">
                        add lawyer Id card
                      </label>
                      <div className="f-col gap">
                        {/* <div className="profile-input">
                      <input
                        type="file"
                        name="cnicPicture"
                        {...registerDocument("cnicPicture")}
                      />
                    </div> */}
                        <div className="flex md:flex-row gap justify-between items-center">
                          <div className="max-w-[200px] w-full general-pad md:shadow-lg shadow-md ">
                            <label
                              htmlFor="lawyer-id-card"
                              className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  overflow-hidden relative small-btn-border-radius lg:p-2 md:p-1 p-0.10"
                            >
                              <img
                                src={Images.upload}
                                className="lg:w-[70px] md:w-[60px] w-[50px] "
                                alt="brand_logo"
                              />
                              <p className="lg:text-lg md:text-base text-sm text-center capitalize md:font-extrabold font-bold">
                                upload your lawyer ID card picture{" "}
                                <span className="md:font-black">browse</span>
                              </p>
                              <input
                                id="lawyer-id-card"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                {...registerDocument("cnicPicture")}
                                onChange={handleLawyerIdPictureUpload}
                              />
                            </label>
                          </div>
                          {lawyerIdCard && (
                            <div className="card-pic">
                              <img
                                src={lawyerIdCard}
                                alt="cnic"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {documentErrors.lawyerIdCard && (
                          <FailureAlert
                            error={documentErrors.lawyerIdCard.message}
                          />
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
            {/* upload document */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default UpdateProfile;
