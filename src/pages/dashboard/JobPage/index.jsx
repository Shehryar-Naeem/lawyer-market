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
  useDeleteJobByAdminMutation,
  useGetGigsByAdminQuery,
  useGetJobsByAdminQuery,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { siLK } from "@mui/material/locale";
import { Delete, Edit } from "@mui/icons-material";
import { options } from "../../../utils/helper";

const JobPage = () => {
  const navigate = useNavigate();
  const loadingToastId = useRef(null);

  // const { data, isError, isLoading, error } = useGetGigsByAdminQuery();
  const {
    data,
    isError,
    isLoading: dataLoading,
    error,
  } = useGetJobsByAdminQuery(undefined, options);
  const [
    deleteJob,
    { isError: isDeletingError, isLoading, error: deletingError },
  ] = useDeleteJobByAdminMutation();

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
    try {
      await deleteJob(rowData);
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const columns = [
    {
      header: "_id",
      accessorKey: "_id",
      enableClickToCopy: true,
    },

    {
      header: "category",
      accessorKey: "category",
      size: 230,
      // Cell: ({ renderedCellValue }) => {
      //   return (
      //     <div className="flex md:gap-0.8 gap-0.5 overflow-y-auto flex-wrap">
      //       {renderedCellValue?.map((category) => (
      //         <span className="tag-text">{category}</span>
      //       ))}
      //     </div>
      //   );
      // },
    },
    {
      header: "majorIssues",
      accessorKey: "majorIssues",
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
      header: "status",
      accessorKey: "status",
      size: 150,
    },
    {
      header: "budget",
      accessorKey: "budget",
      grow: 1,
      size: 150,
    },
    {
      header: "Actions",
      accessorKey: "_id",
      size: 130,
      Cell: ({ row }) => {
        return (
          <div className="flex gap">
            <Link
              to={`/dashboard/admin/jobs/edit/${row.original._id}`}
              className="update-btn "
            >
              <Edit />
            </Link>
            <button
              className="delete-btn"
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
    data: data?.data || [],

    enableColumnResizing: true,
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
          {/* <div className="flex gap items-center">
            <h3 className="table-dropdown-heading">Images</h3>
            {row.original.images.map((image) => (
              <img
                src={image.url}
                alt="image"
                className="table-dropdown-image"
              />
            ))}
          </div> */}
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
        <PageHeading text={"Jobs"} />
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default JobPage;
