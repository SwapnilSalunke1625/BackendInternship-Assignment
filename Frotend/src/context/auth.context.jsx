import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start (refresh safe)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
 // AuthContext.jsx
const login = async (data) => {
  const res = await api.post("/v1/users/login", data);

  const user = res.data.user;
  localStorage.setItem("user", JSON.stringify(user));
  setUser(user);

  return user;
};


  // REGISTER
  const register = async (data) => {
    const res = await api.post("/v1/users/register", data);
    return res.data;
  };

  // LOGOUT
const logout = async () => {
  try {
    await api.post("/v1/users/logout"); // 🔥 CALL BACKEND
  } catch (err) {
    console.error("Logout failed", err);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook (VERY IMPORTANT)
export const useAuth = () => {
  return useContext(AuthContext);
};
