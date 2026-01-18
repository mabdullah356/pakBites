import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext({
  isLogin: false,
  user: null,
  setIsLogin: () => { },
  setUser: () => { },
  checkLogin: async () => { },
  logout: async () => { },
});

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/user/get-profile",
        { withCredentials: true }
      );
      if (data?.user) {
        setIsLogin(true);
        setUser(data.user);
      } else {
        setIsLogin(false);
        setUser(null);
      }
    } catch {
      setIsLogin(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });
    } finally {
      setIsLogin(false);
      setUser(null);
      toast.success("Logout Successfully")
    }
  };

  const value = {
    isLogin,
    user,
    setIsLogin,
    setUser,
    checkLogin,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// handy hook
export const useAuth = () => useContext(AuthContext);
