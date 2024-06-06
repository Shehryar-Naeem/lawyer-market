import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useAddRoleMutation,
  useGetuserDetailByAdminQuery,
  useRemoveRoleMutation,
  useUpdateProfileByAdminMutation,
} from "../../../redux/api/userApi";
import PageHeading from "../../../components/pageHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ImageUploader from "../../../components/imageUploader";
import { Images } from "../../../assets/images";
import ProfileInputComp from "../../../components/ProfileInputComp";
import toast from "react-hot-toast";
import { cites } from "../../../data";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "../../../components/loadingSpinner";
import FailureAlert from "../../../components/alert";
import Loader from "../../../components/loader";
import AdminImageUploader from "../../../components/adminImageUploader";

const useSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  city: yup.string().required("City is required"),
  gender: yup.string().required("Gender is required"),
  postalCode: yup
    .number()
    .typeError("Postal code must be a number")
    .required("Postal code is required")
    .positive("Postal code must be a positive number")
    .moreThan(1, "Postal code must be greater than one"),
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(/^[^-]/, "CNIC must not start with a '-' sign"),
});

const roleSchema = yup.object().shape({
  role: yup.string().required("Roles is required"),
});
const UserDetailByAdmin = () => {
  const { id } = useParams();
  const deleteRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(useSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      gender: "",
      postalCode: "",
      cnic: "",
    },
  });

  const {
    register: roleRegister,
    handleSubmit: roleHandleSubmit,
    formState: { errors: roleErrors },

    reset,
  } = useForm({
    resolver: yupResolver(roleSchema),
  });

  const { data, isFetching, isError, error, refetch } =
    useGetuserDetailByAdminQuery(id);
  const [
    updateUser,
    { isError: isUpdateError, error: updateError, isLoading },
  ] = useUpdateProfileByAdminMutation();

  const [
    addRole,
    { isError: isAddRoleError, error: addRoleError, isLoading: addRoleLoading },
  ] = useAddRoleMutation();
  const [
    removeRole,
    {
      isError: isRemoveRoleError,
      error: removeRoleError,
      isLoading: removeRoleLoading,
    },
  ] = useRemoveRoleMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (data?.success) {
      setValue("name", data?.user?.name);
      setValue("email", data?.user?.email);

      setValue("city", data?.user?.city);
      setValue("postalCode", data?.user?.postalCode);
      setValue("cnic", data?.user?.cnic);
      setValue("gender", data?.user?.gender);
    }
    if (isUpdateError) {
      toast.error(updateError.data.message);
    }

    if (isAddRoleError) {
      toast.error(addRoleError.data.message);
    }
    if (removeRoleLoading && !deleteRef.current) {
      deleteRef.current = toast.loading("Deleting...");
    }
    // if(addRoleLoading){
    //   toast.loading("Assigning Role...");
    // }
  }, [
    isError,
    error,
    data,
    isUpdateError,
    updateError,

    isAddRoleError,
    addRoleError,
    removeRoleLoading,
    addRoleLoading,
  ]);

  useEffect(() => {
    if (!removeRoleLoading && deleteRef.current) {
      toast.dismiss(deleteRef.current);
      deleteRef.current = null;
    }
  }, [removeRoleLoading]);

  useEffect(() => {
    if (isRemoveRoleError) {
      toast.error(removeRoleError.data.message);
    }
  }, [isRemoveRoleError, removeRoleError]);

  // console.log(data);
  const profileHandler = async (data) => {
    const response = await updateUser({ id, data });

    if (response?.data?.success) {
      toast.success("Profile Updated Successfully");
    }
  };

  const deleteHandler = async (role) => {
    const data = {
      role: role,
    };
    const response = await removeRole({ id, data });
    console.log(response);
    if (response?.data?.success) {
      toast.success("Role Deleted Successfully");
      refetch();
    }
  };
  const roleHandler = async (data) => {
    alert("alert");

    const response = await addRole({ id, data });
    if (response?.data?.success) {
      toast.success("Role Assigned Successfully");
    }
    reset();
  };

  return (
    <div className="f-col md:gap-3 gap-2">
      <div>
        <PageHeading text={"user Profile"} />
      </div>
      <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
        {isFetching ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <div className="flex flex-col md:gap-2 gap-1">
              <div className="item-center">
                <AdminImageUploader avatar={data?.user?.avatar.url} id={id} />
              </div>

              <div className="flex md:flex-row flex-col gap items-start justify-center">
                <form
                  className="lg:w-[60%] w-full border border-gray-400 md:rounded-md rounded-sm general-pad f-col gap"
                  onSubmit={handleSubmit(profileHandler)}
                >
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="Name"
                      placeholder="Enter name"
                      type="text"
                      name={"name"}
                      register={register}
                    />
                    {errors.name && (
                      <FailureAlert error={errors.name.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="Email"
                      placeholder="Enter email"
                      type="email"
                      name={"email"}
                      register={register}
                    />
                    {errors.email && (
                      <FailureAlert error={errors.email.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="CNIC"
                      placeholder="Enter cnic"
                      type="text"
                      name={"cnic"}
                      register={register}
                    />
                    {errors.cnic && (
                      <FailureAlert error={errors.cnic.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <label htmlFor={"gender"} class="input-lable">
                      gender
                    </label>
                    <select
                      id="gender"
                      {...register("gender")}
                      className="border border-primary text-primary placeholder-gray-400  lg:text-lg md:text-base text-sm font-normal small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                    >
                      <option value="">select gender</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>

                    {errors.gender && (
                      <FailureAlert error={errors.gender.message} />
                    )}
                  </div>
                  <div className="f-col gap">
                    <label htmlFor={"gender"} class="input-lable">
                      city
                    </label>
                    <select
                      className="border border-primary text-primary placeholder-gray-400  lg:text-lg md:text-base text-sm font-normal small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                      name="city"
                      {...register("city")}
                    >
                      <option value={""}>select city...</option>
                      {cites.map((city, index) => (
                        <option key={index} value={city.toLowerCase()}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <FailureAlert error={errors.city.message} />
                    )}
                  </div>

                  <div className="f-col gap">
                    <ProfileInputComp
                      lable="Postal Code"
                      placeholder="Enter postal code"
                      type="text"
                      name={"postalCode"}
                      register={register}
                    />
                    {errors.postalCode && (
                      <FailureAlert error={errors.postalCode.message} />
                    )}
                  </div>
                  <button className="gig-btn item-center" type="submit">
                    {isLoading ? <Loader /> : "Update Profile"}
                  </button>
                </form>
                <div className="lg:w-[40%] w-full border border-gray-400 md:rounded-md rounded-sm general-pad">
                  <div className="f-col gap">
                    <div className="f-col gap">
                      {data?.user?.roles?.map((role, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center md:pb-0.5 pb-[3px] border-b border-gray-400"
                        >
                          <div className="flex items-center gap">
                            <div>
                              {role?.roleType === "client" ? (
                                <img
                                  alt="logo"
                                  src={Images.client}
                                  className="lg:min-w-icon-width md:min-w-md-icon-width min-w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
                                />
                              ) : role?.roleType === "lawyer" ? (
                                <img
                                  alt="logo"
                                  src={Images.lawyer}
                                  className="lg:min-w-icon-width md:min-w-md-icon-width min-w-sm-icon-width lg:h-icon-height md:h-md-icon-height h-sm-icon-height"
                                />
                              ) : role?.roleType === "admin" ? (
                                <span className="pi pi-user-edit lg:text-[30px] md:text-[25px] text-[20px]" />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="f-col gap-0.5 items-start">
                              <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold ">
                                {role?.roleType}
                              </p>
                              <p className="lg:text-base md:text-sm text-xs leading-none capitalize md:font-bold font-semibold text-wrap break-all">
                                {role?._id}
                              </p>
                            </div>
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() => deleteHandler(role?.roleType)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      ))}
                    </div>
                    <form
                      className="f-col gap"
                      onSubmit={roleHandleSubmit(roleHandler)}
                    >
                      <div className="f-col gap">
                        <label htmlFor={"role"} class="input-lable">
                          Assign New Role
                        </label>
                        <select
                          id="role"
                          {...roleRegister("role")}
                          className="border border-primary text-primary placeholder-gray-400  lg:text-lg md:text-base text-sm font-normal small-btn-border-radius focus:ring-primary focus:border-primary block w-full lg:p-2.5 md:p-1 p-0.8"
                        >
                          <option value="">--role--</option>
                          <option value="client">client</option>
                          <option value="lawyer">lawyer</option>
                          <option value="admin">admin</option>
                        </select>
                        {roleErrors?.role && (
                          <FailureAlert error={roleErrors.role.message} />
                        )}
                      </div>
                      <button className="gig-btn item-center" type="submit">
                        {addRoleLoading ? <Loader /> : "Assign Role"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailByAdmin;
