import React, { useEffect, useState } from "react";
import InputComp from "../../components/InputComp";
import BlackBtn from "../../components/BlackBtn";

import toast from "react-hot-toast";
import {
  useCreateLawyerMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useSignupMutation,
} from "../../redux/api/userApi";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../../redux/reducer/userReducer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import YupPassword from "yup-password";
import FailureAlert from "../../components/alert";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import CustomModal from "../../components/model";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
YupPassword(yup);

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .password()
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const [passwordShown, setPasswordShown] = useState(true);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams();
  const [resetPassword, { isError, isLoading, error }] =
    useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message);
    }
  }, [isError]);

  const resetpassword = async (data) => {
    const response = await resetPassword({ token:token.toString(),data });
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      reset();
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  return (
    <>
      <div className="page-container item-center">
        <div className="relative container h-auto flex-col item-center max-w-screen-sm  m-auto gap-2 md:p-0 p-4">
          <div className="bg-white shadow-2xl w-full z-10 p-2 rounded-lg ">
            <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
              <div className="w-full">
                <h1 className="lg:text-3xl md:text-2l text-lg text-center font-black capitalize text-black">
                  reset password
                </h1>
              </div>
              <form className="w-full" onSubmit={handleSubmit(resetpassword)}>
                <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
                  <div className="alert-gap">
                    <div className="relative">
                      <InputComp
                        type={passwordShown ? "password" : "text"}
                        text={"password"}
                        name={"password"}
                        register={register}
                      />
                      <div
                        className="absolute top-0 right-0 h-full mr-3 item-center text-xl md:cursor-pointer cursor-none"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordShown ? <IoMdEye /> : <IoIosEyeOff />}
                      </div>
                    </div>

                    {errors?.password?.message && (
                      <FailureAlert error={errors?.password?.message} />
                    )}
                  </div>
                  <div className="alert-gap">
                    <div className="relative">
                      <InputComp
                        type={confirmPasswordShown ? "password" : "text"}
                        text={"confirm password"}
                        name={"confirmPassword"}
                        register={register}
                      />
                      <div
                        className="absolute top-0 right-0 h-full mr-3 item-center text-xl md:cursor-pointer cursor-none"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {confirmPasswordShown ? <IoMdEye /> : <IoIosEyeOff />}
                      </div>
                    </div>

                    {errors?.confirmPassword && (
                      <FailureAlert error={errors?.confirmPassword?.message} />
                    )}
                  </div>

                  <BlackBtn text={"reset password"} loading={isLoading} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
