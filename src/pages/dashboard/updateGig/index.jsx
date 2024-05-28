import React, { useEffect, useState } from "react";
import PageHeading from "../../../components/pageHeading";
import {
  useGetGigByAdminQuery,
  useGetGigDetailQuery,
  useMangeGigbyAdminMutation,
} from "../../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { lawyerCategories, lawyerServices } from "../../../data";
import { Images } from "../../../assets/images";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Loader from "../../../components/loader";
import LoadingSpinner from "../../../components/loadingSpinner";

const gigSchema = yup.object().shape({
  title: yup
    .string()
    .min(15, "Title must be higher than 15 characters")
    .max(80, "Title must be less than 80 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(40, "Description must be higher than 15 characters")
    .required("Description is required"),
  category: yup
    .array()
    .min(3, "Select at least 3 categories")
    .required("Category is required"),
  services: yup
    .array()
    .min(3, "Select at least 3 categories")
    .required("Category is required"),
  price: yup.number().required("Price is required"),
  images: yup
    .array()
    .min(1, "Upload at least one image")
    .max(3, "Upload at most 3 images")
    .required("Image is required"),
});

const UpdateGigByAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: gigData,
    error: gigError,
    isSuccess: gigIsSuccess,
    isError: isGigError,
    isLoading: gigIsGigLoading,
    isFetching,
  } = useGetGigByAdminQuery(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(gigSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
      services: [],
      price: "",
      images: [],
    },
  });
  const [
    mangeGigbyAdmin,
    {
      error: manageGigError,
      isError: isManageGigError,
      isLoading: manageGigIsLoading,
    },
  ] = useMangeGigbyAdminMutation();

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (gigIsSuccess) {
      setValue("title", gigData?.gig?.title);
      setValue("description", gigData?.gig?.description);
      setValue("category", gigData?.gig?.category);
      setValue("services", gigData?.gig?.pricing?.services);
      setValue("price", gigData?.gig?.pricing?.price);
      const images = gigData?.gig?.images.map((image) => image.url);
      setValue("images", images);
      setImages(images);
    }
  }, [gigIsSuccess, gigData, setValue]);

  useEffect(() => {
    if (isGigError) {
      toast.error(gigError.data.message);
    }
    if (isManageGigError) {
      toast.error(manageGigError.data.message);
    }
  }, [isGigError, gigError, isManageGigError, manageGigError]);

  console.log(manageGigError);

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
        setValue("images", [...images, ...uploadedImages]);
      });
    } else {
      toast.error("You can upload up to 3 images"); 
    }
  };

  const submitHandler = async (data) => {
    const result = await mangeGigbyAdmin({ id, data });
    console.log(result);
    if (result?.data?.success) {
      toast.success("Gig updated successfully");
      navigate("/dashboard/admin/gigs");
    }
  };

  const handleDeleteImage = (index) => {
    alert("Are you sure you want to delete this image?", index);
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setValue("images", updatedImages); // Update form field value
  };

  const updateImageHandler = (e, index) => {
    const files = Array.from(e.target.files);

    if (files.length === 1) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const updatedImages = [...images];
          updatedImages[index] = reader.result;
          setImages(updatedImages);
          setValue("images", updatedImages); // Update form field value
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <div className="f-col md:gap-3 gap-2">
      <div>
        <PageHeading text={"update gig"} />
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
          {isFetching ? (
            <>
              <LoadingSpinner />
            </>
          ) : (
            <>
              {/* title */}
              <div className="flex  lg:gap-2 md:gap-0.8 gap-sm place-items-end">
                <div className="w-full lg:gap-0.10 md:gap-0.8 gap-sm f-col justify-between">
                  <label className="gig-label">Gig Title</label>
                  <div className="relative">
                    {/* <span
                      className="xl:text-xl lg:text-lg md:text-base text-sm  md:font-semibold font-medium absolute md:p-0.8 p-0.5 top-0"
                      // style={{
                      //   transform: `translateY(${errors.title ? "" : ""})`,
                      // }}
                    >
                      I will
                    </span> */}
                    <textarea
                      type="text"
                      name="name"
                      rows={2}
                      maxRows={2}
                      placeholder="be your"
                      id="name"
                      className="text-input lg:h-[80px] md:h-[70px] h-[60px]"
                      {...register("title")}
                      maxlength="80"
                    />
                    {/* {errors.title && <FailureAlert error={errors.title.message} />} */}
                  </div>
                </div>
              </div>
              {/* title */}

              {/* description */}
              <div className="lg:gap-0.10 md:gap-0.8 gap-sm f-col">
                <label className="gig-label">discription</label>
                {/* <Editor
                  name="description"
                  onTextChange={(e) => {
                    // Remove HTML tags from the content
                    const textValue = e.htmlValue.replace(/<[^>]+>/g, "");
                    setValue("description", textValue);
                  }}
                  headerTemplate={header}
                  style={{ height: "320px" }}
                /> */}

                <textarea
                  name="description"
                  placeholder="description"
                  id="description"
                  className="gig-decription"
                  {...register("description")}
                  // maxlength="80"
                />

                {/* {errors.description && (
              <FailureAlert error={errors.description?.message} />
            )} */}
              </div>
              {/* description */}

              {/* category */}
              <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                <label className="gig-label">Category</label>
                <ul class="w-full overflow-hidden lg:p-1 md:p-0.10 p-0.8 small-btn-border-radius text-sm font-medium  text-gray-900 bg-white border-1 border-black flex flex-wrap">
                  {lawyerCategories.map((category) => (
                    <li
                      class="border-b border-gray-400 md:w-2/4 w-full"
                      key={category.id}
                    >
                      <div class="flex items-center lg:p-1 md:p-0.10 p-0.8 gap ">
                        <input
                          id={category.name}
                          type="checkbox"
                          name={category.name}
                          value={category.name}
                          {...register("category")}
                          className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                        />
                        <label
                          htmlFor={category.name}
                          className="caplitalize inline-flex lg:text-lg md:text-base text-sm md:font-medium font-normal text-gray-900 dark:text-gray-300"
                        >
                          {category.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* {errors.category && (
              <FailureAlert error={errors.category.message} />
            )} */}
              </div>
              {/* category */}

              {/* services */}
              <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                <label className="gig-label">services</label>
                <ul class="w-full overflow-hidden lg:p-1 md:p-0.10 p-0.8 small-btn-border-radius text-sm font-medium  text-gray-900 bg-white border-1 border-black flex flex-wrap">
                  {lawyerServices.map((category) => (
                    <li
                      class="border-b border-gray-400 md:w-2/4 w-full"
                      key={category.id}
                    >
                      <div class="flex items-center lg:p-1 md:p-0.10 p-0.8 gap ">
                        <input
                          id={category.name}
                          type="checkbox"
                          name={category.name}
                          value={category.name}
                          {...register("services")}
                          className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                        />
                        <label
                          htmlFor={category.name}
                          className="check-box-label"
                        >
                          {category.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* {errors.services && (
                  <FailureAlert error={errors.services.message} />
                )} */}
              </div>
              {/* services */}

              {/* price */}
              <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
                <label className="gig-label">price</label>
                <div>
                  <input
                    placeholder="service charges"
                    className="input-gig"
                    type="number"
                    {...register("price")}
                  />
                </div>
                {/* {errors.price && <FailureAlert error={errors.price.message} />} */}
              </div>
              {/* price */}

              {/* images */}
              <div
                className={
                  // images?.length < 3
                  true
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
                    {...register("images")}
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
              {/* images */}

              {/* submit */}
              <div className="flex items-end justify-end">
                <button type="submit" className="gig-btn">
                  {manageGigIsLoading ? <Loader /> : "update"}
                </button>
              </div>
              {/* submit */}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateGigByAdmin;
