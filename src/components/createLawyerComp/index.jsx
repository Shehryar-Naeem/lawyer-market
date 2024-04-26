import React, { useEffect } from "react";
import { CaptializeFirstLetter, fetchUserData } from "../../utils/helper";
import {
  useCreateLawyerMutation,
  useGetUserQuery,
} from "../../redux/api/userApi";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/userReducer";

const CreateLawyerComp = () => {
  const [createLawyer, { isError, isLoading, isSuccess, error }] =
    useCreateLawyerMutation();
  const { data: userData, refetch } = useGetUserQuery();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error, isSuccess, dispatch]);
  const createLaywerHandler = async () => {
    const { data } = await createLawyer();
    if (data?.success) {
      const userData = await fetchUserData();
      console.log(userData);
      if (userData?.success) {
        dispatch(userExist(userData?.user));
        toast.success(data?.message);
        navigate("/gigs", {
          replace: true,
        });
      } else {
        toast.error(userData);
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="f-col gap">
        <h2 className="lg:text-2xl text-center md:text-xl text-lg lg:font-bold md:font-semibold font-medium">
          {CaptializeFirstLetter(
            "you want to create a create account to provide services"
          )}
        </h2>
        <div className="item-center">
          <button className="gig-btn" onClick={createLaywerHandler}>
            {isLoading ? <Loader /> : "create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLawyerComp;
