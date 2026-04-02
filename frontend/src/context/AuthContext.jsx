import { createContext, useContext, useEffect, useState } from "react";

import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("devfolio-token"),
    user: JSON.parse(localStorage.getItem("devfolio-user") || "null")
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.token) {
      return;
    }

    localStorage.setItem("devfolio-token", auth.token);

    if (auth.user) {
      localStorage.setItem("devfolio-user", JSON.stringify(auth.user));
    }
  }, [auth]);

  const persistAuth = (payload) => {
    localStorage.setItem("devfolio-token", payload.token);
    localStorage.setItem("devfolio-user", JSON.stringify(payload.user));
    setAuth(payload);
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      persistAuth(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", formData);
      persistAuth(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("devfolio-token");
    localStorage.removeItem("devfolio-user");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        login,
        logout,
        register,
        isAuthenticated: Boolean(auth.token)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

