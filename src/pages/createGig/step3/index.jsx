import React, { useState } from "react";
import Stepper from "../../../components/Stepper";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import BlackBtn from "../../../components/BlackBtn";

import PageHeading from "../../../components/pageHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Images } from "../../../assets/images";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useGigstepThreeMutation } from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import FailureAlert from "../../../components/alert";
const imageSchema = yup.object().shape({
  image: yup
    .array()
    .min(1, "Upload at least one image")
    .max(3, "Upload at most 3 images")
    .required("Image is required"),
});

const GigStepThree = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(imageSchema),
  });

  const [images, setImages] = useState([]);

  const [gigstepThree, { error, isError, isLoading }] =
    useGigstepThreeMutation();

  // const handleImageUpload = (e, index) => {
  //   const files = Array.from(e.target.files);

  //   // setImages([]);
  //   if (files.length + images.length <= 3) {
  //     files.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         if (reader.readyState === 2) {
  //           setImages((old) => [...old, reader.result]);

  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   } else {
  //     toast.error("you upload up to 3 images");
  //   }
  // };

  const handleImageUpload = (e, index) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length <= 3) {
      const uploadedImages = [];
      const filePromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            uploadedImages.push(reader.result);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then(() => {
        setImages((oldImages) => [...oldImages, ...uploadedImages]);
        setValue("image", [...images, ...uploadedImages]);
      });
    } else {
      toast.error("You can upload up to 3 images");
    }
  };

  // const handleDeleteImage = (index) => {
  //   const updatedImages = [...images];
  //   updatedImages.splice(index, 1);
  //   setImages(updatedImages);
  // };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setValue("image", updatedImages); // Update form field value
  };

  // const updateImageHandler = (e, index) => {
  //   const files = Array.from(e.target.files);

  //   if (files.length === 1) {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         const updatedImages = [...images];
  //         updatedImages[index] = reader.result;
  //         setImages(updatedImages);
  //       }
  //     };

  //     reader.readAsDataURL(files[0]);
  //   }
  // };

  const updateImageHandler = (e, index) => {
    const files = Array.from(e.target.files);

    if (files.length === 1) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const updatedImages = [...images];
          updatedImages[index] = reader.result;
          setImages(updatedImages);
          setValue("image", updatedImages); // Update form field value
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <div className="bg-white md:shadow-lg shadow-md lg:p-4xl md:p-3xl p-3xl">
            <Stepper step={2} />
          </div>
          <PageHeading text="gallery" />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm h-full">
              <h3 className="lg:text-2xl md:text-xl text-lg capitalize font-extrabold ">
                your services gallery
              </h3>
              <div
                className={
                  images.length < 3
                    ? "max-w-[500px] m-auto w-full general-pad md:shadow-lg shadow-md "
                    : "hidden"
                }
              >
                <label
                  htmlFor="gallery-images"
                  className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  overflow-hidden relative small-btn-border-radius lg:p-2 md:p-1 p-0.10"
                >
                  <img
                    src={Images.upload}
                    className="lg:w-[100px] md:w-[80px] w-[60px] "
                    alt="brand_logo"
                  />
                  <p className="lg:text-lg md:text-base text-sm text-center capitalize md:font-extrabold font-bold">
                    upload your services in a gallery or{" "}
                    <span className="md:font-black">browse</span>
                  </p>
                  <input
                    id="gallery-images"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    {...register("image")}
                    onChange={(e) => handleImageUpload(e, 0)}
                  />
                </label>
              </div>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 lg:gap-1 md:gap-0.10 gap-0.8 h-full ">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative shadow-xl overflow-hidden general-pad small-btn-border-radius w-full block lg:h-[230px] md:h-[200px] h-[170px] cursor-pointer card-img"
                  >
                    <div className="absolute bottom-0 md:left-0 z-10 right-0 md:w-full h-full md:flex md:items-center md:justify-center flex  items-end  justify-end general-pad transition-all duration-500 ease-linear  md:translate-y-[100%] ed-btn">
                      <div className="lg:gap-0.10 md:gap-0.10 gap-sm flex ">
                        <label
                          htmlFor={`edit-image-${index}`}
                          className="md:w-[40px] md:h-[40px] md:rounded-full text-2xl item-center  md:bg-white cursor-pointer"
                        >
                          <CiEdit />
                          <input
                            id={`edit-image-${index}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => updateImageHandler(e, index)}
                          />
                        </label>
                        <span
                          className="md:w-[40px] md:h-[40px] md:rounded-full text-2xl item-center md:bg-white text-red-500"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <MdDelete />
                        </span>
                      </div>
                    </div>
                    <img src={image} alt="brand_logo" />
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-end">
                <button type="submit" className="gig-btn">
                  save and continue
                </button>
              </div>
            </div>
          </form>
          {errors.image && <FailureAlert error={errors.image.message} />}
        </div>
      </div>
    </div>
  );
};

export default GigStepThree;
