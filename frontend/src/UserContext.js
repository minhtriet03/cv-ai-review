import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khôi phục user từ localStorage khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Cập nhật localStorage khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (updatedData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedData }));
  };

  const isAdmin = user?.role === "admin";

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      updateUser,
      isAdmin
    }}>
      {children}
    </UserContext.Provider>
  );
};
