import React, { useEffect } from "react";
import ProfileInputComp from "../ProfileInputComp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import FailureAlert from "../alert";
import YupPassword from "yup-password";
import Swal from "sweetalert2";
import Loader from "../loader";
YupPassword(yup);
const passwordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .password()
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("Old password is required"),
  newPassword: yup
    .string()
    .password()
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "confirm password must match")
    .required("Confirm password is required"),
});

const PasswordTab = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const [updatePassword, { isLoading, isError, data, error }] =
    useUpdatePasswordMutation();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);
  const submitHandler = async (data) => {
    try {
      const response = await updatePassword(data);
      if (response?.data.success) {
        Swal.fire({
          icon: "success",
          title: "Password updated successfully",
          text: response?.data.message,

          customClass: {
            title: "text-primary font-bold capitalize md:text-2xl text-xl",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            reset();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    // await updatePassword(data)
  };

  return (
    <div className="w-full h-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8 md:border-2 border-1 border-solid border-gray-400 general-pad md:rounded-xs rounded-xxs">
      <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
        update your password
      </h3>
      <form className="f-col h-full gap" onSubmit={handleSubmit(submitHandler)}>
        <div className="f-col gap h-full">
          <div className="f-col gap">
            <ProfileInputComp
              lable="old password"
              placeholder="Enter your old password"
              type="password"
              register={register}
              name="oldPassword"
            />
            {errors.oldPassword && (
              <FailureAlert error={errors.oldPassword.message} />
            )}
          </div>
          <div className="f-col gap">
            <ProfileInputComp
              lable="new password"
              placeholder="Enter your new password"
              type="password"
              register={register}
              name="newPassword"
            />
            {errors.newPassword && (
              <FailureAlert error={errors.newPassword.message} />
            )}
          </div>
          <div className="f-col gap">
            <ProfileInputComp
              lable="confirm password"
              placeholder="Enter your confirm password"
              type="password"
              register={register}
              name="confirmPassword"
            />

            {errors.confirmPassword && (
              <FailureAlert error={errors.confirmPassword.message} />
            )}
          </div>
        </div>
        <button className="gig-btn">
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
  );
};

export default PasswordTab;
