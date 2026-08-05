import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // ------------------------
  // Login
  // ------------------------
const login = async (email, password, role) => {
  try {
    setLoading(true);

    const response = await loginUser({
      email,
      password,
      role,
    });

    if (!response.success) {
      return response;
    }

    setCurrentUser(response.user);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(response.user)
    );

    // Save logged-in delivery partner
    if (response.user.role === "delivery") {
      localStorage.setItem(
        "deliveryPartner",
        JSON.stringify(response.user)
      );
    }

    return {
      success: true,
      user: response.user,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login Failed",
    };
  } finally {
    setLoading(false);
  }
};

  // ------------------------
  // Register
  // ------------------------
  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await registerUser(userData);

      if (!response.success) {
        return response;
      }

      setCurrentUser(response.user);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.user)
      );

      return {
        success: true,
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration Failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // Logout
  // ------------------------
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }

    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // ------------------------
  // Restore user after refresh
  // ------------------------
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();

      if (response.success) {
        setCurrentUser(response.user);
      }
    } catch (error) {
      setCurrentUser(null);
      console.log(error);
      
    }
  };

  fetchUser();
}, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);