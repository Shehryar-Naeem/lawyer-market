import React, { useEffect, useState } from "react";
import InputComp from "../../components/InputComp";
import BlackBtn from "../../components/BlackBtn";

import toast from "react-hot-toast";
import {
  useCreateLawyerMutation,
  useForgotPasswordMutation,
  useLoginMutation,
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
import { Link, useNavigate } from "react-router-dom";
YupPassword(yup);

const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

const ForgotPassword = () => {
  const [forgotPassword, { isError, isLoading, error }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message);
    }
  }, [isError]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const forgetPassword = async (data) => {
    const response = await forgotPassword(data);

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      reset();
    }
  };

  return (
    <>
      <div className="page-container item-center">
        <div className="relative container h-auto flex-col item-center max-w-screen-sm  m-auto gap-2 md:p-0 p-4">
          <div className="bg-white shadow-2xl w-full z-10 p-2 rounded-lg ">
            <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
              <div className="w-full">
                <h1 className="lg:text-3xl md:text-2l text-lg text-center font-black capitalize text-black">
                  fortgot password
                </h1>
              </div>
              <form className="w-full" onSubmit={handleSubmit(forgetPassword)}>
                <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
                  <div className="alert-gap">
                    <InputComp
                      type="email"
                      name={"email"}
                      text={"email"}
                      register={register}
                    />
                    {errors?.email && (
                      <FailureAlert error={errors?.email?.message} />
                    )}
                  </div>

                  <BlackBtn text={"send mail"} loading={isLoading} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
