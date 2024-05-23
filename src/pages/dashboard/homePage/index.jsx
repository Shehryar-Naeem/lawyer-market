import React, { useEffect } from "react";
import StatsCard from "../../../components/admin/statsCard";
import { FaUsers } from "react-icons/fa";

import { GiInjustice } from "react-icons/gi";
import { FaRegClipboard } from "react-icons/fa";
import LandingHeading from "../../../components/landing_heading";
import Skeleton from "react-loading-skeleton";
import { useStatsQuery } from "../../../redux/api/userApi";
import { options } from "../../../utils/helper";
import toast from "react-hot-toast";
import { FaUserTie } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdRequestQuote } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";


const AdminHomePage = () => {
  const { data, isError, isLoading, error } = useStatsQuery(undefined, options);
  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <div className="relative h-full">
      <div
      // className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm"
      >
        <div className="f-col gap h-full">
          <LandingHeading text={"Overview"} />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap">
            {isLoading ? (
              <>
                <div className="h-[130px]">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="h-[130px]">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="h-[130px]">
                  <Skeleton className="w-full h-full" />
                </div>
              </>
            ) : (
              <>
                <StatsCard
                  text={"Total Users"}
                  Icon={FaUsers}
                  num={data?.totalUser}
                />
                <StatsCard
                  text={"Total Gigs"}
                  Icon={FaCalendarAlt}
                  num={data?.totalGig}
                />
                <StatsCard
                  text={"Total Jobs"}
                  Icon={FaIdBadge}
                  num={data?.jobs}
                />
              </>
            )}
          </div>
        </div>
        <div className="f-col gap">
          <LandingHeading text={"Clients"} />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap">
            {isLoading ? (
              <>
                <div className="h-[130px]">
                  <Skeleton className="w-full h-full" />
                </div>
              </>
            ) : (
              <>
                <StatsCard
                  text={"Total Clients"}
                  Icon={FaUser}
                  num={data?.totalClient}
                />
              </>
            )}
          </div>
        </div>
        <div className="f-col gap">
          <LandingHeading text={"Lawyer"} />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap">
            {isLoading ? (
              <>
                <div className="h-[130px]">
                  <Skeleton className="w-full h-full" />
                </div>
              </>
            ) : (
              <>
                <StatsCard
                  text={"Total Lawyer"}
                  Icon={FaUserTie}
                  num={data?.totalLawyer}
                />
              </>
            )}
          </div>
        </div>
        <div className="f-col gap">
          <LandingHeading text={"Verification Request"} />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap">
            {isLoading ? (
              <>
                <div className="h-[130px]">
                  <Skeleton className="w-full h-full" />
                </div>
              </>
            ) : (
              <>
                <StatsCard
                  text={"Requests"}
                  Icon={MdRequestQuote}
                  num={data?.totalVerificationRequest}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
