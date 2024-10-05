import { useAuth } from "@/services/authentication/AuthenticationContext";
import React from "react";

const MainLayout = ({ children }) => {
  const { logout } = useAuth();
  return (
    <div>
      <div>
        header
        <button onClick={logout}>Cerrar sesion</button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
