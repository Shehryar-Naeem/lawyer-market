import React, { useState, ReactNode } from "react";
import Sidebar from "../../components/admin/sidebar";
import AdminHeader from "../../components/admin/header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen  overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative lg:left-[250px] lg:w-[calc(100%-250px)] flex-grow flex flex-col right-0 overflow-y-auto overflow-x-hidden bg-gray-200">
        {/* <!-- ===== Header Start ===== --> */}
        <div className="sticky top-0 z-[999] lg:w-[calc(100%-250px)]">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main className=" lg:w-[calc(100%-250px)] overflow-auto  h-full xl:px-1 lg:px-1 px-1.5 lg:py-3 md:py-2 py-1.5 ">
          <div className="mx-auto  max-w-[1350px] w-full ">
            <Outlet />
          </div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
    </div>
  );
};

export default AdminLayout;
