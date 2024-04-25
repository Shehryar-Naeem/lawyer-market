import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { cites } from "../../data";
const City = ({ compData, show, setshow }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState(null);
  const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();
  useEffect(() => {
    setCity(compData);
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
    updateUser({ city: city });
  };
  
  return (
    <div className="profile-edit-container">
      {/* <GooglePlacesAutocomplete 
      apiKey={""}
      selectProps={{
        
          city,
          onChange: setCity,
        }}/> */}
      <select
        className="border border-gray-300 text-gray-400  md:text-base text-sm small-btn-border-radius focus:ring-gray-400 focus:border-gray-400 block w-full md:p-0.8 p-0.5"
        value={city}
        name="city"
        onChange={(e) => setCity(e.target.value)}
      >
        <option value={""}>select city...</option>
        {cites.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="flex-column gap-sm">
        <button
          type="button"
          onClick={() => setshow(!show)}
          className="gray-btn "
        >
          cancel
        </button>
        <button type="button" onClick={update} className="blue-btn">
          update
        </button>
      </div>
    </div>
  );
};

export default City;
