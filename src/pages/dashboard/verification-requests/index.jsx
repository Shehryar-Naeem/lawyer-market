import React, { useEffect, useRef } from "react";
import PageHeading from "../../../components/pageHeading";
import { useGetVerificationRequestsQuery } from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { options } from "../../../utils/helper";

const VerificationRequest = () => {
  const { data, isError, error, isLoading } = useGetVerificationRequestsQuery(
    undefined,
    options
  );
  const loadingToastId = useRef(null);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  const columns = [
    {
      header: "_id",
      accessorKey: "_id",
      enableClickToCopy: true,
      size: 400,
    },
    {
      header: "Layer ID",
      accessorKey: "lawyer._id",
      enableClickToCopy: true,
      size: 230,
    },
    {
      header: "name",
      accessorKey: "user.name",
      size: 170,
    },
    {
      header: "email",
      accessorKey: "user.email",
      size: 230,
    },
    {
      header: "license No",
      accessorKey: "lawyer.professionalInfo.barAdmission.licenseNumber",
      size: 170,
    },
    {
      header: "Actions",
      accessorKey: "_id",
      size: 130,
      Cell: ({ row }) => {
        return (
          <div className="flex gap">
            <Link
              to={`/dashboard/admin/verification-requests/${row.original._id}`}
              className="update-btn "
            >
              <Edit />
            </Link>
            {/* <button
              className="text-red-500 lg:text-2xl md:text-xl text-lg"
              //   onClick={() => handleDelete(row.original)}
            >
              <Delete />
            </button> */}
          </div>
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: data?.message || [],

    enableColumnResizing: true,

    enableRowNumbers: true,
    renderDetailPanel: ({ row }) => {
      return (
        <div className="f-col md:gap-2 gap-1">
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">CNIC</h3>
            <p className="table-dropdown-description">{row.original.city}</p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Firm Name</h3>
            <p className="table-dropdown-description">
              {row.original.lawyer.professionalInfo.lawFirmName}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Position Name</h3>
            <p className="table-dropdown-description">
              {" "}
              {row.original.lawyer.professionalInfo.title}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">CNIC picture</h3>
            <img
              src={row.original.lawyer.cnicPicture?.url}
              alt="cnic"
              className="lawyer-pic-admin"
            />
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">lawyer id Card</h3>
            <img
              src={row.original.lawyer.lawyerIdCard?.url}
              alt="cnic"
              className="lawyer-pic-admin"
            />
          </div>
        </div>
      );
    },

    state: {
      isLoading: isLoading,
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
        <PageHeading text={"Verification Requests"} />
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default VerificationRequest;
