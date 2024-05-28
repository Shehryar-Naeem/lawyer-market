import React, { useEffect, useRef } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import PageHeading from "../../../components/pageHeading";
import { lawyerData } from "../../../data/dummyData";
import { Link, useNavigate } from "react-router-dom";
import { max, min } from "moment/moment";
import {
  useDeletelaywerByAdminMutation,
  useGetAllLawyersByAdminQuery,
  useGetAllUserByAdminQuery,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { siLK } from "@mui/material/locale";
import { Delete, Edit } from "@mui/icons-material";
import { options } from "../../../utils/helper";

const LawyerPage = () => {
  const navigate = useNavigate();

  const loadingToastId = useRef(null);

  const {
    data,
    isLoading: dataLoading,
    error,
    isError,
  } = useGetAllLawyersByAdminQuery(undefined, options);
  const [
    deleteLawyer,
    { isError: isDeletingError, isLoading, error: deletingError },
  ] = useDeletelaywerByAdminMutation();

  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isDeletingError) {
      toast.error(deletingError.data.message);
    }
    if (isLoading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Loading...");
    }
  }, [isError, error, isDeletingError, deletingError, isLoading]);

  useEffect(() => {
    if (!isLoading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isLoading]);

  const handleDelete = async (rowData) => {
    const response = await deleteLawyer(rowData._id);
    if (response?.data?.success) {
      toast.success("Lawyer deleted successfully");
    }
  };

  const columns = [
    {
      header: "_id",
      accessorKey: "_id",
      enableClickToCopy: true,
      size: 400,
    },

    {
      header: "isVerified",
      accessorKey: "isVerified",
      size: 230,
      Cell: ({ renderedCellValue }) => {
        return (
          <span
            className={`${
              renderedCellValue ? "text-green-400" : "text-red-400"
            }`}
          >
            {renderedCellValue ? "Verified" : "Not Verified"}
          </span>
        );
      },
    },
    {
      header: "Law Firm Naem",
      accessorKey: "professionalInfo.lawFirmName",
      size: 300,
    },
    {
      header: "Position Name",
      accessorKey: "professionalInfo.title",
      size: 300,
    },
    {
      header: "license Number",
      accessorKey: "professionalInfo.barAdmission.licenseNumber",
      size: 300,
    },
    {
      header: "Actions",
      accessorKey: "_id",
      size: 130,
      Cell: ({ row }) => {
        return (
          <div className="flex gap">
            <Link
              to={`/dashboard/admin/users/lawyer/${row.original._id}`}
              className="update-btn "
            >
              <Edit />
            </Link>
            <button
              className="delete-btn "
              onClick={() => handleDelete(row.original)}
            >
              <Delete />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: data?.lawyers || [],

    enableColumnResizing: true,

    enableRowNumbers: true,
    renderDetailPanel: ({ row }) => {
      return (
        <div className="f-col md:gap-2 gap-1">
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Bar Membership state</h3>
            <p className="table-dropdown-description">
              {row.original.professionalInfo.barAdmission.state}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">experience</h3>
            <p className="table-dropdown-description">
              {row.original.professionalInfo.experience}
            </p>
          </div>
          <div>
            <h3 className="table-dropdown-heading">Educaton</h3>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Gender</h3>
            <p className="table-dropdown-description">
              {row.original.education.completionYear.startYear}-
              {row.original.education.completionYear.endYear}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">degree Name</h3>
            <p className="table-dropdown-description">
              {row.original.education.degreeName}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">institute name</h3>
            <p className="table-dropdown-description">
              {row.original.education.institution}
            </p>
          </div>
          <h3 className="table-dropdown-heading">availability</h3>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">days</h3>
            <p className="table-dropdown-description">
              {row.original.availability.days.map((day) => (
                <span>{day},</span>
              ))}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">CNIC Picture</h3>
            <img
              src={row.original.cnicPicture.url}
              alt="time slot"
              className="lawyer-pic-admin"
            />
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">CNIC Picture</h3>
            <img
              src={row.original.lawyerIdCard.url}
              alt="time slot"
              className="lawyer-pic-admin"
            />
          </div>
        </div>
      );
    },

    state: {
      isLoading: dataLoading,
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRight: "1px solid #e0e0e0",
        padding: "10px",
        textTransform: "capitalize",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "1rem",
        fontWeight: "bold",
        borderRight: "1px solid #e0e0e0",
        padding: "10px",
      },
    },

    muiCopyButtonProps: {
      sx: {
        // color:"red"
        fontWeight: "initial",
      },
      startIcon: <ContentCopyIcon />,
    },

    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <div className="f-col md:gap-3 gap-2">
      <div>
        <PageHeading text={"Lawyers"} />
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default LawyerPage;
