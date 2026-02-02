import React from "react";
import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout: React.FC = () => {
  const token = localStorage.getItem("admin-token");
  if (!token) {
    return <Navigate to="/admin/sign-in" />;
  }
  return (
    <div className="flex gap-[49px] text-white px-1">
      <SideBar />
      <div className="flex flex-col  w-full gap-[40px]">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
