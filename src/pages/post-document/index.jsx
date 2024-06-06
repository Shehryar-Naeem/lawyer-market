import React, { useEffect } from "react";
import PageHeading from "../../components/pageHeading";
import {
  useDeleteDocumentRelatedToJobMutation,
  useGetAllDocumentsRelatedToJobQuery,
  useGetJobByIdQuery,
  useGetHiringPostQuery,
  useUploadDocumentRelatedToJobMutation,
} from "../../redux/api/userApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import JobSkeleton from "../../components/skeletonLoading/jobLoading";
import Post from "../../components/post";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Images } from "../../assets/images";
import { useSelector } from "react-redux";
import { options } from "../../utils/helper";
import Loader from "../../components/loader";
import Empty from "../../components/empty";

const PostDocument = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  // const { data, isError, isFetching, error } = useGetJobByIdQuery(id);
  const { data, isError, isFetching, error } = useGetHiringPostQuery(id);

  const [
    uploadDocumentRelatedToJob,
    {
      isLoading: isUploading,
      isError: isUploadingError,
      error: uploadingError,
    },
  ] = useUploadDocumentRelatedToJobMutation();

  const {
    data: documents,
    isError: isDocumentError,
    isFetching: isDocumentFetching,
    error: documentError,
  } = useGetAllDocumentsRelatedToJobQuery(id, options);
  const [
    deleteDocumentRelatedToJob,
    { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
  ] = useDeleteDocumentRelatedToJobMutation();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred");
    }
    // if (isUploadingError) {
    //   toast.error(
    //     uploadingError?.data?.message ||
    //       "An error occurred while uploading document"
    //   );
    // }

    if (isDocumentError) {
      toast.error(
        documentError?.data?.message ||
          "An error occurred while fetching documents"
      );
    }
    // if (isDeleteError) {
    //   toast.error(
    //     deleteError?.data?.message ||
    //       "An error occurred while deleting document"
    //   );
    // }
  }, [
    isError,
    error,
    // isUploadingError,
    // uploadingError,
    isDocumentError,
    documentError,
    // isDeleteError,
    // deleteError,
  ]);

  // const fileChangeHandle = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const toastId = toast.loading("uploading...");
  //       uploadDocumentRelatedToJob({
  //         id: id,
  //         document: {
  //           files: e.target.result,
  //         },
  //       })
  //         .unwrap()
  //         .then(
  //           (res) => {
  //             toast.dismiss(toastId);
  //             if (res?.success) {
  //               toast.success("file uploaded");
  //             }
  //           },
  //           (err) => {
  //             toast.dismiss();
  //             toast.error(err.data.message || "An error occurred");
  //           }
  //         );
  //     };
  //     reader.readAsDataURL(file);
  //   }

  //   // const formData = new FormData();
  //   // formData.append("files", file);
  //   // uploadDocumentRelatedToJob({ id: id, document: formData })
  //   //   .unwrap()
  //   //   .then(
  //   //     (res) => {
  //   //       toast.dismiss(toastId);
  //   //       console.log("res", res);
  //   //       if (res?.success) {
  //   //         toast.success("file uploaded");
  //   //       }
  //   //     },
  //   //     (err) => {
  //   //       console.log("err", err);
  //   //       toast.dismiss();
  //   //       toast.error(err.data.message || "An error occurred");
  //   //     }
  //   //   );
  // };


  const fileChangeHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      const toastId = toast.loading("Uploading...");
      uploadDocumentRelatedToJob({ id: id, document: formData })
        .unwrap()
        .then(
          (res) => {
            toast.dismiss(toastId);
            if (res?.success) {
              toast.success("File uploaded");
            }
          },
          (err) => {
            toast.dismiss();
            toast.error(err.data.message || "An error occurred");
          }
        );
    }
  };

  const deleteHandler = (id) => {
    const toastId = toast.loading("deleting...");
    deleteDocumentRelatedToJob(id)
      .unwrap()
      .then(
        (res) => {
          toast.dismiss(toastId);
          if (res?.success) {
            toast.success("file deleted");
          }
        },
        (err) => {
          toast.dismiss();
          toast.error(err.data.message || "An error occurred");
        }
      );
  };

  console.log("documents", documents);

  return (
    <div className="page-container">
      <div className="container f-col general-pad gap-3">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <PageHeading text={"Post"} />
          <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
            {isFetching ? (
              <JobSkeleton />
            ) : (
              <>
                <Post
                  post={data?.job ? data?.job : data?.gig ? data?.gig : ""}
                  notShowLink={true}
                  isDocument={true}
                />
              </>
            )}
          </div>
        </div>
        <PageHeading text="Documents" />
        <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-3 md:gap-2 gap-[18px]">
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
                onChange={fileChangeHandle}
              />
            </label>
          </div>

          <div className="f-col lg:gap-2 md:gap-[18px] gap-1">
            {documents?.data?.length < 1? (
              <>
                <Empty text={"No document upload yet"} />
              </>
            ) : (
              <>
                {documents?.data?.map((document) => (
                  <div
                    className={`bg-gray-200 flex justify-between small-btn-border-radius general-pad max-w-[430px] w-full ${
                      document?.sender === user?._id ? "self-end" : "self-start"
                    }`}
                  >
                    <img
                      src={Images.documentIcon}
                      alt="document"
                      className="lg:w-[60px] md:w-[50px] w-[40px] lg:h-[60px] md:h-[50px] h-[40px] object-cover"
                    />
                    <div className="flex items-end gap ">
                      <a
                        className="small-btn gray-bg"
                        href={document?.file.url}
                        download={true}
                        target="_blank"
                      >
                        downlaod
                      </a>
                      <div
                        className="small-btn red-bg"
                        onClick={() => deleteHandler(document?._id)}
                      >
                        {"delete"}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDocument;
