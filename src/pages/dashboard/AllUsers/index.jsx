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
  useDeleteUserByAdminMutation,
  useGetAllUserByAdminQuery,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { siLK } from "@mui/material/locale";
import { Delete, Edit } from "@mui/icons-material";
import { options } from "../../../utils/helper";

const AllUsers = () => {
  const {
    data,
    isLoading: dataLoading,
    error,
    isError,
  } = useGetAllUserByAdminQuery(undefined, options);

  const loadingRef = useRef(null);

  const [
    deleteUser,
    { isError: isDeletingError, isLoading, error: deletingError },
  ] = useDeleteUserByAdminMutation();

  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isDeletingError) {
      toast.error(deletingError?.data?.message);
    }
  }, [isError, error, isDeletingError, deletingError]);

  useEffect(() => {
    if (isLoading && !loadingRef.current) {
      loadingRef.current = toast.loading("Loading...");
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && loadingRef.current) {
      toast.dismiss(loadingRef.current);
      loadingRef.current = null;
    }
  }, [isLoading]);

  const handleDelete = async (rowData) => {
    const response = await deleteUser(rowData);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
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
      header: "name",
      accessorKey: "name",
      size: 230,
    },
    {
      header: "email",
      accessorKey: "email",
      size: 300,
    },
    {
      header: "roles",
      accessorKey: "roles",
      size: 380,

      Cell: ({ renderedCellValue }) => {
        return (
          <div className="flex flex-col md:gap-0.8 gap-0.5 overflow-y-auto flex-wrap">
            {renderedCellValue?.map((role) => (
              <>
                <div className="flex md:gap-0.8 gap-0.5">
                  <span className="tag-text">{role?.roleType}</span>
                  <span className="tag-text">{role?._id}</span>
                </div>
              </>
            ))}
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "_id",
      size: 130,
      Cell: ({ row }) => {
        return (
          <div className="flex gap">
            <Link
              to={`/dashboard/admin/users/user/${row.original._id}`}
              className="update-btn"
            >
              <Edit />
            </Link>
            <button
              className="delete-btn "
              onClick={() => handleDelete(row.original._id)}
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
    data: data?.users || [],

    enableColumnResizing: true,

    enableRowNumbers: true,
    renderDetailPanel: ({ row }) => {
      return (
        <div className="f-col md:gap-2 gap-1">
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">City</h3>
            <p className="table-dropdown-description">{row.original.city}</p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Postal Code</h3>
            <p className="table-dropdown-description">
              {row.original.postalCode}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Gender</h3>
            <p className="table-dropdown-description">{row.original.gender}</p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">CNIC</h3>
            <p className="table-dropdown-description">
              {row.original.cnic}
            </p>
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
        <PageHeading text={"Users"} />
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default AllUsers;
