import React, { useEffect, useState } from "react";
import { Images } from "../../assets/images";
import { useUpdateProfilePictureMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/userReducer";

const ImageUploader = ({ avatar }) => {
  const [profile, setProfileImage] = useState(avatar);
  const dispatch = useDispatch();
  const [updateProfilePicture, { isError }] = useUpdateProfilePictureMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to update profile picture");
    }
  }, [isError]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        const toastId = toast.loading("uploading...");
        updateProfilePicture({ avatar: e.target.result })
          .then((response) => {
            console.log(response);
            if (response.data.success) {
              dispatch(userExist(response.data?.user));
              toast.success("Image uploaded", {
                id: toastId,
              });
            }
          })
          .catch((error) => {
            toast.error("Failed to update profile picture");
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="lg:w-img md:w-md-img w-sm-img lg:h-img-height md:h-md-img-height h-sm-img-height ">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center h-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden shadow-2xl relative"
      >
        <img src={profile} alt="profile" />
        <div className="absolute bg-primary/30 item-center w-full h-full opacity-0 transition-opacity duration-300 hover:opacity-100 backdrop-blur-sm">
          <img src={Images.UploadLogo} alt="upload" className="w-16 h-16" />
        </div>

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
