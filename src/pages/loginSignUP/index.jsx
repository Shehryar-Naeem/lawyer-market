import React, { useEffect, useState } from "react";
import InputComp from "../../components/InputComp";
import BlackBtn from "../../components/BlackBtn";

import toast from "react-hot-toast";
import {
  useCreateLawyerMutation,
  useGetUserQuery,
  useLoginMutation,
  useSignupMutation,
} from "../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../utils/helper";
YupPassword(yup);

const signUpSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
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
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
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
});

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const [
    signup,
    {
      data: signupData,
      isError: signupError,
      isLoading: siginLoading,
      isSuccess: signupSuccess,
      error: signupErrorMsg,
    },
  ] = useSignupMutation();

  const [
    login,
    {
      data: loginData,
      isError: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
      error: loginErrorMsg,
    },
  ] = useLoginMutation();
  const [
    createLawyer,
    {
      data: createLawyerData,
      isError: createLawyerError,
      isLoading: createLawyerLoading,
      isSuccess: createLawyerSuccess,
      error: createLawyerErrorMsg,
    },
  ] = useCreateLawyerMutation();
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUp,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const roles = user && user.roles.map((role) => role.roleType);

  useEffect(() => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      if (roles?.includes("admin")) {
        navigate("/admin/dashboard");
        alert("admin");
      } else if (roles?.includes("lawyer")) {
        alert("lawyer");
        navigate("/lawyer-profile");
      } else if (roles?.includes("client")) {
        alert("client");
        navigate("/client-profile");
      }
    }
  }, []);
  useEffect(() => {
    if (signupError) {
      console.log(signupErrorMsg);
      toast.error(signupErrorMsg?.data?.message);
    }
  }, [signupError, dispatch, signupErrorMsg]);
  useEffect(() => {
    if (loginError) {
      toast.error(loginErrorMsg?.data?.message);
      dispatch(userNotExist());
    }
  }, [loginError, loginErrorMsg, dispatch]);

  useEffect(() => {
    if (createLawyerError) {
      toast.error(createLawyerErrorMsg?.data?.message);
    }
  }, [createLawyerError, createLawyerData]);

  const registerHandler = async (data) => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await signup(user);
      resetSignUp();
      if (response?.data?.success) {
        // dispatch(userExist(signupData?.user));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        toast.success(response?.data?.msg);
        setOpenModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const loginHandler = async (data) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };
      const response = await login(user);
      console.log(response);
      resetLogin();
      if (response?.data?.success) {
        dispatch(userExist(response?.data?.user));
        toast.success(response?.data.msg);
        navigate("/gigs");
        // navigate("/gigs");
        // if (loginData?.redirectUrl === "lawyer") {
        //   toast.success(loginData.msg);
        //   navigate("/lawyer-profile");
        // } else if (loginData?.redirectUrl === "client") {
        //   toast.success(loginData.msg);
        //   navigate("/client-profile");
        // } else if (loginData?.redirectUrl === "admin") {
        //   toast.success(loginData.msg);

        //   navigate("/admin/dashboard");
        // }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const createLaywerHandler = async () => {
    const { data } = await createLawyer();
    if (data?.success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const userData = await fetchUserData();
        if (userData?.success) {
          dispatch(userExist(userData?.user));
          localStorage.removeItem("user");
          toast.success(data?.message);
          navigate("/gigs", {
            replace: true,
          });
        } else {
          toast.error(userData);
        }
      }
    }
  };
  return (
    <>
      <div className="page-container item-center">
        <div className="relative container h-auto flex-col item-center max-w-screen-sm  m-auto gap-2 md:p-0 p-4">
          <div className="bg-white shadow-2xl w-full z-10 p-2 rounded-lg ">
            <Tabs
              className={"w-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8"}
            >
              <TabList className="item-center">
                <Tab className="tab">Rigister</Tab>
                <Tab className="tab">Login</Tab>
              </TabList>
              <div>
                <TabPanel>
                  <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
                    <div className="w-full">
                      <h1 className="lg:text-3xl md:text-2l text-lg text-center font-black capitalize text-black">
                        register User
                      </h1>
                    </div>
                    <form
                      className="w-full"
                      onSubmit={handleSubmitSignUp(registerHandler)}
                    >
                      <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
                        <div className="alert-gap">
                          <InputComp
                            type="text"
                            text={"name"}
                            name={"name"}
                            register={registerSignUp}
                          />
                          {signUpErrors?.name?.message && (
                            <FailureAlert error={signUpErrors?.name?.message} />
                          )}
                        </div>
                        <div className="alert-gap">
                          <InputComp
                            type="email"
                            name={"email"}
                            text={"email"}
                            register={registerSignUp}
                          />
                          {signUpErrors?.email?.message && (
                            <FailureAlert
                              error={signUpErrors?.email?.message}
                            />
                          )}
                        </div>
                        <div className="alert-gap">
                          <div className="relative">
                            <InputComp
                              type={passwordShown ? "password" : "text"}
                              text={"password"}
                              name={"password"}
                              register={registerSignUp}
                            />
                            <div
                              className="absolute top-0 right-0 h-full mr-3 item-center text-xl md:cursor-pointer cursor-none"
                              onClick={togglePasswordVisibility}
                            >
                              {passwordShown ? <IoMdEye /> : <IoIosEyeOff />}
                            </div>
                          </div>

                          {signUpErrors?.password?.message && (
                            <FailureAlert
                              error={signUpErrors?.password?.message}
                            />
                          )}
                        </div>

                        <BlackBtn text={"sign up"} loading={siginLoading} />
                      </div>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
                    <div className="w-full">
                      <h1 className="lg:text-3xl md:text-2l text-lg text-center font-black capitalize text-black">
                        login User
                      </h1>
                    </div>
                    <form
                      className="w-full"
                      onSubmit={handleSubmitLogin(loginHandler)}
                    >
                      <div className="flex flex-col lg:gap-1 md:gap-0.10 gap-0.8">
                        <div className="alert-gap">
                          <InputComp
                            type={"email"}
                            name={"email"}
                            text={"email"}
                            register={registerLogin}
                          />
                          {loginErrors?.email?.message && (
                            <FailureAlert error={loginErrors?.email?.message} />
                          )}
                        </div>

                        <div className="alert-gap">
                          <div className="relative">
                            <InputComp
                              type={passwordShown ? "password" : "text"}
                              text={"password"}
                              name={"password"}
                              register={registerLogin}
                            />
                            <div
                              className="absolute top-0 right-0 h-full mr-3 item-center text-xl md:cursor-pointer cursor-none"
                              onClick={togglePasswordVisibility}
                            >
                              {passwordShown ? <IoMdEye /> : <IoIosEyeOff />}
                            </div>
                          </div>

                          {loginErrors?.password?.message && (
                            <FailureAlert
                              error={loginErrors?.password?.message}
                            />
                          )}
                          <Link
                            to={"/password/forgot"}
                            className="text-right capitalize hover:underline md:text-base text-sm md:font-extrabold font-bold text-gray-600 hover:text-black text-nowrap"
                          >
                            forgot password
                          </Link>
                        </div>

                        <BlackBtn text={"login"} loading={loginLoading} />
                      </div>
                    </form>
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      {openModal && (
        <CustomModal
          title={"create lawyer account"}
          openModal={openModal}
          setOpenModal={setOpenModal}
          createLaywerHandler={createLaywerHandler}
          createLawyerLoading={createLawyerLoading}
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              You want to create a lawyer account?
            </h3>
          </div>
        </CustomModal>
      )}
    </>
  );
};
export default SignUp;
