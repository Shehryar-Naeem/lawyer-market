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
  useDeleteGigByAdminMutation,
  useGetGigsByAdminQuery,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { siLK } from "@mui/material/locale";
import { Delete, Edit } from "@mui/icons-material";
import { options } from "../../../utils/helper";

const GigPage = () => {
  const {
    data,
    isError,
    isLoading: dataLoading,
    error,
  } = useGetGigsByAdminQuery(undefined, options);
  const [
    deleteGigByAdmin,
    { isError: isDeletingError, isLoading, error: deletingError },
  ] = useDeleteGigByAdminMutation();

  const loadingToastId = useRef(null);

  const deleteHandler = async (id) => {
    const response = await deleteGigByAdmin(id);
    console.log(response);
    if (response?.data?.success) {
      toast.success("Gig deleted successfully");
    }
  };

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
  console.log(isError, error, isDeletingError, deletingError, isLoading);

  useEffect(() => {
    if (!isLoading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isLoading]);

  const columns = [
    {
      header: "_id",
      accessorKey: "_id",
      enableClickToCopy: true,
      grow: 1,
      size: 250,
    },
    {
      header: "rating",
      accessorKey: "ratings",
      grow: 1,
      size: 150,
    },
    {
      header: "category",
      accessorKey: "category",
      size: 400,
      Cell: ({ renderedCellValue }) => {
        return (
          <div className="flex md:gap-0.8 gap-0.5 overflow-y-auto flex-wrap">
            {renderedCellValue?.map((category) => (
              <span className="tag-text">{category}</span>
            ))}
          </div>
        );
      },
    },
    {
      header: "service",
      accessorKey: "pricing.services",
      size: 400,
      Cell: ({ renderedCellValue }) => {
        return (
          <div className="flex md:gap-0.8 gap-0.5 overflow-y-auto flex-wrap">
            {renderedCellValue?.map((service) => (
              <span className="tag-text">{service}</span>
            ))}
          </div>
        );
      },
    },
    {
      header: "Price",
      accessorKey: "pricing.price",
      size: 150,
    },
    {
      header: "Actions",
      accessorKey: "_id",
      size: 130,
      Cell: ({ row }) => {
        return (
          <div className="flex gap">
            <Link to={`/dashboard/admin/gigs/edit/${row.original._id}`}>
              <Edit />
            </Link>
            <button
              className="text-red-500 lg:text-2xl md:text-xl text-lg"
              onClick={() => deleteHandler(row.original._id)}
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
    data: data?.gigs || [],

    enableColumnResizing: true,
    layoutMode: "grid-no-grow",
    renderDetailPanel: ({ row }) => {
      return (
        <div className="f-col md:gap-2 gap-1">
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">title</h3>
            <p className="table-dropdown-description">{row.original.title}</p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Description</h3>
            <p className="table-dropdown-description">
              {row.original.description}
            </p>
          </div>
          <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Images</h3>
            {row.original.images.map((image) => (
              <img
                src={image.url}
                alt="image"
                className="table-dropdown-image"
              />
            ))}
          </div>
        </div>
      );
    },
    enableRowNumbers: true,

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
        <PageHeading text={"Gigs"} />
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default GigPage;
