import { useAuth } from "@/services/authentication/AuthenticationContext";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { logout } = useAuth();
  return (
    <div>
      <div>
        header
        <button onClick={logout}>Cerrar sesion</button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
