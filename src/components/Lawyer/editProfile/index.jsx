import React, { useEffect } from "react";
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
const professionalInfoSchema = yup.object().shape({
  firmName: yup.string().required("Firm name is required"),
  positionName: yup.string().required("Position name is required"),
  state: yup.string().required("State is required"),
  licenseNumber: yup.string().required("License number is required"),
  experience: yup.string().required("Experience is required"),
});

const educationSchema = yup.object().shape({
  institutionName: yup.string().required("Institution name is required"),
  completionYear: yup.string().required("Completion year is required"),
});

const EditProfile = () => {
  const {
    data,
    isFetching,
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
  } = useForm({
    resolver: yupResolver(educationSchema),
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
  }, [data]);

  const submitProfessionalInfo = async (data) => {
    try {
      const response = await completeLawyerProfile(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: response.data.message,
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
          {isFetching ? (
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
            <form className="f-col justify-between h-full">
              <div className="grid grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8">
                <ProfileInputComp
                  lable="institution name"
                  placeholder="Enter your institution name"
                  type="text"
                  name={"institutionName"}
                  register={registerEducation}

                />
                <ProfileInputComp
                  lable="completion year"
                  placeholder="Enter your completion year"
                  type="text"
                  name={"completionYear"}
                  register={registerEducation}
                />
              </div>
              <button className="gig-btn">update</button>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="f-col h-full">
            <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
              update your professional info
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap lg:my-1 md:my-0.10 my-0.8 ">
              <ProfileInputComp
                lable="firm name"
                placeholder="Enter your firm name"
                type="text"
              />
              <ProfileInputComp
                lable="position name"
                placeholder="Enter your position name"
                type="text"
              />
              <ProfileInputComp
                lable="state"
                placeholder="Enter the state"
                type="text"
              />
              <ProfileInputComp
                lable="license number"
                placeholder="Enter your license number"
                type="text"
              />
              <ProfileInputComp
                lable="Experience"
                placeholder="Enter your experience"
                type="text"
              />
            </div>
            <button className="gig-btn">update</button>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default EditProfile;
