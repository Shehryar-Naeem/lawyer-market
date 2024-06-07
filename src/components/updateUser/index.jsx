import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FailureAlert from "../alert";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

const UserModel = ({ modal, setModal, name, email, updateUser, isLoading }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      email: email,
    },
  });

  const updateHandler = async (data) => {
    await updateUser(data);
    setModal(false);
  };

  return (
    <div className="item-center backdrop-blur-mdz bg-black-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-999 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full pop-animation ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Update your profile credentials
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setModal(!modal)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit(updateHandler)}>
              <div>
                <label
                  htmlFor="name"
                  className="capitalize block mb-2 md:text-base text-sm md:font-semibold font-normal text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <div className="f-col md:gap-sm gap-xs">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name")}
                    className="bg-gray-50 border  text-gray-900 small-btn-border-radius focus:ring-primary focus:border-primary block md:text-base text-sm md:font-semibold font-normal w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />

                  {errors?.name?.message && (
                    <FailureAlert error={errors?.name?.message} />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="capitalize block mb-2 md:text-base text-sm md:font-semibold font-normal text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <div className="f-col md:gap-sm gap-xs">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email")}
                    className="bg-gray-50 border text-gray-900 md:text-base text-sm md:font-semibold font-medium small-btn-border-radius focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                  {errors?.email?.message && (
                    <FailureAlert error={errors?.email?.message} />
                  )}
                </div>
              </div>

              <input
                type="submit"
                className="capitalize small-btn-border-radius cursor w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium border-gray-300 text-sm px-5 py-2.5 text-center"
                value={isLoading ? "Loading..." : "Update"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModel;
