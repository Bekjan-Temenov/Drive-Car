import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "../../shared/scroll/ScrollToTop";

const Layout: React.FC = () => {
  
  return (
    <div className="flex flex-col">
      <ScrollToTop /> 
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
