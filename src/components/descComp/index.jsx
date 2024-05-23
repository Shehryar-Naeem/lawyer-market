import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Loader from "../loader";
const DesComp = ({ compData, show, setshow }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [updateUser, { data, isSuccess, error, isLoading }] =
    useUpdateUserMutation();

  useEffect(() => {
    setDesc(compData);

    if (isSuccess) {
      toast.success(data?.message);
      setshow(false);
      dispatch(userExist(data?.user));
    }
    if (error?.data.message) {
      toast.error(error?.data.message);
    }
  }, [data, isSuccess, dispatch]);
  const update = (e) => {
    e.preventDefault();
    updateUser({ cnic: desc });
  };
  return (
    <form>
      <div className="profile-edit-container">
        <input
          id="message"
          // rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 small-btn-border-radius border border-gray-300 focus:ring-gray-500 focus:border-gray-500 "
          placeholder="enter your CNIC..."
        />
        <div className="flex-column gap-sm">
          <button
            type="button"
            onClick={() => setshow(!show)}
            className="gray-btn "
          >
            cancel
          </button>
          <button
            onClick={update}
            type="button"
            className="item-center blue-btn"
          >
            {isLoading ? <Loader /> : "update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DesComp;
