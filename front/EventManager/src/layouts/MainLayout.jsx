import Navbar from "@/components/navBar/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div>
       <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
