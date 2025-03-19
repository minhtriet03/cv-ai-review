import api from "./index";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/reset-password", { token, newPassword });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};