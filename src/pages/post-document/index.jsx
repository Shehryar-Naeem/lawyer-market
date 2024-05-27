import React, { useEffect } from "react";
import PageHeading from "../../components/pageHeading";
import { useGetJobByIdQuery } from "../../redux/api/userApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import JobSkeleton from "../../components/skeletonLoading/jobLoading";
import Post from "../../components/post";
import { Images } from "../../assets/images";

const PostDocument = () => {
  const { id } = useParams();
  const { data, isError, isFetching, error } = useGetJobByIdQuery(id);
  console.log(data);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred");
    }
  }, [isError, error]);

  return (
    <div className="page-container">
      <div className="container f-col general-pad gap-3">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <PageHeading text={"Post"} />
          <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
            {isFetching ? (
              <JobSkeleton />
            ) : (
              <Post post={data?.data} notShowLink={true} />
            )}
          </div>
        </div>
        <PageHeading text="Documents" />
        <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
          <div
            className={
              "max-w-[500px] m-auto w-full general-pad md:shadow-lg shadow-md "
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
                upload your document or{" "}
                <span className="md:font-black">browse</span>
              </p>
              <input
                id="gallery-images"
                type="file"
                className="hidden"

                // {...register("images")}
                // onChange={(e) => handleImageUpload(e, 0)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDocument;
