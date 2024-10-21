import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const tokenStorage = localStorage.getItem("token");
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(tokenStorage);

  const login = async (email, password) => {
    const requestData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://localhost:7299/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return { success: false, msg: "Usuario o contraseña incorrectos" };
      }

      const token = await response.text();
      setToken(token);
      localStorage.setItem("token", token);
      return { success: true };
    } catch (error) {
      console.error("Error de autenticación:", error.message);
      return {
        success: false,
        msg: "Error en la conexión con el servidor.",
      };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const data = { token, login, logout };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
